"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { Menu, X, Sun, Moon, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/interactive-elements"
import Image from "next/image"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/members", label: "Members" },
  { href: "/dignitaries", label: "Dignitaries" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Hide navbar on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150) {
      setIsHidden(true)
    } else {
      setIsHidden(false)
    }
    setIsScrolled(latest > 50)
  })

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ 
          y: isHidden && !isMobileMenuOpen ? -100 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass py-3 shadow-lg shadow-black/5"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <MagneticButton strength={0.3}>
              <motion.div
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-primary-foreground shadow-lg shadow-primary/30"
              >
                <Image src="/mylogo.png" width={28} height={30} alt="logo" />
              </motion.div>
            </MagneticButton>
            <motion.span 
              className="text-xl font-bold tracking-tight"
              whileHover={{ scale: 1.05 }}
            >
              IEEE SMC<span className="text-primary"> Society, GNITC</span>
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item, index) => (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className="relative px-4 py-2"
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span
                    className={`relative z-10 text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                  
                  {/* Active indicator with layoutId for smooth transitions */}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 -z-10 rounded-lg bg-primary/10"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  
                  {/* Hover indicator */}
                  <AnimatePresence>
                    {hoveredIndex === index && pathname !== item.href && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 -z-10 rounded-lg bg-secondary/50"
                      />
                    )}
                  </AnimatePresence>
                  
                  {/* Underline animation */}
                  <motion.span
                    className="absolute bottom-1 left-4 right-4 h-[2px] bg-primary origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredIndex === index || pathname === item.href ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {mounted && (
              <MagneticButton strength={0.4}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                  className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/80 overflow-hidden"
                  aria-label="Toggle theme"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={resolvedTheme}
                      initial={{ y: -30, opacity: 0, rotate: -90 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: 30, opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.3 }}
                    >
                      {resolvedTheme === "dark" ? (
  <Sun className="h-5 w-5" />
) : (
  <Moon className="h-5 w-5" />
)}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              </MagneticButton>
            )}
            
            <MagneticButton strength={0.3}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild className="hidden md:flex glow-sm">
                  <Link href="/contact">Join Us</Link>
                </Button>
              </motion.div>
            </MagneticButton>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground md:hidden"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMobileMenuOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            />
            
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-40 w-[80%] max-w-sm glass md:hidden overflow-y-auto"
            >
              <div className="p-6 pt-20">
                <nav className="flex flex-col gap-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={`block rounded-lg px-4 py-3 text-lg font-medium transition-all ${
                          pathname === item.href
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        <motion.span
                          whileHover={{ x: 10 }}
                          className="flex items-center"
                        >
                          {item.label}
                        </motion.span>
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                    className="pt-4"
                  >
                    <Button asChild className="w-full glow-sm">
                      <Link href="/contact">Join Us</Link>
                    </Button>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
