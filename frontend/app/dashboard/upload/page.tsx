"use client"

import { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, File as FileIcon, X, AlertCircle } from "lucide-react"
import { uploadFile, listUploads } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"

interface FileWithProgress {
  file: File;
  progress?: number;
  uploaded?: boolean;
  error?: string;
}

export default function UploadPage() {
  const [files, setFiles] = useState<FileWithProgress[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    filename: string;
    size: number;
    upload_time: string;
    file_type: string;
  }>>([])
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [
      ...prev,
      ...acceptedFiles.map(file => ({
        file,
        progress: 0,
        uploaded: false,
      }))
    ])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  })

  const loadUploadedFiles = async () => {
    try {
      const files = await listUploads()
      setUploadedFiles(files)
    } catch (error) {
      console.error('Failed to load uploaded files:', error)
      toast({
        title: "Error",
        description: "Failed to load uploaded files",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    loadUploadedFiles()
  }, [])

  const handleUpload = async (fileWithProgress: FileWithProgress) => {
    try {
      setIsUploading(true)
      
      // Validate file type before upload
      const allowedTypes = ['.pdf', '.txt', '.csv', '.docx'];
      const fileExtension = fileWithProgress.file.name.toLowerCase().match(/\.[^.]*$/)?.[0];
      
      if (!fileExtension) {
        throw new Error('File has no extension');
      }
      
      if (!allowedTypes.includes(fileExtension)) {
        throw new Error(`File type '${fileExtension}' not allowed. Allowed types: ${allowedTypes.join(', ')}`);
      }
      
      const response = await uploadFile(fileWithProgress.file)
      
      setFiles(prev => prev.map(f => 
        f === fileWithProgress ? { ...f, progress: 100, uploaded: true } : f
      ))

      await loadUploadedFiles()

      toast({
        title: "Success",
        description: "File uploaded successfully",
      })
    } catch (error) {
      console.error('Upload error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload file'
      
      setFiles(prev => prev.map(f =>
        f === fileWithProgress ? { ...f, error: errorMessage } : f
      ))
      
      toast({
        title: "Upload Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const removeFile = (fileToRemove: FileWithProgress) => {
    setFiles(prev => prev.filter(f => f !== fileToRemove))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Upload Center</h1>
        <p className="text-muted-foreground">Upload documents and data to enhance your AI's knowledge.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Files</CardTitle>
            <CardDescription>Upload PDF, TXT, CSV, or DOCX files to enhance your AI's knowledge.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer ${
                isDragActive ? 'border-primary bg-primary/5' : 'border-gray-200'
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-gray-400" />
                <p className="text-sm text-muted-foreground">
                  {isDragActive
                    ? "Drop the files here"
                    : "Drag and drop files here, or click to browse"}
                </p>
              </div>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Selected Files</h3>
                <div className="space-y-2">
                  {files.map((fileWithProgress, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <FileIcon className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">{fileWithProgress.file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(fileWithProgress.file.size)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {fileWithProgress.uploaded ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Uploaded
                          </Badge>
                        ) : fileWithProgress.error ? (
                          <Badge variant="outline" className="bg-red-50 text-red-700">
                            Error
                          </Badge>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleUpload(fileWithProgress)}
                            disabled={isUploading}
                          >
                            {isUploading ? "Uploading..." : "Upload"}
                          </Button>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeFile(fileWithProgress)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Uploaded Files</CardTitle>
            <CardDescription>View and manage your uploaded files.</CardDescription>
          </CardHeader>
          <CardContent>
            {uploadedFiles.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No files uploaded yet
              </div>
            ) : (
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <FileIcon className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">{file.filename}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)} • Uploaded {new Date(file.upload_time).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">{file.file_type.toUpperCase()}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
