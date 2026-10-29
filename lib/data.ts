import { Video } from "./types"

export const videos: Video[] = [
  {
    id: "1",
    user: {
      id: "u1",
      username: "dancequeen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dancequeen",
      verified: true
    },
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    caption: "New dance challenge! 💃 Can you keep up? #dance #trending #viral",
    music: "Original Sound - dancequeen",
    likes: 234500,
    comments: 1250,
    shares: 890,
    saves: 3400
  },
  {
    id: "2",
    user: {
      id: "u2",
      username: "foodlover",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=foodlover"
    },
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    caption: "Best pasta recipe ever! 🍝 Save this for later #cooking #food #recipe",
    music: "Chill Vibes - Lofi Beats",
    likes: 156700,
    comments: 890,
    shares: 560,
    saves: 8900
  },
  {
    id: "3",
    user: {
      id: "u3",
      username: "fitnessguru",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fitnessguru",
      verified: true
    },
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    caption: "Morning workout routine 💪 No equipment needed! #fitness #workout #motivation",
    music: "Workout Mix - Gym Beats",
    likes: 445600,
    comments: 2340,
    shares: 1200,
    saves: 12300
  },
  {
    id: "4",
    user: {
      id: "u4",
      username: "travelbug",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=travelbug"
    },
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    caption: "Hidden gem in Bali 🏝️ You need to visit this place! #travel #bali #paradise",
    music: "Summer Vibes - Tropical House",
    likes: 567800,
    comments: 3450,
    shares: 2100,
    saves: 15600
  },
  {
    id: "5",
    user: {
      id: "u5",
      username: "comedian",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=comedian",
      verified: true
    },
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    caption: "When you realize it's Monday tomorrow 😭 #funny #relatable #comedy",
    music: "Funny Sound - comedian",
    likes: 789000,
    comments: 4560,
    shares: 3400,
    saves: 6700
  }
]
