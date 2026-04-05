"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"
import Image from "next/image"

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; vx: number; vy: number; size: number; life: number }[] = []
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    const animate = () => {
      if (!isLoading) return
      
      ctx.fillStyle = "rgba(13, 13, 20, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add new particles
      if (Math.random() > 0.7) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 2 + 1
        particles.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3 + 1,
          life: 1,
        })
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.01

        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(56, 189, 248, ${p.life * 0.5})`
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()
  }, [isLoading])

  // Progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
          }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
        >
          {/* Particle canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 opacity-50"
          />

          {/* Animated gradient background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[150px]"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute left-1/3 top-1/3 h-[400px] w-[400px] rounded-full bg-accent/20 blur-[120px]"
            />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Animated Logo with orbiting rings */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative"
            >
              {/* Orbiting rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-30px] rounded-full border border-primary/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-50px] rounded-full border border-accent/10"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-70px] rounded-full border border-primary/5"
              />

              {/* Glow effect */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-[-20px] rounded-3xl bg-gradient-to-r from-primary to-accent opacity-50 blur-2xl"
              />

              {/* Logo */}
              <motion.div
                animate={{ 
                  rotateY: [0, 360],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-2xl"
              >
                <Image src="/mylogo.png" width={60} height={60} alt="logo" />
              </motion.div>
            </motion.div>

            {/* Text with letter animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold tracking-tight">
                {"IEEE SMC".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
                {"GNI".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    className="inline-block text-primary"
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>

              {/* Progress bar */}
              <div className="mt-8 w-64">
                <div className="h-1 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 0.2 }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  />
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-3 text-sm text-muted-foreground"
                >
                  {progress < 100 ? "Loading experience..." : "Welcome!"}
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* Decorative corner elements */}
          <div className="absolute left-8 top-8 h-20 w-20 border-l-2 border-t-2 border-primary/20" />
          <div className="absolute right-8 top-8 h-20 w-20 border-r-2 border-t-2 border-primary/20" />
          <div className="absolute bottom-8 left-8 h-20 w-20 border-b-2 border-l-2 border-primary/20" />
          <div className="absolute bottom-8 right-8 h-20 w-20 border-b-2 border-r-2 border-primary/20" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
