"use client"

import type React from "react"

import { useState } from "react"
import { useRecommendation } from "@/context/recommendation-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MovieGrid } from "@/components/movie-grid"
import { Loader2, Search } from "lucide-react"

export function MovieSearch() {
  const [query, setQuery] = useState("")
  const { getRecommendations, isLoading } = useRecommendation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      getRecommendations(query)
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-10 rounded-xl bg-white/5 p-6 backdrop-blur-sm">
        <h2 className="mb-4 text-xl font-semibold text-indigo-200">Find Your Next Favorite Movie</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-300" />
            <Input
              type="text"
              placeholder="Enter a movie you like (e.g., Matrix, Avengers)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 border-indigo-800/50 bg-indigo-950/50 pl-10 text-white placeholder:text-indigo-400"
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="bg-gradient-to-r from-pink-600 to-purple-600 text-white transition-all hover:from-pink-700 hover:to-purple-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Finding Movies...
              </>
            ) : (
              "Get Recommendations"
            )}
          </Button>
        </form>
      </div>

      <MovieGrid />
    </div>
  )
}
