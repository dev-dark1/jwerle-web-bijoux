"use client"

import { useEffect, useRef } from "react"

export function ShaderLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resize)
    resize()

    const draw = () => {
      ctx.fillStyle = "#0B0B0F" // Black BG
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += 0.005

      // Gold Lines
      ctx.lineWidth = 1
      
      for (let i = 0; i < 20; i++) {
        const y = (canvas.height / 20) * i
        
        ctx.beginPath()
        for (let x = 0; x < canvas.width; x += 10) {
          // Sine wave movement
          const yOffset = Math.sin(x * 0.005 + time + i) * (50 + i * 2)
          ctx.lineTo(x, y + yOffset)
        }
        
        // Gradient for the line
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        gradient.addColorStop(0, "rgba(212, 175, 55, 0)")
        gradient.addColorStop(0.5, "rgba(212, 175, 55, 0.4)")
        gradient.addColorStop(1, "rgba(212, 175, 55, 0)")
        
        ctx.strokeStyle = gradient
        ctx.stroke()
      }
      
      // Silver Lines (Subtle)
      ctx.lineWidth = 0.5
      for (let i = 0; i < 10; i++) {
        const y = (canvas.height / 10) * i + 50
        
        ctx.beginPath()
        for (let x = 0; x < canvas.width; x += 20) {
          const yOffset = Math.cos(x * 0.003 - time * 1.5 + i) * 30
          ctx.lineTo(x, y + yOffset)
        }
        
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        gradient.addColorStop(0, "rgba(200, 200, 200, 0)")
        gradient.addColorStop(0.5, "rgba(200, 200, 200, 0.2)")
        gradient.addColorStop(1, "rgba(200, 200, 200, 0)")
        
        ctx.strokeStyle = gradient
        ctx.stroke()
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full -z-10 opacity-60 pointer-events-none" 
    />
  )
}
