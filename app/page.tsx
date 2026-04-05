"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Users, Calendar, Trophy, Zap, Code, Lightbulb, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedBackground } from "@/components/animated-background"
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper"
import { 
  TextReveal, 
  WordReveal, 
  StaggerReveal, 
  Counter, 
  ScaleOnScroll,
  ClipReveal,
  useSmoothScroll
} from "@/components/gsap-animations"
import { 
  TiltCard, 
  MagneticButton, 
  ScrollReveal, 
  FloatingElement,
  MouseTrackingOrb
} from "@/components/interactive-elements"

const stats = [
  { value: 100, label: "Active Members", icon: Users, suffix: "+" },
  { value: 8, label: "Impactful Events", icon: Calendar, suffix: "+" },
  { value: 10, label: "Technical Workshops", icon: Trophy, suffix: "+" },
  { value: 2, label: "Years of Excellence", icon: Zap, suffix: "+" },
]

const highlights = [
  {
    icon: Code,
    title: "Technical Workshops",
    description: "Hands-on training in AI, Cybersecurity, Data Science, Robotics, and emerging technologies.",
    color: "from-blue-500/20 to-cyan-500/10",
  },
  {
    icon: Lightbulb,
    title: "Hackathons & Competitions",
    description: "Participate in national-level hackathons, coding contests, and innovation challenges.",
    color: "from-amber-500/20 to-orange-500/10",
  },
  {
    icon: Rocket,
    title: "Industry Exposure",
    description: "Gain insights through guest lectures, seminars, and collaborations with industry professionals.",
    color: "from-purple-500/20 to-pink-500/10",
  },
]

const upcomingEvents = [
{
    id: "1",
    title: "NEXUS 1.0 – Where Tech Meets Creativity",
    description: "A multidisciplinary event combining technology and creativity through exciting sub-events like AI Prompt War, Teaser Cut, Trace & Track, Doodle Competition, and E-Sports.",
    // For countdown
  date: "2026-04-16T10:00:00",
  // For display
  displayDate: "April 16–17, 2026",
    time: "10:00 AM - 4:00 PM",
    location: "GNITC Campus",
    registrationLink: "https://konfhub.com/nexus",
    type: "conference",
    image: "/NEXUS.png",
    attendees: 200,
    highlights: [
    "AI Prompt War",
    "Teaser Cut (Short Filmmaking)",
    "Trace & Track Mystery Event",
    "Doodle Competition",
    "E-Sports (BGMI & Free Fire)"
  ],
  },
]

// Letter animation variants
const letterVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

export default function HomePage() {
  useSmoothScroll()

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedBackground />
        <MouseTrackingOrb className="left-1/4 top-1/3 opacity-40" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary ring-1 ring-primary/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Now accepting new members for 2026
            </motion.div>

            {/* Main Heading with letter animation */}
            <div className="overflow-hidden">
              <motion.h1
                className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
              >
                <span className="block overflow-hidden">
                  {"Where Ideas".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      className="inline-block"
                      style={{ display: char === " " ? "inline" : "inline-block" }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </span>
                <span className="block overflow-hidden">
                  {"Transform Reality".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      custom={i + 11}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      className="inline-block gradient-text text-glow"
                      style={{ display: char === " " ? "inline" : "inline-block" }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </span>
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl text-pretty"
            >
              IEEE SMC Society, GNITC. Where Innovation Meets Intelligence 
              Empowering students to explore Artificial Intelligence, Cybernetics, Robotics and Intelligent Systems through real-world learning, research, and innovation.
              Join a community of future engineers, researchers, and innovators shaping tomorrow’s technology.

            </motion.p>

            {/* CTA Buttons with magnetic effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <MagneticButton strength={0.2}>
                <Button asChild size="lg" className="group glow-sm relative overflow-hidden">
                  <Link href="/contact">
                    <span className="relative z-10 flex items-center">
                      Join IEEE SMC GNI
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <Button asChild variant="outline" size="lg" className="group">
                  <Link href="/events">
                    Explore Events
                    <motion.span
                      className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </Button>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Stats with counter animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <TiltCard key={stat.label} tiltAmount={8} scale={1.05}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.8 + index * 0.1 }}
                  className="glass-card rounded-2xl p-6 text-center"
                >
                  <FloatingElement duration={3} distance={8} delay={index * 0.5}>
                    <stat.icon className="mx-auto mb-3 h-6 w-6 text-primary" />
                  </FloatingElement>
                  <div className="text-3xl font-bold text-foreground">
                    <Counter end={stat.value} suffix={stat.suffix} duration={2.5} />
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              </TiltCard>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted-foreground/30 p-2"
          >
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-2 w-1 rounded-full bg-primary" 
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Highlights Section */}
      <SectionWrapper className="bg-card/30 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            title="What We Offer"
            subtitle="Discover the opportunities that await you as a member of IEEE SMC GNI"
          />
          
          <StaggerReveal staggerAmount={0.15} className="grid gap-8 md:grid-cols-3">
            {highlights.map((item, index) => (
              <TiltCard key={item.title} tiltAmount={12} scale={1.03}>
                <div className="group glass-card rounded-2xl p-8 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 h-full">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                  <div className="relative">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="mb-6 inline-flex rounded-xl bg-primary/10 p-4 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                    >
                      <item.icon className="h-8 w-8" />
                    </motion.div>
                    <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </StaggerReveal>
        </div>
      </SectionWrapper>

      {/* Upcoming Events Preview */}
      <SectionWrapper>
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <ScrollReveal effect="fadeRight">
              <SectionHeader
                title="Upcoming Events"
                subtitle="Don't miss out on our exciting upcoming activities"
                centered={true}
              />
            </ScrollReveal>
            <ScrollReveal effect="fadeLeft">
              <MagneticButton>
                <Button asChild variant="outline">
                  <Link href="/events" className="flex items-center">
                    View All Events
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </MagneticButton>
            </ScrollReveal>
          </div>
          
          <StaggerReveal staggerAmount={0.2} className="mt-8 grid gap-8 md:grid-cols-3">
            {upcomingEvents.map((event) => (
              <TiltCard key={event.title} tiltAmount={10}>
                <div className="group overflow-hidden rounded-2xl bg-card cursor-pointer">
                  <ClipReveal direction="up">
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={event.image}
                        alt={event.title}
                        className="h-full w-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        crossOrigin="anonymous"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                      <motion.span 
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground"
                      >
                        {event.type}
                      </motion.span>
                    </div>
                  </ClipReveal>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold transition-colors group-hover:text-primary">
                      {event.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{event.date}</p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </StaggerReveal>
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        <MouseTrackingOrb className="right-1/4 top-1/3" />
        
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <ScaleOnScroll startScale={0.85} endScale={1}>
            <div className="glass-card rounded-3xl p-12 md:p-16 relative overflow-hidden">
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: "linear-gradient(90deg, var(--primary), var(--accent), var(--primary))",
                  backgroundSize: "200% 100%",
                  padding: "2px",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              
              <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl text-balance">
                <WordReveal>Ready to Start Your Journey?</WordReveal>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                Join IEEE SMC GNITC and be part of a community that builds, innovates, and leads. Your journey into technology, research, and innovation starts here.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 inline-block"
              >
                <MagneticButton>
                  <Button asChild size="lg" className="glow group relative overflow-hidden">
                    <Link href="/contact">
                      <span className="relative z-10 flex items-center">
                        Become a Member
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </Button>
                </MagneticButton>
              </motion.div>
            </div>
          </ScaleOnScroll>
        </div>
      </SectionWrapper>
    </>
  )
}
