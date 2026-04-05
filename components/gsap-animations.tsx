"use client"

import { useEffect, useRef, ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Smooth scroll wrapper that enables GSAP ScrollTrigger
export function useSmoothScroll() {
  useEffect(() => {
    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
}

// Parallax section effect - 2x stronger
interface ParallaxSectionProps {
  children: ReactNode
  speed?: number
  className?: string
}

export function ParallaxSection({ children, speed = 1, className = "" }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.to(section, {
        yPercent: -speed * 60, // 2x movement
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5, // Smoother scrub
        },
      })
    }, section)

    return () => ctx.revert()
  }, [speed])

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  )
}

// Text reveal animation (letter by letter) - 2x more dramatic
interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  stagger?: number
}

export function TextReveal({ children, className = "", delay = 0, stagger = 0.06 }: TextRevealProps) {
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    const chars = element.querySelectorAll(".char")
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        {
          y: 200, // 2x vertical offset
          opacity: 0,
          rotateX: -180, // 2x rotation
          scale: 0.5, // Added scale
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 1.2, // Longer duration
          stagger: stagger,
          ease: "back.out(2)", // Stronger bounce
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          delay: delay,
        }
      )
    }, element)

    return () => ctx.revert()
  }, [delay, stagger])

  const words = children.split(" ")

  return (
    <span ref={textRef} className={`inline-block overflow-hidden ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              className="char inline-block"
              style={{ display: "inline-block" }}
            >
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  )
}

// Word reveal animation - 2x stronger
interface WordRevealProps {
  children: string
  className?: string
  delay?: number
}

export function WordReveal({ children, className = "", delay = 0 }: WordRevealProps) {
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    const words = element.querySelectorAll(".word")
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          y: 120, // 2x offset
          opacity: 0,
          rotateZ: 8, // Added rotation
          scale: 0.8, // Added scale
        },
        {
          y: 0,
          opacity: 1,
          rotateZ: 0,
          scale: 1,
          duration: 1, // Longer duration
          stagger: 0.15, // 2x stagger
          ease: "power4.out",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          delay: delay,
        }
      )
    }, element)

    return () => ctx.revert()
  }, [delay])

  const words = children.split(" ")

  return (
    <span ref={textRef} className={`inline-block ${className}`}>
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden">
          <span className="word inline-block">
            {word}
            {index < words.length - 1 && "\u00A0"}
          </span>
        </span>
      ))}
    </span>
  )
}

// Scroll-triggered fade up with stagger - 2x intensity
interface StaggerRevealProps {
  children: ReactNode
  className?: string
  staggerAmount?: number
  y?: number
}

export function StaggerReveal({ children, className = "", staggerAmount = 0.2, y = 120 }: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const items = container.children

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        {
          y: y,
          opacity: 0,
          scale: 0.85, // Added scale
          rotateY: 15, // Added 3D rotation
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1.2, // Longer duration
          stagger: staggerAmount,
          ease: "power4.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, container)

    return () => ctx.revert()
  }, [staggerAmount, y])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}

// Horizontal scroll section
interface HorizontalScrollProps {
  children: ReactNode
  className?: string
}

export function HorizontalScroll({ children, className = "" }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const scrollContainer = scrollRef.current
    if (!container || !scrollContainer) return

    const scrollWidth = scrollContainer.scrollWidth - window.innerWidth

    const ctx = gsap.context(() => {
      gsap.to(scrollContainer, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${scrollWidth}`,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        },
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={scrollRef} className="flex">
        {children}
      </div>
    </div>
  )
}

// Scale on scroll - 2x dramatic
interface ScaleOnScrollProps {
  children: ReactNode
  className?: string
  startScale?: number
  endScale?: number
}

export function ScaleOnScroll({ children, className = "", startScale = 0.6, endScale = 1 }: ScaleOnScrollProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          scale: startScale,
          opacity: 0,
          rotateX: 20, // Added 3D rotation
          y: 100,
        },
        {
          scale: endScale,
          opacity: 1,
          rotateX: 0,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            end: "top 30%",
            scrub: 0.5,
          },
        }
      )
    }, element)

    return () => ctx.revert()
  }, [startScale, endScale])

  return (
    <div ref={elementRef} className={className} style={{ perspective: "1000px" }}>
      {children}
    </div>
  )
}

// Clip path reveal - 2x duration
interface ClipRevealProps {
  children: ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
}

export function ClipReveal({ children, className = "", direction = "up" }: ClipRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const clipPaths = {
      up: { from: "inset(100% 0% 0% 0%)", to: "inset(0% 0% 0% 0%)" },
      down: { from: "inset(0% 0% 100% 0%)", to: "inset(0% 0% 0% 0%)" },
      left: { from: "inset(0% 100% 0% 0%)", to: "inset(0% 0% 0% 0%)" },
      right: { from: "inset(0% 0% 0% 100%)", to: "inset(0% 0% 0% 0%)" },
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          clipPath: clipPaths[direction].from,
          scale: 1.1, // Added scale overshoot
        },
        {
          clipPath: clipPaths[direction].to,
          scale: 1,
          duration: 2, // 2x duration
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, element)

    return () => ctx.revert()
  }, [direction])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Pin section with progress
interface PinSectionProps {
  children: ReactNode
  className?: string
  pinDuration?: number
}

export function PinSection({ children, className = "", pinDuration = 2 }: PinSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${window.innerHeight * pinDuration}`,
        pin: true,
        pinSpacing: true,
      })
    }, section)

    return () => ctx.revert()
  }, [pinDuration])

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  )
}

// Counter animation on scroll - 2x duration
interface CounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export function Counter({ end, duration = 3.5, suffix = "", prefix = "", className = "" }: CounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const element = counterRef.current
    if (!element) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: element,
        start: "top 85%",
        onEnter: () => {
          if (hasAnimated.current) return
          hasAnimated.current = true
          
          const obj = { value: 0 }
          gsap.to(obj, {
            value: end,
            duration: duration,
            ease: "power2.out",
            onUpdate: () => {
              if (element) {
                element.textContent = `${prefix}${Math.round(obj.value)}${suffix}`
              }
            },
          })
        },
      })
    }, element)

    return () => ctx.revert()
  }, [end, duration, suffix, prefix])

  return (
    <span ref={counterRef} className={className}>
      {prefix}0{suffix}
    </span>
  )
}

// NEW: Dramatic slide in
interface SlideInProps {
  children: ReactNode
  className?: string
  direction?: "left" | "right" | "up" | "down"
  delay?: number
}

export function SlideIn({ children, className = "", direction = "left", delay = 0 }: SlideInProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const directions = {
      left: { x: -200, y: 0 },
      right: { x: 200, y: 0 },
      up: { x: 0, y: 200 },
      down: { x: 0, y: -200 },
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          x: directions[direction].x,
          y: directions[direction].y,
          opacity: 0,
          scale: 0.8,
          rotateZ: direction === "left" ? -10 : direction === "right" ? 10 : 0,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotateZ: 0,
          duration: 1.5,
          ease: "power4.out",
          delay: delay,
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, element)

    return () => ctx.revert()
  }, [direction, delay])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// NEW: Bounce in effect
interface BounceInProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function BounceIn({ children, className = "", delay = 0 }: BounceInProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          y: -100,
          opacity: 0,
          scale: 0.3,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "bounce.out",
          delay: delay,
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, element)

    return () => ctx.revert()
  }, [delay])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// NEW: Rotate in 3D
interface Rotate3DProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function Rotate3D({ children, className = "", delay = 0 }: Rotate3DProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          rotateY: 180,
          rotateX: 45,
          opacity: 0,
          scale: 0.5,
        },
        {
          rotateY: 0,
          rotateX: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power4.out",
          delay: delay,
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, element)

    return () => ctx.revert()
  }, [delay])

  return (
    <div ref={elementRef} className={className} style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
      {children}
    </div>
  )
}
