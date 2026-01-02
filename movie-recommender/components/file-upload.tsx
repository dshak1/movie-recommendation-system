"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, CheckCircle, AlertCircle } from "lucide-react"

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<{
    success?: string
    error?: string
  }>({})
  const [isOpen, setIsOpen] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setUploadStatus({})
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setUploadStatus({})

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to upload file")
      }

      setUploadStatus({ success: data.message || "File uploaded successfully!" })
      setTimeout(() => setIsOpen(false), 2000)
    } catch (error) {
      console.error("Upload error:", error)
      setUploadStatus({
        error: error instanceof Error ? error.message : "Failed to upload file",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 border-indigo-800/30 bg-indigo-950/50 text-indigo-300 hover:border-indigo-700/50 hover:bg-indigo-900/50 hover:text-white"
        >
          <Upload className="h-4 w-4" />
          Upload Custom Dataset
        </Button>
      </DialogTrigger>
      <DialogContent className="border-indigo-800/30 bg-indigo-950/90 text-indigo-200 backdrop-blur-sm sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Movie Dataset</DialogTitle>
          <DialogDescription className="text-indigo-400">
            Upload a CSV file with movie data. The file should include columns for title, overview, vote_average, and
            vote_count.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Input
            id="file-upload"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="cursor-pointer border-indigo-800/50 bg-indigo-950/50 text-indigo-300"
          />

          {uploadStatus.success && (
            <Alert className="border-green-800/50 bg-green-950/50 text-green-400">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{uploadStatus.success}</AlertDescription>
            </Alert>
          )}

          {uploadStatus.error && (
            <Alert className="border-red-800/50 bg-red-950/50 text-red-400">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{uploadStatus.error}</AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
