"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, MessageCircle, Share2, Bookmark, Music2 } from "lucide-react"
import { Video } from "@/lib/types"

interface SidebarProps {
  video: Video
}

export default function Sidebar({ video }: SidebarProps) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)

  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  return (
    <div className="absolute right-4 bottom-32 z-40 flex flex-col gap-6">
      {/* Like Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setLiked(!liked)}
        className="flex flex-col items-center gap-1"
      >
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Heart
            className={`w-7 h-7 ${liked ? "fill-[#FE2C55] text-[#FE2C55]" : "text-white"}`}
          />
        </div>
        <span className="text-white text-xs font-semibold">
          {formatCount(video.likes + (liked ? 1 : 0))}
        </span>
      </motion.button>

      {/* Comment Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="flex flex-col items-center gap-1"
      >
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <MessageCircle className="w-7 h-7 text-white" />
        </div>
        <span className="text-white text-xs font-semibold">
          {formatCount(video.comments)}
        </span>
      </motion.button>

      {/* Save Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setSaved(!saved)}
        className="flex flex-col items-center gap-1"
      >
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Bookmark
            className={`w-7 h-7 ${saved ? "fill-yellow-400 text-yellow-400" : "text-white"}`}
          />
        </div>
        <span className="text-white text-xs font-semibold">
          {formatCount(video.saves + (saved ? 1 : 0))}
        </span>
      </motion.button>

      {/* Share Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="flex flex-col items-center gap-1"
      >
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Share2 className="w-7 h-7 text-white" />
        </div>
        <span className="text-white text-xs font-semibold">
          {formatCount(video.shares)}
        </span>
      </motion.button>

      {/* Music Disc */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mt-2"
      >
        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
          <Music2 className="w-5 h-5 text-white" />
        </div>
      </motion.div>
    </div>
  )
}
