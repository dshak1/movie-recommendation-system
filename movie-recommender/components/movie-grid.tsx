"use client"

import { useRecommendation } from "@/context/recommendation-context"
import { MovieCard } from "@/components/movie-card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Film } from "lucide-react"
import { motion } from "framer-motion"

export function MovieGrid() {
  const { recommendations, error, searchQuery } = useRecommendation()

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6 border-red-800 bg-red-950/50 text-red-300">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (recommendations.length === 0 && searchQuery) {
    return (
      <Alert className="mb-6 border-indigo-800 bg-indigo-950/50 text-indigo-300">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No results found</AlertTitle>
        <AlertDescription>
          We couldn't find any recommendations for "{searchQuery}". Please try another movie.
        </AlertDescription>
      </Alert>
    )
  }

  if (recommendations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl bg-white/5 py-16 text-center backdrop-blur-sm">
        <Film className="mb-4 h-16 w-16 text-indigo-400 opacity-50" />
        <h3 className="text-xl font-medium text-indigo-200">Ready to discover new movies?</h3>
        <p className="mt-2 max-w-md text-indigo-300">
          Enter the name of a movie you enjoy, and we'll recommend similar films you might love.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-indigo-200">Recommended movies based on "{searchQuery}"</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((movie, index) => (
          <motion.div
            key={movie.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <MovieCard movie={movie} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
