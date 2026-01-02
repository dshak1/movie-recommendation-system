"use server"

import type { Movie } from "@/types/movie"
import Papa from "papaparse"

// Cache the parsed data to avoid re-parsing on every request
let moviesCache: Movie[] | null = null

async function fetchAndParseMovies(): Promise<Movie[]> {
  if (moviesCache) return moviesCache

  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/movies_metadata_trimmed-PNyn2yWhNQTPkJt5Vv6xs8Z83D2HLg.csv",
    )
    const csvText = await response.text()

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          const movies = results.data as Movie[]
          // Filter out any invalid entries
          const validMovies = movies.filter(
            (movie) =>
              movie.title &&
              typeof movie.vote_average !== "undefined" &&
              typeof movie.vote_count !== "undefined" &&
              movie.overview,
          )

          // Convert vote_count and vote_average to numbers
          const parsedMovies = validMovies.map((movie) => ({
            ...movie,
            vote_count: typeof movie.vote_count === "string" ? Number.parseFloat(movie.vote_count) : movie.vote_count,
            vote_average:
              typeof movie.vote_average === "string" ? Number.parseFloat(movie.vote_average) : movie.vote_average,
          }))

          moviesCache = parsedMovies
          resolve(parsedMovies)
        },
        error: (error) => {
          reject(error)
        },
      })
    })
  } catch (error) {
    console.error("Error fetching or parsing CSV:", error)
    throw new Error("Failed to load movie data")
  }
}

// Calculate weighted rating as in the Python script
function weightedRating(movie: Movie, m: number, voteAverage: number): number {
  const v = movie.vote_count
  const R = movie.vote_average
  return (v / (v + m)) * R + (m / (m + v)) * voteAverage
}

// Calculate similarity score between two movies based on title and overview
function calculateSimilarity(movie1: Movie, movie2: Movie): number {
  // Simple text similarity based on word overlap
  const words1 = (movie1.title + " " + movie1.overview).toLowerCase().split(/\W+/)
  const words2 = (movie2.title + " " + movie2.overview).toLowerCase().split(/\W+/)

  // Count common words
  const commonWords = words1.filter((word) => word.length > 3 && words2.includes(word)).length

  // Calculate similarity score
  const totalWords = Math.max(words1.length, words2.length)
  return commonWords / totalWords
}

export async function getMovieRecommendations(query: string): Promise<Movie[]> {
  const movies = await fetchAndParseMovies()

  // Calculate mean vote average
  const voteAverage = movies.reduce((sum, movie) => sum + movie.vote_average, 0) / movies.length

  // Calculate vote count threshold (top 25%)
  const sortedVoteCounts = [...movies].sort((a, b) => b.vote_count - a.vote_count)
  const m = sortedVoteCounts[Math.floor(sortedVoteCounts.length * 0.25)].vote_count

  // Filter movies with vote count >= m
  const topMovies = movies.filter((movie) => movie.vote_count >= m)

  // Find movies that match the query
  const queryLower = query.toLowerCase()
  const matchingMovies = movies.filter((movie) => movie.title.toLowerCase().includes(queryLower))

  if (matchingMovies.length === 0) {
    // If no matches, return top rated movies
    return topMovies
      .map((movie) => ({
        ...movie,
        score: weightedRating(movie, m, voteAverage),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
  }

  // Get the first matching movie as the reference
  const referenceMovie = matchingMovies[0]

  // Calculate similarity scores for all movies compared to the reference movie
  const recommendedMovies = movies
    .filter((movie) => movie.title !== referenceMovie.title) // Exclude the reference movie
    .map((movie) => {
      const similarityScore = calculateSimilarity(referenceMovie, movie)
      const qualityScore = weightedRating(movie, m, voteAverage)

      // Combined score: 60% similarity, 40% quality
      const combinedScore = similarityScore * 0.6 + (qualityScore / 10) * 0.4

      return {
        ...movie,
        score: combinedScore,
      }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)

  return recommendedMovies
}
