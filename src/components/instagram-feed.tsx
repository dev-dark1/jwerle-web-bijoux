'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Heart, MessageCircle, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface InstagramPost {
  id: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL'
  media_url: string
  caption: string
  permalink: string
  like_count?: number
  comments_count?: number
  timestamp: string
}

interface InstagramFeedProps {
  limit?: number
  username?: string
}

export function InstagramFeed({ limit = 6, username = 'bijoux_iyl' }: InstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInstagramFeed = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/instagram?limit=${limit}`)
        const data = await response.json()
        
        if (response.ok) {
          setPosts(data.posts || [])
        } else {
          setError(data.error || 'Failed to load Instagram feed')
          // Fallback to placeholder data
          setPosts(generatePlaceholderPosts())
        }
      } catch (err) {
        console.error('[v0] Instagram feed error:', err)
        setError('Unable to load Instagram feed')
        setPosts(generatePlaceholderPosts())
      } finally {
        setLoading(false)
      }
    }

    fetchInstagramFeed()
  }, [limit])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: limit }).map((_, i) => (
          <div key={i} className="aspect-square bg-black-soft border border-white/5 rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="w-full">
      {error && (
        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <motion.a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-xl bg-black-soft border border-white/5 hover:border-gold/20 transition-all duration-300"
          >
            <div className="relative w-full aspect-square overflow-hidden bg-black">
              <Image
                src={post.media_url}
                alt={post.caption || 'Instagram post'}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                {post.like_count !== undefined && (
                  <div className="flex flex-col items-center gap-2">
                    <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                    <span className="text-white text-sm font-semibold">{post.like_count}</span>
                  </div>
                )}
                {post.comments_count !== undefined && (
                  <div className="flex flex-col items-center gap-2">
                    <MessageCircle className="w-8 h-8 text-blue-400" />
                    <span className="text-white text-sm font-semibold">{post.comments_count}</span>
                  </div>
                )}
              </div>

              {/* Caption Badge */}
              {post.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm line-clamp-2">{post.caption}</p>
                </div>
              )}
            </div>

            {/* Post Meta */}
            <div className="p-4 border-t border-white/5">
              <div className="flex items-center justify-between text-xs text-silver/50">
                <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                <Share2 className="w-4 h-4 text-gold group-hover:text-gold transition-colors" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {posts.length === 0 && !error && (
        <div className="text-center py-12 text-silver/50">
          <p>No Instagram posts available</p>
        </div>
      )}

      {posts.length > 0 && (
        <div className="mt-8 text-center">
          <motion.a
            href={`https://instagram.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 py-3 bg-gradient-gold text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-gold/50 transition-all duration-300"
          >
            Follow @{username}
          </motion.a>
        </div>
      )}
    </div>
  )
}

function generatePlaceholderPosts(): InstagramPost[] {
  return Array.from({ length: 6 }).map((_, i) => ({
    id: `placeholder-${i}`,
    media_type: 'IMAGE',
    media_url: `https://images.unsplash.com/photo-${1550512${i}}-?w=500&h=500&fit=crop`,
    caption: 'BIJOUX IYL - Luxury Moroccan Jewelry',
    permalink: 'https://instagram.com/bijoux_iyl',
    like_count: Math.floor(Math.random() * 500) + 100,
    comments_count: Math.floor(Math.random() * 50) + 10,
    timestamp: new Date(Date.now() - i * 86400000).toISOString(),
  }))
}
