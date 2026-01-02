import { MovieSearch } from "@/components/movie-search"
import { Footer } from "@/components/footer"
import { RecommendationProvider } from "@/context/recommendation-context"

export default function Home() {
  return (
    <RecommendationProvider>
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 text-white">
        <div className="container mx-auto flex-1 px-4 py-8">
          <header className="mb-12 text-center">
            <div className="mb-6 flex justify-center">
              <div className="relative h-16 w-16 overflow-hidden rounded-full bg-gradient-to-r from-pink-500 to-violet-500 p-1 shadow-lg shadow-purple-500/20">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900 text-2xl font-bold">
                  MR
                </div>
              </div>
            </div>
            <h1 className="mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
              Top Movie Recommender
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-indigo-200">
              Discover great movies based on your preferences using our advanced recommendation system.
            </p>
          </header>

          <MovieSearch />
        </div>
        <Footer />
      </div>
    </RecommendationProvider>
  )
}
