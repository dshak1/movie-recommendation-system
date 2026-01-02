"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { getMovieRecommendations } from "@/lib/recommendations"
import type { Movie } from "@/types/movie"

interface RecommendationContextType {
  recommendations: Movie[]
  isLoading: boolean
  error: string | null
  searchQuery: string
  getRecommendations: (query: string) => Promise<void>
}

const RecommendationContext = createContext<RecommendationContextType | undefined>(undefined)

export function RecommendationProvider({ children }: { children: ReactNode }) {
  const [recommendations, setRecommendations] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const getRecommendations = async (query: string) => {
    setIsLoading(true)
    setError(null)
    setSearchQuery(query)

    try {
      const results = await getMovieRecommendations(query)
      setRecommendations(results)
    } catch (err) {
      setError("Failed to fetch recommendations. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <RecommendationContext.Provider
      value={{
        recommendations,
        isLoading,
        error,
        searchQuery,
        getRecommendations,
      }}
    >
      {children}
    </RecommendationContext.Provider>
  )
}

export function useRecommendation() {
  const context = useContext(RecommendationContext)
  if (context === undefined) {
    throw new Error("useRecommendation must be used within a RecommendationProvider")
  }
  return context
}
