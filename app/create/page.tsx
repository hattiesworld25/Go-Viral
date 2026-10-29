"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { X, Zap, Music2, Sparkles, Timer, Flip, Camera, Video, Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CreatePage() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user")
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([])
  const [hasRecorded, setHasRecorded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  useEffect(() => {
    startCamera()
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [facingMode])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: true
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }

  const toggleRecording = () => {
    if (!isRecording) {
      startRecording()
    } else {
      stopRecording()
    }
  }

  const startRecording = () => {
    if (!stream) return

    const options = { mimeType: "video/webm" }
    const mediaRecorder = new MediaRecorder(stream, options)
    mediaRecorderRef.current = mediaRecorder

    const chunks: Blob[] = []
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data)
      }
    }

    mediaRecorder.onstop = () => {
      setRecordedChunks(chunks)
      setHasRecorded(true)
    }

    mediaRecorder.start()
    setIsRecording(true)
    setRecordingTime(0)
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const flipCamera = () => {
    setFacingMode(prev => prev === "user" ? "environment" : "user")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {/* Video Preview */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 bg-gradient-to-b from-black/70 to-transparent">
        <Link href="/">
          <button className="text-white">
            <X className="w-7 h-7" />
          </button>
        </Link>
        <div className="flex items-center gap-3">
          <button className="text-white flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-full backdrop-blur-sm">
            <Music2 className="w-4 h-4" />
            <span className="text-sm font-medium">Sounds</span>
          </button>
        </div>
      </div>

      {/* Recording Timer */}
      {isRecording && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-red-500 rounded-full">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            <span className="text-white font-semibold">{formatTime(recordingTime)}</span>
          </div>
        </motion.div>
      )}

      {/* Side Tools */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-6">
        <button className="flex flex-col items-center gap-2 text-white" onClick={flipCamera}>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Flip className="w-6 h-6" />
          </div>
          <span className="text-xs">Flip</span>
        </button>
        <button className="flex flex-col items-center gap-2 text-white">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Zap className="w-6 h-6" />
          </div>
          <span className="text-xs">Speed</span>
        </button>
        <button className="flex flex-col items-center gap-2 text-white">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-xs">Effects</span>
        </button>
        <button className="flex flex-col items-center gap-2 text-white">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Timer className="w-6 h-6" />
          </div>
          <span className="text-xs">Timer</span>
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-50 pb-8">
        <div className="flex items-center justify-center gap-8 px-4">
          {/* Upload Button */}
          <button className="text-white flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Camera className="w-6 h-6" />
            </div>
            <span className="text-xs">Upload</span>
          </button>

          {/* Record Button */}
          <button
            onClick={toggleRecording}
            className="relative"
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
              isRecording ? "bg-red-500" : "bg-white/20 backdrop-blur-sm border-4 border-white"
            }`}>
              {isRecording ? (
                <div className="w-8 h-8 bg-white rounded" />
              ) : (
                <div className="w-16 h-16 bg-[#FE2C55] rounded-full" />
              )}
            </div>
            {hasRecorded && !isRecording && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-black"
              >
                <Check className="w-5 h-5 text-white" />
              </motion.div>
            )}
          </button>

          {/* Templates Button */}
          <button className="text-white flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Video className="w-6 h-6" />
            </div>
            <span className="text-xs">Templates</span>
          </button>
        </div>

        {/* Next Button */}
        {hasRecorded && !isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mt-6"
          >
            <Button className="bg-[#FE2C55] hover:bg-[#FE2C55]/90 text-white px-12 py-6 rounded-lg text-lg font-semibold">
              Next
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
