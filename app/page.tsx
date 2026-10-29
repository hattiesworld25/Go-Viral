"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, MessageCircle, Share2, Bookmark, Music2, Search, Plus, Home, Compass, User, Flame } from "lucide-react"
import Link from "next/link"
import VideoPlayer from "@/components/video-player"
import Sidebar from "@/components/sidebar"
import { videos } from "@/lib/data"

export default function HomePage() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef(0)
  const scrollTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      
      if (isScrolling) return
      
      if (Math.abs(e.deltaY) > 50) {
        setIsScrolling(true)
        
        if (e.deltaY > 0 && currentVideoIndex < videos.length - 1) {
          setCurrentVideoIndex(prev => prev + 1)
        } else if (e.deltaY < 0 && currentVideoIndex > 0) {
          setCurrentVideoIndex(prev => prev - 1)
        }
        
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current)
        }
        scrollTimeout.current = setTimeout(() => {
          setIsScrolling(false)
        }, 800)
      }
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    return () => container.removeEventListener("wheel", handleWheel)
  }, [currentVideoIndex, isScrolling])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY
    const diff = touchStartY.current - touchEndY

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentVideoIndex < videos.length - 1) {
        setCurrentVideoIndex(prev => prev + 1)
      } else if (diff < 0 && currentVideoIndex > 0) {
        setCurrentVideoIndex(prev => prev - 1)
      }
    }
  }

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-white font-semibold text-lg">
            Following
          </Link>
          <Link href="/" className="text-white/60 font-semibold text-lg hover:text-white transition-colors">
            For You
          </Link>
          <Link href="/viral" className="text-white/60 font-semibold text-lg hover:text-white transition-colors flex items-center gap-1">
            <Flame className="w-5 h-5 text-[#FE2C55]" fill="currentColor" />
            Viral
          </Link>
        </div>
        <button className="text-white">
          <Search className="w-6 h-6" />
        </button>
      </div>

      {/* Video Feed */}
      <div
        ref={containerRef}
        className="h-full w-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentVideoIndex}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <VideoPlayer
              video={videos[currentVideoIndex]}
              isActive={true}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sidebar */}
      <Sidebar video={videos[currentVideoIndex]} />

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-50 bg-black border-t border-white/10">
        <div className="flex items-center justify-around px-4 py-3">
          <button className="flex flex-col items-center gap-1 text-white">
            <Home className="w-7 h-7" fill="currentColor" />
            <span className="text-xs">Home</span>
          </button>
          <Link href="/viral" className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors">
            <Compass className="w-7 h-7" />
            <span className="text-xs">Discover</span>
          </Link>
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
