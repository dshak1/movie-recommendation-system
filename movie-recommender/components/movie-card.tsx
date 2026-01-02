import type { Movie } from "@/types/movie"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  // Generate a random gradient for the movie card header
  const gradients = [
    "from-pink-500 to-purple-500",
    "from-purple-500 to-indigo-500",
    "from-indigo-500 to-blue-500",
    "from-blue-500 to-cyan-500",
    "from-cyan-500 to-teal-500",
    "from-teal-500 to-green-500",
    "from-green-500 to-lime-500",
    "from-lime-500 to-yellow-500",
    "from-yellow-500 to-amber-500",
    "from-amber-500 to-orange-500",
    "from-orange-500 to-red-500",
    "from-red-500 to-pink-500",
  ]

  // Use the movie title to deterministically select a gradient
  const gradientIndex = movie.title.charCodeAt(0) % gradients.length
  const gradient = gradients[gradientIndex]

  return (
    <Card className="group h-full overflow-hidden border-indigo-800/30 bg-indigo-950/30 text-white backdrop-blur-sm transition-all hover:border-indigo-700/50 hover:bg-indigo-900/30">
      <div className={`h-3 w-full bg-gradient-to-r ${gradient}`}></div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="line-clamp-2 text-xl group-hover:text-indigo-300">{movie.title}</CardTitle>
          <Badge className="ml-2 flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            <Star className="h-3 w-3 fill-current" />
            {movie.vote_average}
          </Badge>
        </div>
        <CardDescription className="text-indigo-400">{movie.vote_count} votes</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-4 text-sm text-indigo-300">{movie.overview || "No overview available."}</p>
      </CardContent>
    </Card>
  )
}
