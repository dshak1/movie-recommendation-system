import { type NextRequest, NextResponse } from "next/server"
import Papa from "papaparse"
import type { Movie } from "@/types/movie"

// This is a placeholder for the movie data storage
// In a real app, you might use a database or a more persistent storage
let customMoviesData: Movie[] | null = null

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const fileContent = await file.text()

    return new Promise<NextResponse>((resolve) => {
      Papa.parse(fileContent, {
        header: true,
        complete: (results) => {
          const parsedData = results.data as Movie[]

          // Validate the parsed data
          const validMovies = parsedData.filter(
            (movie) =>
              movie.title && typeof movie.vote_average !== "undefined" && typeof movie.vote_count !== "undefined",
          )

          // Convert vote_count and vote_average to numbers
          customMoviesData = validMovies.map((movie) => ({
            ...movie,
            vote_count: typeof movie.vote_count === "string" ? Number.parseFloat(movie.vote_count) : movie.vote_count,
            vote_average:
              typeof movie.vote_average === "string" ? Number.parseFloat(movie.vote_average) : movie.vote_average,
          }))

          resolve(
            NextResponse.json({
              success: true,
              message: `Successfully uploaded ${customMoviesData.length} movies`,
            }),
          )
        },
        error: (error) => {
          resolve(NextResponse.json({ error: "Failed to parse CSV file: " + error.message }, { status: 400 }))
        },
      })
    })
  } catch (error) {
    console.error("Error processing file upload:", error)
    return NextResponse.json({ error: "Failed to process file upload" }, { status: 500 })
  }
}

export async function GET() {
  if (!customMoviesData) {
    return NextResponse.json({ error: "No custom movie data available" }, { status: 404 })
  }

  return NextResponse.json({ movies: customMoviesData })
}
