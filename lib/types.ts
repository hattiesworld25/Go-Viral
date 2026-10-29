export interface User {
  id: string
  username: string
  avatar: string
  verified?: boolean
}

export interface Video {
  id: string
  user: User
  videoUrl: string
  caption: string
  music: string
  likes: number
  comments: number
  shares: number
  saves: number
}
