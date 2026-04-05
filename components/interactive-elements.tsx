"use client"

import { useRef, useState, useEffect, ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

// Magnetic button effect - 2x strength
interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function MagneticButton({ children, className = "", strength = 0.6 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 10, stiffness: 100 } // More bouncy
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength
    x.set(deltaX)
    y.set(deltaY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// 3D Tilt card effect - 2x tilt
interface TiltCardProps {
  children: ReactNode
  className?: string
  tiltAmount?: number
  glareEnabled?: boolean
  scale?: number
}

export function TiltCard({ 
  children, 
  className = "", 
  tiltAmount = 20, // 2x tilt
  glareEnabled = true,
  scale = 1.08 // 2x scale
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)

  const springConfig = { damping: 15, stiffness: 200 } // More responsive
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const percentX = (e.clientX - centerX) / (rect.width / 2)
    const percentY = (e.clientY - centerY) / (rect.height / 2)
    
    rotateX.set(-percentY * tiltAmount)
    rotateY.set(percentX * tiltAmount)
    
    // Update glare position
    const glarePercentX = ((e.clientX - rect.left) / rect.width) * 100
    const glarePercentY = ((e.clientY - rect.top) / rect.height) * 100
    glareX.set(glarePercentX)
    glareY.set(glarePercentY)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    rotateX.set(0)
    rotateY.set(0)
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      whileHover={{ scale, y: -10 }} // Added lift
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative ${className}`}
    >
      {children}
      
      {/* Glare effect - stronger */}
      {glareEnabled && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-inherit overflow-hidden"
          style={{
            opacity: isHovering ? 0.4 : 0, // 2x opacity
            background: useTransform(
              [glareX, glareY],
              ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.6) 0%, transparent 60%)`
            ),
          }}
        />
      )}
    </motion.div>
  )
}

// Ripple button effect - 2x size and duration
interface RippleButtonProps {
  children: ReactNode
  className?: string
  rippleColor?: string
}

export function RippleButton({ children, className = "", rippleColor = "rgba(255,255,255,0.6)" }: RippleButtonProps) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; size: number }[]>([])
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2 // 2x size
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2
    
    const newRipple = { id: Date.now(), x, y, size }
    setRipples(prev => [...prev, newRipple])
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 1200) // 2x duration
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
    >
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }} // Bigger expansion
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: rippleColor,
          }}
        />
      ))}
      {children}
    </button>
  )
}

// Animated link underline
interface AnimatedLinkProps {
  children: ReactNode
  href: string
  className?: string
}

export function AnimatedLink({ children, href, className = "" }: AnimatedLinkProps) {
  return (
    <a href={href} className={`group relative inline-block ${className}`}>
      {children}
      <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
    </a>
  )
}

// Custom cursor follower
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let dotX = 0
    let dotY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target && typeof target.matches === 'function' && target.matches("a, button, [data-cursor-hover]")) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target && typeof target.matches === 'function' && target.matches("a, button, [data-cursor-hover]")) {
        setIsHovering(false)
      }
    }

    const animate = () => {
      // Smooth cursor follow
      cursorX += (mouseX - cursorX) * 0.15
      cursorY += (mouseY - cursorY) * 0.15
      dotX += (mouseX - dotX) * 0.4
      dotY += (mouseY - dotY) * 0.4

      cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`
      cursorDot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`
      
      requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseenter", handleMouseEnter, true)
    document.addEventListener("mouseleave", handleMouseLeave, true)
    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseenter", handleMouseEnter, true)
      document.removeEventListener("mouseleave", handleMouseLeave, true)
    }
  }, [])

  return (
    <>
      {/* Outer cursor ring */}
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] hidden h-10 w-10 rounded-full border-2 transition-all duration-300 md:block ${
          isHovering 
            ? "scale-150 border-primary bg-primary/10" 
            : "border-primary/50"
        } ${isClicking ? "scale-90" : ""}`}
        style={{ mixBlendMode: "difference" }}
      />
      {/* Inner cursor dot */}
      <div
        ref={cursorDotRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] hidden h-2 w-2 rounded-full bg-primary transition-transform duration-150 md:block ${
          isClicking ? "scale-50" : ""
        }`}
      />
    </>
  )
}

// Floating elements animation - 2x motion
interface FloatingElementProps {
  children: ReactNode
  className?: string
  duration?: number
  distance?: number
  delay?: number
}

export function FloatingElement({ 
  children, 
  className = "", 
  duration = 2, // Faster
  distance = 40, // 2x distance
  delay = 0 
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [-distance / 2, distance / 2, -distance / 2],
        rotate: [-5, 5, -5], // Added rotation
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Reveal on scroll with various effects - 2x intensity
interface ScrollRevealProps {
  children: ReactNode
  className?: string
  effect?: "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale" | "rotate" | "flip"
  delay?: number
  duration?: number
}

export function ScrollReveal({ 
  children, 
  className = "", 
  effect = "fadeUp",
  delay = 0,
  duration = 1 // Longer duration
}: ScrollRevealProps) {
  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 120, scale: 0.9 }, // 2x offset + scale
      visible: { opacity: 1, y: 0, scale: 1 },
    },
    fadeDown: {
      hidden: { opacity: 0, y: -120, scale: 0.9 },
      visible: { opacity: 1, y: 0, scale: 1 },
    },
    fadeLeft: {
      hidden: { opacity: 0, x: -120, rotate: -10 }, // Added rotation
      visible: { opacity: 1, x: 0, rotate: 0 },
    },
    fadeRight: {
      hidden: { opacity: 0, x: 120, rotate: 10 },
      visible: { opacity: 1, x: 0, rotate: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.5 }, // 2x scale change
      visible: { opacity: 1, scale: 1 },
    },
    rotate: {
      hidden: { opacity: 0, rotate: -30, scale: 0.7 }, // 3x rotation + scale
      visible: { opacity: 1, rotate: 0, scale: 1 },
    },
    flip: {
      hidden: { opacity: 0, rotateY: 180, scale: 0.8 },
      visible: { opacity: 1, rotateY: 0, scale: 1 },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants[effect]}
      transition={{ 
        duration, 
        delay, 
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className={className}
      style={effect === "flip" ? { perspective: "1000px", transformStyle: "preserve-3d" } : undefined}
    >
      {children}
    </motion.div>
  )
}

// Morphing shape background
export function MorphingShape({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <defs>
          <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <motion.path
          fill="url(#morphGradient)"
          animate={{
            d: [
              "M40,-62.6C52.9,-56.5,65.1,-47.7,71.8,-35.6C78.5,-23.5,79.7,-8.1,77.4,6.4C75.1,20.9,69.2,34.5,60.1,45.8C51,57.1,38.7,66.1,24.8,71.3C10.9,76.5,-4.6,77.9,-19.4,74.8C-34.2,71.7,-48.4,64.1,-58.9,52.9C-69.4,41.7,-76.3,26.9,-78.5,11.2C-80.7,-4.5,-78.2,-21.1,-70.8,-34.4C-63.4,-47.7,-51.1,-57.7,-37.6,-63.4C-24.1,-69.1,-9.4,-70.5,2.6,-74.3C14.6,-78.1,27.1,-68.7,40,-62.6Z",
              "M47.3,-73.7C60.9,-66.4,71.2,-52.4,76.9,-37.1C82.6,-21.8,83.7,-5.2,80.5,10.1C77.3,25.4,69.8,39.4,59.3,50.5C48.8,61.6,35.3,69.8,20.4,74.6C5.5,79.4,-10.8,80.8,-25.8,76.7C-40.8,72.6,-54.5,63,-64.4,50.3C-74.3,37.6,-80.4,21.8,-81.1,5.7C-81.8,-10.4,-77.1,-26.8,-68.3,-40.2C-59.5,-53.6,-46.6,-64,-32.6,-70.8C-18.6,-77.6,-3.5,-80.8,11.2,-80C25.9,-79.2,33.7,-81,47.3,-73.7Z",
              "M40,-62.6C52.9,-56.5,65.1,-47.7,71.8,-35.6C78.5,-23.5,79.7,-8.1,77.4,6.4C75.1,20.9,69.2,34.5,60.1,45.8C51,57.1,38.7,66.1,24.8,71.3C10.9,76.5,-4.6,77.9,-19.4,74.8C-34.2,71.7,-48.4,64.1,-58.9,52.9C-69.4,41.7,-76.3,26.9,-78.5,11.2C-80.7,-4.5,-78.2,-21.1,-70.8,-34.4C-63.4,-47.7,-51.1,-57.7,-37.6,-63.4C-24.1,-69.1,-9.4,-70.5,2.6,-74.3C14.6,-78.1,27.1,-68.7,40,-62.6Z",
            ],
          }}
          transition={{
            duration: 6, // Faster morphing
            repeat: Infinity,
            ease: "easeInOut",
          }}
          transform="translate(100 100)"
        />
      </svg>
    </div>
  )
}

// Gradient orb with mouse tracking - 2x movement
export function MouseTrackingOrb({ className = "" }: { className?: string }) {
  const orbRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 30, stiffness: 80 } // More movement
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbRef.current) return
      const rect = orbRef.current.parentElement?.getBoundingClientRect()
      if (!rect) return
      x.set((e.clientX - rect.left - rect.width / 2) * 1.5) // 1.5x movement
      y.set((e.clientY - rect.top - rect.height / 2) * 1.5)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [x, y])

  return (
    <motion.div
      ref={orbRef}
      style={{
        x: springX,
        y: springY,
      }}
      className={`pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-gradient-to-r from-primary/30 to-accent/20 blur-[120px] ${className}`}
    />
  )
}

// NEW: Pulse glow effect
interface PulseGlowProps {
  children: ReactNode
  className?: string
  color?: string
}

export function PulseGlow({ children, className = "", color = "var(--primary)" }: PulseGlowProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        boxShadow: [
          `0 0 20px ${color}40`,
          `0 0 60px ${color}60`,
          `0 0 20px ${color}40`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

// NEW: Shake on hover
interface ShakeOnHoverProps {
  children: ReactNode
  className?: string
}

export function ShakeOnHover({ children, className = "" }: ShakeOnHoverProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.5 },
      }}
    >
      {children}
    </motion.div>
  )
}

// NEW: Zoom pulse
interface ZoomPulseProps {
  children: ReactNode
  className?: string
}

export function ZoomPulse({ children, className = "" }: ZoomPulseProps) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}
