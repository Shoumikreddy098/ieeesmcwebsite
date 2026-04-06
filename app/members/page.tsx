"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Linkedin, Github, Twitter, Mail, ChevronDown, Sparkles } from "lucide-react"
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper"
import { AnimatedBackground } from "@/components/animated-background"
import { TextReveal, StaggerReveal, useSmoothScroll } from "@/components/gsap-animations"
import { TiltCard, ScrollReveal, MagneticButton, MouseTrackingOrb, FloatingElement } from "@/components/interactive-elements"
import { Button } from "@/components/ui/button"

type MemberCategory = "all" | "core" | "leads" | "volunteers"
type TeamYear = "current" | "2025" | "2024" | "2023"

interface Member {
  id: string
  name: string
  role: string
  category: MemberCategory
  image: string

  branch?: string
  yearOfStudy?: string
  ieeeId?: string
  contact?: string
  email?: string

  social: {
    linkedin?: string
    github?: string
    twitter?: string
    email?: string
  }
  year: TeamYear
}

const members: Member[] = [
  // Current Team - Core
 {
    id: "101",
    name: "Dhulipala Shanmukha Rajya Praneeth",
    role: "Chair",
    category: "core",
    image: "/praneeth.jpeg",
    branch: "CSE-CyberSecurity",
    yearOfStudy: "2nd Year",
    ieeeId: "102279325",
    contact: "+91 94411 41382",
    email: "praneeth.dhulipala24@gmail.com",
    social: { linkedin: "https://www.linkedin.com/in/praneeth-dhulipala-1206343b7/", github: "https://github.com/PraneethDhulipala24"},
    year: "current",
  },
    {
    id: "9",
    name: "Kashish Manglani",
    role: "Vice-Chair",
    category: "core",
    image: "/kashish.jfif",
    branch: "CSE-DataScience",
    yearOfStudy: "2nd Year",
    ieeeId: "102252548",
    contact: "+91 90301 34997",
    email: "24WJ1A6753@gniindia.org",
    social: { linkedin: "https://www.linkedin.com/in/kashish-manglani-597673312/", github: ""},
    year: "current",
  },
      {
    id: "15",
    name: "Vignyathri",
    role: "Secretary",
    category: "core",
    image: "/vig.png",
    branch: "CSE-CyberSecurity",
    yearOfStudy: "2nd Year",
    ieeeId: "102282395",
    contact: "+91 90590 82755",
    email: "ksaivignyathri2424@gmail.com",
    social: { linkedin: "", github: ""},
    year: "current",
  },
  {
    id: "6",
    name: "Naveen",
    role: "Treasurer",
    category: "core",
    image: "/naveen.jpg",
    branch: "CSE-CyberSecurity",
    yearOfStudy: "2nd Year",
    ieeeId: "IEEE123456",
    contact: "+91 81797 12244",
    email: "naveen.kumarmetla5@gmail.com",
    social: { linkedin: "https://www.linkedin.com/in/naveen-kumar-571894335/", github: ""},
    year: "current",
  },
  {
    id: "13",
    name: "Sathvik Ravi",
    role: "Webmaster",
    category: "core",
    image: "/satvik.jfif",
    branch: "CSE-CyberSecurity",
    yearOfStudy: "2nd Year",
    ieeeId: "102257443",
    contact: "+91 97040 58633",
    email: "sathvikraavi07@gmail.com",
    social: { linkedin: "https://www.linkedin.com/in/sathvik-ravi-0943502b4/", github: ""},
    year: "current",
  },
  // Current Team - Leads
    {
    id: "10",
    name: "Nihal Cilamkoti",
    role: "Organizing Lead",
    category: "leads",
    image: "/nihal.jfif",
    branch: "CSE-DataScience",
    yearOfStudy: "2nd Year",
    ieeeId: "IEEE123456",
    contact: "+91 95505 45371",
    email: "24wj1a6724@gniindia.org",
    social: { linkedin: "https://www.linkedin.com/in/nihalcilamkoti345965306/", github: "https://github.com/NihalCilamkoti"},
    year: "current",
  },
  {
    id: "8",
    name: "MARADANA HIMATEJ ",
    role: "Volunteer Lead",
    category: "leads",
    image: "/himatej.png",
    branch: "CSE-CyberSecurity",
    yearOfStudy: "2nd Year",
    ieeeId: "IEEE123456",
    contact: "+91 77298 36382",
    email: "maradanahimatej1410@gmail.com",
    social: { linkedin: "https://www.linkedin.com/in/maradana-himatej-20547533a/", github: ""},
    year: "current",
  },
  {
    id: "14",
    name: "Purre Tanisha Valarie",
    role: "PR & Documentation Lead",
    category: "leads",
    image: "/tanisha.jpeg",
    branch: "CSE-CyberSecurity",
    yearOfStudy: "2nd Year",
    ieeeId: "102273291",
    contact: "+91 99599 94994",
    email: "valarietanisha21@gmail.com",
    social: { linkedin: "", github: ""},
    year: "current",
  },
  {
    id: "16",
    name: "D Gideon Raj",
    role: "Technical & Marketing Lead",
    category: "leads",
    image: "/gedion.jfif",
    branch: "CSE-DataScience",
    yearOfStudy: "2nd Year",
    ieeeId: "101514128",
    contact: "+91 96181 96756",
    email: "24WJ1A6725@gniindia.org",
    social: { linkedin: "", github: ""},
    year: "current",
  },
  // Current Team - Volunteers

  // Previous Year 2025 Team
    {
    id: "1",
    name: "Syed Manzoor",
    role: "Chair",
    category: "core",
    image: "/manzoor.jfif",
    branch: "CSE-CyberSecurity",
    yearOfStudy: "3rd Year",
    ieeeId: "100230798",
    contact: "+91 73307 36379",
    email: "23WJ1A6285@gniindia.org",
    social: { linkedin: "https://www.linkedin.com/in/syed-manzoor-2a8882315/", github: "https://github.com/syed-manzoor/"},
    year: "2025"
  },
  {
    id: "2",
    name: "Shoumik Reddy",
    role: "Vice-Chair",
    category: "core",
    image: "/shoumik.jpeg",
    branch: "CSE-CyberSecurity",
    yearOfStudy: "3rd Year",
    ieeeId: "100244428",
    contact: "+91 70139 18658",
    email: "Shoumikreddy098@gmail.com",
    social: { linkedin: "https://www.linkedin.com/in/shoumikreddy/", github: ""},
    year: "2025",
  },
  {
    id: "3",
    name: "Jayant Sharma",
    role: "Secretary",
    category: "core",
    image: "/jayant.jpeg",
    branch: "CSE-DataScience",
    yearOfStudy: "3rd Year",
    ieeeId: "100319637",
    contact: "+91 93901 26173",
    email: "23WJ1A6731@gniindia.org",
    social: { linkedin: "https://www.linkedin.com/in/jayant-sharma-887b58293/", github: "https://github.com/Jayant2901"},
    year: "2025",
  },
  {
    id: "4",
    name: "Mohammed Sameer",
    role: "Treasurer",
    category: "core",
    image: "/sameer.jfif",
    branch: "CSE-CyberSecurity",
    yearOfStudy: "3rd Year",
    ieeeId: "100617875",
    contact: "+91 63041 68708",
    email: "23WJ1A6255@gniindia.org",
    social: { linkedin: "https://www.linkedin.com/in/mohammed-sameer-550972301/", github: ""},
    year: "2025",
  },
  {
    id: "5",
    name: "Arnav Adurthi",
    role: "Webmaster",
    category: "core",
    image: "/arnav.jfif",
    branch: "CSE-DataScience",
    yearOfStudy: "3rd Year",
    ieeeId: "100606378",
    contact: "+91 90522 22985",
    email: "23WJ1A6705@gniindia.org",
    social: { linkedin: "https://www.linkedin.com/in/arnav-adurthi-93b594302/", github: ""},
    year: "2025",
  },
  {
    id: "66",
    name: "Naveen",
    role: "Organizing Lead",
    category: "leads",
    image: "/naveen.jpg",
    branch: "CSE-CyberSecurity",
    yearOfStudy: "2nd Year",
    ieeeId: "IEEE123456",
    contact: "+91 81797 12244",
    email: "naveen.kumarmetla5@gmail.com",
    social: { linkedin: "https://www.linkedin.com/in/naveen-kumar-571894335/", github: ""},
    year: "2025",
  },
  {
    id: "88",
    name: "MARADANA HIMATEJ ",
    role: "Membership Recruitment Head",
    category: "leads",
    image: "/himatej.png",
    branch: "CSE-CyberSecurity",
    yearOfStudy: "2nd Year",
    ieeeId: "IEEE123456",
    contact: "+91 77298 36382",
    email: "maradanahimatej1410@gmail.com",
    social: { linkedin: "https://www.linkedin.com/in/maradana-himatej-20547533a/", github: ""},
    year: "2025",
  },
  {
    id: "99",
    name: "Kashish Manglani",
    role: "Social Media Lead",
    category: "leads",
    image: "/kashish.jfif",
    branch: "CSE-DataScience",
    yearOfStudy: "2nd Year",
    ieeeId: "102252548",
    contact: "+91 90301 34997",
    email: "24WJ1A6753@gniindia.org",
    social: { linkedin: "https://www.linkedin.com/in/kashish-manglani-597673312/", github: ""},
    year: "2025",
  },
  {
    id: "100",
    name: "Nihal Cilamkoti",
    role: "Marketing Lead",
    category: "leads",
    image: "/nihal.jfif",
    branch: "CSE-DataScience",
    yearOfStudy: "2nd Year",
    ieeeId: "IEEE123456",
    contact: "+91 95505 45371",
    email: "24wj1a6724@gniindia.org",
    social: { linkedin: "https://www.linkedin.com/in/nihalcilamkoti345965306/", github: "https://github.com/NihalCilamkoti"},
    year: "2025",
  },
  {
    id: "111",
    name: "Dhulipala Shanmukha Rajya Praneeth",
    role: "Logistics & Operation lead",
    category: "leads",
    image: "/praneeth.jpeg",
    branch: "CSE-CyberSecurity",
    yearOfStudy: "2nd Year",
    ieeeId: "102279325",
    contact: "+91 94411 41382",
    email: "praneeth.sep21@gmail.com",
    social: { linkedin: "https://www.linkedin.com/in/praneeth-dhulipala-1206343b7/", github: "https://github.com/PraneethDhulipala24"},
    year: "2025",
  },
  {
    id: "122",
    name: "Ruthwik Kumar Mulpur",
    role: "Designing Lead",
    category: "leads",
    image: "/ruthwik.jfif",
    branch: "CSE-DataScience",
    yearOfStudy: "2nd Year",
    ieeeId: "102257573",
    contact: "+91 98660 01914",
    email: "24wj1a6777@gniindia.org",
    social: { linkedin: "https://www.linkedin.com/in/mulpur-ruthwik-kumar-a5b940325/", github: ""},
    year: "2025",
  },
    {
    id: "133",
    name: "Sathvik Ravi",
    role: "Technical Lead",
    category: "leads",
    image: "/satvik.jfif",
    branch: "CSE-CyberSecurity",
    yearOfStudy: "2nd Year",
    ieeeId: "102257443",
    contact: "+91 97040 58633",
    email: "sathvikraavi07@gmail.com",
    social: { linkedin: "https://www.linkedin.com/in/sathvik-ravi-0943502b4/", github: ""},
    year: "2025",
  },
    {
    id: "144",
    name: "Purre Tanisha Valarie",
    role: "PR Head",
    category: "leads",
    image: "/tanisha.jpeg",
    branch: "CSE-CyberSecurity",
    yearOfStudy: "2nd Year",
    ieeeId: "102273291",
    contact: "+91 99599 94994",
    email: "valarietanisha21@gmail.com",
    social: { linkedin: "", github: ""},
    year: "2025",
  },
    {
    id: "155",
    name: "Vignyathri",
    role: "Documentation Lead",
    category: "leads",
    image: "/vig.png",
    branch: "CSE-CyberSecurity",
    yearOfStudy: "2nd Year",
    ieeeId: "102282395",
    contact: "+91 90590 82755",
    email: "ksaivignyathri2424@gmail.com",
    social: { linkedin: "", github: ""},
    year: "2025",
  },
  {
    id: "166",
    name: "D Gideon Raj",
    role: "Volunteer Lead",
    category: "leads",
    image: "/gedion.jfif",
    branch: "CSE-DataScience",
    yearOfStudy: "2nd Year",
    ieeeId: "101514128",
    contact: "+91 96181 96756",
    email: "24WJ1A6725@gniindia.org",
    social: { linkedin: "", github: ""},
    year: "2025",
  },

  {
    id: "101",
    name: "Syed Manzoor",
    role: "Chair",
    category: "core",
    image: "/manzoor.jfif",
    branch: "CSE-CyberSecurity",
    yearOfStudy: "3rd Year",
    ieeeId: "100230798",
    contact: "+91 73307 36379",
    email: "23WJ1A6285@gniindia.org",
    social: { linkedin: "https://www.linkedin.com/in/syed-manzoor-2a8882315/", github: "https://github.com/syed-manzoor/"},
    year: "2024"
  },
  {
    id: "202",
    name: "Shoumik Reddy",
    role: "Vice-Chair",
    category: "core",
    image: "/shoumik.jpeg",
    branch: "CSE-CyberSecurity",
    yearOfStudy: "3rd Year",
    ieeeId: "100244428",
    contact: "+91 70139 18658",
    email: "Shoumikreddy098@gmail.com",
    social: { linkedin: "https://www.linkedin.com/in/shoumikreddy/", github: ""},
    year: "2024",
  },
  {
    id: "303",
    name: "Jayant Sharma",
    role: "Secretary",
    category: "core",
    image: "/jayant.jpeg",
    branch: "CSE-DataScience",
    yearOfStudy: "3rd Year",
    ieeeId: "100319637",
    contact: "+91 93901 26173",
    email: "23WJ1A6731@gniindia.org",
    social: { linkedin: "https://www.linkedin.com/in/jayant-sharma-887b58293/", github: "https://github.com/Jayant2901"},
    year: "2024",
  },
  {
    id: "404",
    name: "Mohammed Sameer",
    role: "Treasurer",
    category: "core",
    image: "/sameer.jfif",
    branch: "CSE-CyberSecurity",
    yearOfStudy: "3rd Year",
    ieeeId: "100617875",
    contact: "+91 63041 68708",
    email: "23WJ1A6255@gniindia.org",
    social: { linkedin: "https://www.linkedin.com/in/mohammed-sameer-550972301/", github: ""},
    year: "2024",
  },
  {
    id: "505",
    name: "Arnav Adurthi",
    role: "Webmaster",
    category: "core",
    image: "/arnav.jfif",
    branch: "CSE-DataScience",
    yearOfStudy: "3rd Year",
    ieeeId: "100606378",
    contact: "+91 90522 22985",
    email: "23WJ1A6705@gniindia.org",
    social: { linkedin: "https://www.linkedin.com/in/arnav-adurthi-93b594302/", github: ""},
    year: "2024",
  },
]

const categoryOptions: { value: MemberCategory; label: string }[] = [
  { value: "all", label: "All Members" },
  { value: "core", label: "Core Team" },
  { value: "leads", label: "Team Leads" },
  { value: "volunteers", label: "Volunteers" },
]

const yearOptions: { value: TeamYear; label: string }[] = [
  { value: "current", label: "Current Team (2026)" },
  { value: "2025", label: "Team 2025" },
  { value: "2024", label: "Team 2024" },
  { value: "2023", label: "Team 2023" },
]

// Flipping member card component
function MemberCard({ member, index }: { member: Member; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateY: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="perspective-1000"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="relative h-[400px] w-full cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        onClick={() => setIsFlipped(!isFlipped)}
        whileHover={{ scale: 1.03 }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl bg-card"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="relative h-full overflow-hidden">
            <motion.img
              src={member.image}
              alt={member.name}
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
              crossOrigin="anonymous"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />

            {/* Animated overlay on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-primary/10"
            />

            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
<p className="text-sm font-medium text-primary">{member.role}</p>
<p className="text-xs font-medium text-muted-foreground mt-1">
  {member.branch} • {member.yearOfStudy}
</p>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="mt-3 flex gap-2"
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {member.social.linkedin && (
                  <motion.a
                    href={member.social.linkedin}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </motion.a>
                )}
                {member.social.github && (
                  <motion.a
                    href={member.social.github}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label="GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </motion.a>
                )}
                {member.social.twitter && (
                  <motion.a
                    href={member.social.twitter}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </motion.a>
                )}
                {member.social.email && (
                  <motion.a
                    href={`mailto:${member.social.email}`}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label="Email"
                  >
                    <Mail className="h-4 w-4" />
                  </motion.a>
                )}
              </motion.div>

              {/* Click to flip hint */}
              <motion.p
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="mt-2 text-xs text-muted-foreground"
              >
                Click to see bio
              </motion.p>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary/90 to-accent/90 p-6 text-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <FloatingElement duration={3} distance={10}>
            <div className="mb-4 h-20 w-20 overflow-hidden rounded-full border-4 border-primary-foreground/20">
              <img
                src={member.image}
                alt={member.name}
                className="h-full w-full object-cover"
                crossOrigin="anonymous"
              />
            </div>
          </FloatingElement>
          <h3 className="text-xl font-bold text-primary-foreground">{member.name}</h3>
          <p className="text-sm text-primary-foreground/80">{member.role}</p>
          

<div className="mt-4 text-xs text-primary-foreground/80 space-y-1">
  {member.branch && <p>Branch: {member.branch}</p>}
  {member.yearOfStudy && <p>Year: {member.yearOfStudy}</p>}
  {member.ieeeId && <p>IEEE Membership ID: {member.ieeeId}</p>}
  {member.contact && <p>Contact: {member.contact}</p>}
  {member.email && <p>Email: {member.email}</p>}
</div>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-4 text-xs text-primary-foreground/60"
          >
            Click to flip back
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function MembersPage() {
  const [activeCategory, setActiveCategory] = useState<MemberCategory>("all")
  const [activeYear, setActiveYear] = useState<TeamYear>("current")

  useSmoothScroll()

  const filteredMembers = members.filter((member) => {
    const matchesCategory = activeCategory === "all" || member.category === activeCategory
    const matchesYear = member.year === activeYear
    return matchesCategory && matchesYear
  })

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20">
        <AnimatedBackground />
        <MouseTrackingOrb className="left-1/3 top-1/3 opacity-30" />

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
              Our Team
            </motion.span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl overflow-hidden">
              <span className="block">Meet the Innovators</span>
              <span className="block">
                <TextReveal delay={0.5}>Behind IEEE SMC GNITC</TextReveal>
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-6 text-lg text-muted-foreground text-pretty"
            >
              A passionate community of students dedicated to innovation, collaboration, and technological excellence. Together, we design, build, and lead impactful initiatives in AI, Cybersecurity, Robotics, and Intelligent Systems.
            </motion.p>
          </motion.div>
        </div>

        {/* Floating decorative elements */}
        <FloatingElement className="absolute left-16 top-32" duration={4} distance={25}>
          <div className="h-4 w-4 rounded-full bg-primary/20" />
        </FloatingElement>
        <FloatingElement className="absolute right-24 top-48" duration={5} distance={20} delay={1}>
          <div className="h-3 w-3 rounded-full bg-accent/30" />
        </FloatingElement>
      </section>

      {/* Filters */}
      <SectionWrapper className="py-8">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
          >
            {/* Year Selector */}
            <div className="relative group">
              <select
                value={activeYear}
                onChange={(e) => setActiveYear(e.target.value as TeamYear)}
                className="appearance-none rounded-lg bg-secondary px-4 py-3 pr-10 text-sm font-medium text-secondary-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all cursor-pointer"
              >
                {yearOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none transition-transform group-hover:translate-y-[-45%]" />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((option, index) => (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(option.value)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${activeCategory === option.value
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Members Grid */}
      <SectionWrapper className="pt-0">
        <div className="mx-auto max-w-7xl px-6">
          {filteredMembers.length > 0 ? (
            <motion.div
              layout
              className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredMembers.map((member, index) => (
                  <MemberCard key={member.id} member={member} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">No members found for this selection.</p>
            </motion.div>
          )}
        </div>
      </SectionWrapper>

      {/* Join CTA */}
      <SectionWrapper className="bg-card/30">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <ScrollReveal effect="scale">
            <TiltCard tiltAmount={5}>
              <div className="glass-card rounded-3xl p-12 relative overflow-hidden">
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

                <div className="relative">
                  <h2 className="text-3xl font-bold text-balance">Ready to Start Your Journey?</h2>
                  <p className="mt-4 text-muted-foreground text-pretty">
                    Join IEEE SMC GNITC and be part of a community that builds, innovates, and leads. Your journey into technology, research, and innovation starts here.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 inline-block"
                  >
                    <MagneticButton>
                      <Button asChild className="glow-sm">
                        <a href="/contact">Become a Member</a>
                      </Button>
                    </MagneticButton>
                  </motion.div>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        </div>
      </SectionWrapper>
    </>
  )
}
