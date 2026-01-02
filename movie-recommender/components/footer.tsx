import { Github } from "lucide-react"
import { FileUpload } from "@/components/file-upload"

export function Footer() {
  return (
    <footer className="mt-16 border-t border-indigo-800/30 bg-indigo-950/80 py-8 text-indigo-300 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <p className="text-sm">© {new Date().getFullYear()} Top Movie Recommender. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-4">
            <FileUpload />

            <a
              href="https://github.com/yourusername/movie-recommender"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-white"
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
