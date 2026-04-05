"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, Clock, Users, Search, Filter, ArrowRight, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper"
import { AnimatedBackground } from "@/components/animated-background"
import { TextReveal, StaggerReveal, Counter, useSmoothScroll } from "@/components/gsap-animations"
import { TiltCard, ScrollReveal, MagneticButton, RippleButton, MouseTrackingOrb } from "@/components/interactive-elements"
function isEventUpcoming(date: string) {
  return new Date(date) > new Date()
}
function handleShare(event: Event) {
  const url = event.registrationLink || window.location.href

  if (navigator.share) {
    navigator.share({
      title: event.title,
      text: event.description,
      url: url,
    })
  } else {
    navigator.clipboard.writeText(url)
    alert("Link copied to clipboard 📋")
  }
}

type EventType = "all" | "workshop" | "hackathon" | "conference" | "meetup"

interface Event {
  id: string
  title: string
  description: string
  date: string
  displayDate?: string
  time: string
  location: string
  type: EventType
  image: string
  attendees: number
  registrationLink?: string
  highlights?: string[]
}

const events: Event[] = [
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
{
  id: "p1",
  title: "TechX: The Coding Battle",
  description: "A competitive coding event with multiple rounds testing problem-solving, algorithmic thinking, and coding efficiency.",
  date: "2025-02-08T10:00:00",
  displayDate: "February 8, 2025",
  time: "10:00 AM - 4:00 PM",
  location: "R&D Block, GNITC",
  type: "conference",
  image: "/TechX1.png",
  attendees: 120,
},

{
  id: "p2",
  title: "CyberCrack 1.0",
  description: "A 3-day cybersecurity bootcamp focused on ethical hacking and Capture The Flag challenges.",
  date: "2025-04-24T13:00:00",
  displayDate: "April 24–26, 2025",
  time: "1:00 PM - 4:00 PM",
  location: "GNITC Campus",
  type: "workshop",
  image: "/cybercrack1.png",
  attendees: 99,
},

{
  id: "p3",
  title: "AI Tools & Applications Webinar",
  description: "Expert session on AI tools and their real-world applications in automation and IT systems.",
  date: "2025-08-02T10:00:00",
  displayDate: "August 2, 2025",
  time: "10:00 AM - 1:00 PM",
  location: "GNITC Campus",
  type: "conference",
  image: "/aitools.png",
  attendees: 150,
},

{
  id: "p4",
  title: "CyberCrack 2.0",
  description: "Advanced cybersecurity bootcamp with live hacking demos, tools training, and CTF competition.",
  date: "2025-09-23T10:00:00",
  displayDate: "September 23–24, 2025",
  time: "10:00 AM - 5:00 PM",
  location: "GNITC Campus",
  type: "workshop",
  image: "/cyber2.png",
  attendees: 168,
},

{
  id: "p5",
  title: "TECHX 2.0 Innovation Challenge",
  description: "A multi-domain innovation challenge featuring coding, AI, and ideation tracks to solve real-world problems.",
  date: "2026-01-10T10:00:00",
  displayDate: "January 2026",
  time: "Full Day Event",
  location: "GNITC Campus",
  type: "conference",
  image: "/techx.png",
  attendees: 130,
},

{
  id: "p6",
  title: "TECH HORIZON 1.0",
  description: "A national-level hackathon focused on solving real-world challenges across multiple domains.",
  date: "2026-03-13T10:00:00",
  displayDate: "March 13–14, 2026",
  time: "2 Days Event",
  location: "GNITC Auditorium",
  type: "hackathon",
  image: "/techhorizon.png",
  attendees: 119,
},

{
  id: "p7",
  title: "CyberSec Bootcamp",
  description: "A cybersecurity awareness and career-focused event featuring expert sessions and interactive learning.",
  date: "2026-03-14T10:00:00",
  displayDate: "March 14, 2026",
  time: "10:00 AM - 4:00 PM",
  location: "GNITC Campus",
  type: "workshop",
  image: "/cybersec.png",
  attendees: 300,
},
]

const filterOptions: { value: EventType; label: string }[] = [
  { value: "all", label: "All Events" },
  { value: "workshop", label: "Workshops" },
  { value: "hackathon", label: "Hackathons" },
  { value: "conference", label: "Conferences" },
  { value: "meetup", label: "Meetups" },
]

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime()
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }
    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex gap-3">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <motion.div 
          key={unit} 
          className="text-center"
          whileHover={{ scale: 1.1, y: -2 }}
        >
          <motion.div 
            className="rounded-lg bg-primary/10 px-3 py-2 relative overflow-hidden"
            animate={{ 
              boxShadow: ["0 0 0px rgba(56,189,248,0)", "0 0 20px rgba(56,189,248,0.3)", "0 0 0px rgba(56,189,248,0)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xl font-bold text-primary">{String(value).padStart(2, "0")}</span>
          </motion.div>
          <span className="mt-1 text-xs text-muted-foreground capitalize">{unit}</span>
        </motion.div>
      ))}
    </div>
  )
}

function EventModal({ event, onClose }: { event: Event; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50, rotateX: -15 }}
        animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50, rotateX: 15 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl bg-card shadow-2xl shadow-primary/10"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-4 top-4 z-10 rounded-full bg-background/80 p-2 text-foreground transition-colors hover:bg-background"
        >
          <X className="h-5 w-5" />
        </motion.button>
        
        <div className="relative h-64 overflow-hidden">
          <motion.img
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          <motion.span 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-4 left-4 rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground capitalize"
          >
            {event.type}
          </motion.span>
        </div>
        
        <div className="p-6">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold"
          >
            {event.title}
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-muted-foreground leading-relaxed"
          >
            {event.description}
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 grid gap-3 sm:grid-cols-2"
          >
            <div className="flex items-center gap-3 text-sm text-muted-foreground group">
              <Calendar className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              <span>{event.displayDate || new Date(event.date).toDateString()}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground group">
              <Clock className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground group">
              <MapPin className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground group">
              <Users className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              <span>{event.attendees} attendees expected</span>
            </div>
          </motion.div>
          
          {event.highlights && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6"
            >
              <h3 className="font-semibold">Highlights</h3>
              <ul className="mt-3 space-y-2">
                {event.highlights.map((highlight, index) => (
                  <motion.li 
                    key={highlight} 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <motion.span 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: index * 0.2 }}
                      className="h-1.5 w-1.5 rounded-full bg-primary" 
                    />
                    {highlight}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
          
          {isEventUpcoming(event.date) && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <h3 className="mb-3 font-semibold">Countdown</h3>
              <CountdownTimer targetDate={event.date} />
            </motion.div>
          )}
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex gap-3 items-center"
          >
            {isEventUpcoming(event.date) ? (
<button
  onClick={(e) => {
    e.stopPropagation(); // ✅ VERY IMPORTANT
    if (event.registrationLink) {
      window.open(event.registrationLink, "_blank", "noopener,noreferrer");
    } else {
      alert("Registration link not available");
    }
  }}
  className="flex-1 bg-primary text-white px-6 py-2 rounded-lg text-center hover:opacity-90 transition relative z-50"
>
  Register Now →
</button>
            ) : (
              <Button variant="outline" className="flex-1">
                View Gallery
              </Button>
            )}
<Button
  variant="outline"
  onClick={(e) => {
    e.stopPropagation()
    handleShare(event)
  }}
>
  Share 📤
</Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<EventType>("all")
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  useSmoothScroll()

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = activeFilter === "all" || event.type === activeFilter
    return matchesSearch && matchesFilter
  })

const upcomingEvents = filteredEvents.filter((e) =>
  isEventUpcoming(e.date)
)

const pastEvents = filteredEvents.filter((e) =>
  !isEventUpcoming(e.date)
)

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20">
        <AnimatedBackground />
        <MouseTrackingOrb className="right-1/4 top-1/3 opacity-30" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary ring-1 ring-primary/20"
            >
              <Sparkles className="h-4 w-4" />
              Events
            </motion.span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl overflow-hidden">
              <span className="block">
                <TextReveal delay={0.3}>Discover & Experience</TextReveal>
              </span>
              <span className="block">
                <TextReveal delay={0.8}>Amazing Events</TextReveal>
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-6 text-lg text-muted-foreground text-pretty"
            >
              Explore IEEE SMC GNITC’s workshops, hackathons, and technical sessions designed to enhance your skills, innovation, and real-world problem-solving abilities.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <SectionWrapper className="py-8">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          >
            <div className="relative flex-1 max-w-md group">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <Input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option, index) => (
                <motion.div
                  key={option.value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
<button
  onClick={() => setActiveFilter(option.value)}
  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
    activeFilter === option.value
      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
  }`}
>
  {option.label}
</button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <SectionWrapper className="pt-0">
          <div className="mx-auto max-w-7xl px-6">
            <ScrollReveal effect="fadeUp">
              <SectionHeader
                title="Upcoming Events"
                subtitle="Don't miss these exciting opportunities"
                centered={true}
              />
            </ScrollReveal>
            
            <StaggerReveal staggerAmount={0.15} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <TiltCard key={event.id} tiltAmount={8}>
                  <div
                    onClick={() => setSelectedEvent(event)}
                    className="group cursor-pointer overflow-hidden rounded-2xl bg-card transition-all hover:shadow-xl hover:shadow-primary/10"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={event.image}
                        alt={event.title}
                        className="h-full w-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        crossOrigin="anonymous"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                      <motion.span 
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground capitalize backdrop-blur-sm"
                      >
                        {event.type}
                      </motion.span>
                      
                      {/* Hover overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-primary/20 flex items-center justify-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          className="rounded-full bg-primary p-4"
                        >
                          <ArrowRight className="h-6 w-6 text-primary-foreground" />
                        </motion.div>
                      </motion.div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold transition-colors group-hover:text-primary">
                        {event.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {event.description}
                      </p>
                      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{event.displayDate || new Date(event.date).toDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </StaggerReveal>
          </div>
        </SectionWrapper>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <SectionWrapper className="bg-card/30">
          <div className="mx-auto max-w-7xl px-6">
            <ScrollReveal effect="fadeUp">
              <SectionHeader
                title="Past Events"
                subtitle="Explore highlights from our previous events"
                centered={true}
              />
            </ScrollReveal>
            
            <StaggerReveal staggerAmount={0.1} className="grid gap-6 md:grid-cols-2">
              {pastEvents.map((event) => (
                <TiltCard key={event.id} tiltAmount={5}>
                  <div
                    onClick={() => setSelectedEvent(event)}
                    className="group flex cursor-pointer gap-4 rounded-xl bg-card p-4 transition-all hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                      <motion.img
                        src={event.image}
                        alt={event.title}
                        className="h-full w-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        crossOrigin="anonymous"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-xs font-medium text-primary capitalize">{event.type}</span>
                      <h3 className="font-semibold transition-colors group-hover:text-primary">
                        {event.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{event.date}</span>
                        <span>-</span>
                        <span><Counter end={event.attendees} duration={1.5} /> attended</span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </StaggerReveal>
          </div>
        </SectionWrapper>
      )}

      {/* No Results */}
      {filteredEvents.length === 0 && (
        <SectionWrapper>
          <div className="mx-auto max-w-md px-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
            >
              <Filter className="mx-auto h-12 w-12 text-muted-foreground" />
            </motion.div>
            <h3 className="mt-4 text-lg font-semibold">No events found</h3>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your search or filter to find what you&apos;re looking for.
            </p>
            <MagneticButton>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setActiveFilter("all")
                }}
              >
                Clear filters
              </Button>
            </MagneticButton>
          </div>
        </SectionWrapper>
      )}

      {/* Event Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
