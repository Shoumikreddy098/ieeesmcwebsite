"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
}

export function SectionWrapper({ children, className = "", id }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`py-20 md:py-28 ${className}`}
    >
      {children}
    </motion.section>
  )
}

export function SectionHeader({
  title,
  subtitle,
  centered = true,
}: {
  title: string
  subtitle?: string
  centered?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}
    >
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
