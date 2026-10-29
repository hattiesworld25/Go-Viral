"use client"

import { useRef, useEffect, useState } from "react"
import { Video } from "@/lib/types"

interface VideoPlayerProps {
  video: Video
  isActive: boolean
}

export default function VideoPlayer({ video, isActive }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [isActive])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="relative w-full h-full bg-black">
      <video
        ref={videoRef}
        src={video.videoUrl}
        loop
        playsInline
        className="w-full h-full object-cover"
        onClick={toggleMute}
      />
      
      {/* Video Info Overlay */}
      <div className="absolute bottom-20 left-4 right-20 z-40 text-white">
        <div className="flex items-center gap-2 mb-3">
          <img
            src={video.user.avatar}
            alt={video.user.username}
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <span className="font-semibold">@{video.user.username}</span>
          <button className="px-4 py-1 bg-[#FE2C55] rounded-md text-sm font-semibold ml-2">
            Follow
          </button>
        </div>
        
        <p className="text-sm mb-2 line-clamp-2">{video.caption}</p>
        
        <div className="flex items-center gap-2 text-sm">
          <span className="flex items-center gap-1">
            ♪ {video.music}
          </span>
        </div>
      </div>
    </div>
  )
}
