"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Flame,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Music2,
  Search,
  Plus,
  Home,
  User,
  BadgeCheck,
  TrendingUp,
} from "lucide-react"
import { videos } from "@/lib/data"

// Viral score: likes count most, then shares, saves, and comments.
function viralScore(video: (typeof videos)[number]) {
  return video.likes + video.shares * 10 + video.saves * 5 + video.comments * 3
}

function formatCount(count: number) {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}

const viralVideos = [...videos].sort((a, b) => viralScore(b) - viralScore(a))

const trendingTags = Array.from(
  new Set(
    videos.flatMap((video) => {
      const matches = video.caption.match(/#\w+/g)
      return matches ? matches : []
    })
  )
)

export default function ViralPage() {
  const [playingId, setPlayingId] = useState<string | null>(null)

  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      {/* Top Navigation */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-white/60 font-semibold text-lg hover:text-white transition-colors">
            Following
          </Link>
          <Link href="/" className="text-white/60 font-semibold text-lg hover:text-white transition-colors">
            For You
          </Link>
          <span className="text-white font-semibold text-lg flex items-center gap-1">
            <Flame className="w-5 h-5 text-[#FE2C55]" fill="currentColor" />
            Viral
          </span>
        </div>
        <button className="text-white" aria-label="Search">
          <Search className="w-6 h-6" />
        </button>
      </div>

      {/* Header */}
      <div className="px-4 pt-5 pb-3">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp className="w-7 h-7 text-[#FE2C55]" />
          Viral right now
        </h1>
        <p className="text-white/60 text-sm mt-1">
          The most-liked videos on Go Viral, ranked by likes, shares, saves, and comments.
        </p>
      </div>

      {/* Trending hashtags */}
      {trendingTags.length > 0 && (
        <div className="px-4 pb-4 flex gap-2 overflow-x-auto no-scrollbar">
          {trendingTags.map((tag) => (
            <span
              key={tag}
              className="shrink-0 px-3 py-1.5 bg-white/10 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Ranked viral videos */}
      <div className="px-4 pb-28 flex flex-col gap-4">
        {viralVideos.map((video, index) => (
          <div
            key={video.id}
            className="rounded-2xl overflow-hidden bg-white/5 border border-white/10"
          >
            <div className="relative">
              <video
                src={video.videoUrl}
                className="w-full h-64 object-cover bg-black"
                playsInline
                loop
                muted={playingId !== video.id}
                autoPlay={playingId === video.id}
                controls={playingId === video.id}
                preload="metadata"
                onClick={() =>
                  setPlayingId(playingId === video.id ? null : video.id)
                }
              />
              <div className="absolute top-3 left-3 flex items-center gap-1 px-3 py-1.5 bg-[#FE2C55] rounded-full">
                <Flame className="w-4 h-4 text-white" fill="currentColor" />
                <span className="text-white text-sm font-bold">#{index + 1} Viral</span>
              </div>
              {playingId !== video.id && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 bg-black/50 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl ml-1">▶</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={video.user.avatar}
                  alt={video.user.username}
                  className="w-9 h-9 rounded-full border-2 border-white/20"
                />
                <span className="font-semibold">@{video.user.username}</span>
                {video.user.verified && (
                  <BadgeCheck className="w-4 h-4 text-[#25F4EE]" fill="currentColor" />
                )}
              </div>

              <p className="text-sm mb-2">{video.caption}</p>

              <div className="flex items-center gap-2 text-sm text-white/70 mb-3">
                <Music2 className="w-4 h-4" />
                <span>{video.music}</span>
              </div>

              <div className="flex items-center gap-5 text-sm text-white/80">
                <span className="flex items-center gap-1.5">
                  <Heart className="w-5 h-5 text-[#FE2C55]" fill="currentColor" />
                  {formatCount(video.likes)}
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageCircle className="w-5 h-5" />
                  {formatCount(video.comments)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Bookmark className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  {formatCount(video.saves)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Share2 className="w-5 h-5" />
                  {formatCount(video.shares)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-white/10">
        <div className="flex items-center justify-around px-4 py-3">
          <Link href="/" className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors">
            <Home className="w-7 h-7" />
            <span className="text-xs">Home</span>
          </Link>
          <span className="flex flex-col items-center gap-1 text-white">
            <Flame className="w-7 h-7 text-[#FE2C55]" fill="currentColor" />
            <span className="text-xs">Viral</span>
          </span>
          <Link href="/create" className="relative -mt-6">
            <div className="w-12 h-12 bg-gradient-to-r from-[#25F4EE] via-[#FE2C55] to-[#F00056] rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" strokeWidth={3} />
            </div>
          </Link>
          <button className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors">
            <MessageCircle className="w-7 h-7" />
            <span className="text-xs">Inbox</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors">
            <User className="w-7 h-7" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  )
}
