"use client"

import { motion } from "framer-motion"
import { Mail, Award, BookOpen, Building2 } from "lucide-react"
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper"
import { AnimatedBackground } from "@/components/animated-background"

interface Dignitary {
  id: string
  name: string
  designation: string
  department: string
  image: string
  bio: string
  achievements?: string[]
  email?: string
}

const dignitaries: Dignitary[] = [
  {
    id: "1",
    name: "SARDAR TAVINDER SINGH KOHLI",
    designation: "Chairman of Guru Nanak Institutions",
    department: "Management",
    image: "/chairrman.png",
    bio: "Visionary educationist and institutional leader.",
    achievements: ["Founder Chairman of Guru Nanak Institutions",
  "Over 3 decades of leadership in education and institutional development",
  "Instrumental in building world-class infrastructure and academic ecosystems"],
  },
  {
    id: "2",
    name: "Sardar Gagandeep Singh Kohli",
    designation: "Vice Chairman of GNI",
    department: "Management",
    image: "/vc.png",
    bio: "Key leader and backbone of the organization.",
    achievements: ["Vice Chairman of Guru Nanak Institutions",
  "Plays a vital role in institutional growth",
  "Supports strategic and operational development"],
  },
  {
    id: "3",
    name: "Dr. H S Saini",
    designation: "Honorary Managing Director, GNI",
    department: "Management",
    image: "/md.png",
    bio: "Member of Governing Council and management leader.",
    achievements: ["Honorary Managing Director, GNI Management Board",
  "Member of Governing Council",
  "Contributes to institutional planning and governance"],
  },
  {
    id: "4",
    name: "Dr. S. Sreenatha Reddy",
    designation: "Director of GNITC",
    department: "Administration",
    image: "/directoritc.png",
    bio: "Visionary academic leader with 29+ years of experience, driving innovation and excellence at GNI.",
    achievements: ["29+ years of experience in academia, research, and industry",
    "Published 150+ research papers & multiple patents",
    "Recipient of Dr. APJ Abdul Kalam Award for Educational Excellence"],
  },
  {
    id: "5",
    name: "Prof. P. Parthasaradhy",
    designation: "Joint Director",
    department: "Administration",
    image: "/jd.png",
    bio: "Academic leader with 42+ years of experience across industry, consultancy, and education, driving excellence at GNI.",
    achievements: ["42+ years of experience in industry, consultancy, and academia",
    "Former professional at Hindustan Cables Limited with international exposure",
    "Led EEE Department as Professor & Head at GNITC"],
  },
  {
    id: "7",
    name: "Dr. B Venkata Ramana Reddy",
    designation: "Principal of GNIT",
    department: "Administration",
    image: "/principalgnit.png",
    bio: "Professor of CSE and Principal of GNIT.",
    achievements: ["Principal of Guru Nanak Institute of Technology",
  "Professor in Computer Science & Engineering",
  "Leads academic and institutional development"],
  },
  {
    id: "6",
    name: "Dr. Rishi Sayal",
    designation: "Associate Director | IEEE Branch Counsellor, GNITC",
    department: "Administration",
    image: "/ad.png",
    bio: "Academic leader with 34+ years of experience in research, teaching, and data mining.",
    achievements: ["Ph.D. in CSE (Data Mining) with 60+ research publications",
    "Recipient of ₹50+ lakhs in research grants from AICTE & UGC",
    "Holds 2 patents and editor of Springer indexed publications"],
  },
  {
    id: "8",
    name: "Dr. B. Santhosh Kumar",
    designation: "Dean R&D & HOD CSE | IEEE Branch Counsellor, GNIT",
    department: "Computer Science and Engineering",
    image: "/bcgnit.png",
    bio: "Research-focused academic and Head of CSE.",
    achievements: ["Dean R&D and HOD of CSE at GNIT",
  "150+ research publications and multiple patents",
  "Recipient of multiple national and international research awards"],
  },
  {
    id: "9",
    name: "Dr. Geeta Tripathi",
    designation: "Professor & HOD CSE | IEEE BRANCH COORDINATOR, GNITC",
    department: "Computer Science and Engineering",
    image: "/geetha.png",
    bio: "Experienced academic and Head of CSE.",
    achievements: [  "PhD in CSE from RTM Nagpur University",
  "25+ years teaching experience (UG & PG)",
  "3 patents, 9 copyrights, multiple publications"],
  },
  {
    id: "10",
    name: "Dr. Ch. Subba Lakshmi",
    designation: "Professor & HOD (CS & DS) | IEEE SMC Advisor, GNITC",
    department: "CSE (Cyber Security & Data Science)",
    image: "/smcadvisor.png",
    bio: "Professor and Head with expertise in Data Science.",
    achievements: [ "PhD in CSE (Data Mining & Soft Computing) from KL University",
  "21+ years of teaching and research experience",
  "Published 20+ research papers and multiple patents"],
  },
]

function DignitaryCard({ dignitary, index }: { dignitary: Dignitary; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <motion.div
        whileHover={{ y: -10 }}
        className="relative overflow-hidden rounded-2xl bg-card transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10"
      >
        {/* Image Section */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={dignitary.image}
            alt={dignitary.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
          
          {/* Hover overlay with achievements */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-primary/90 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <div className="text-center text-primary-foreground">
              <Award className="mx-auto h-8 w-8 mb-3" />
              <p className="text-sm font-medium mb-2">Achievements</p>
              {dignitary.achievements && (
                <ul className="space-y-1">
                  {dignitary.achievements.slice(0, 3).map((achievement) => (
                    <li key={achievement} className="text-xs opacity-90">
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {dignitary.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-primary">{dignitary.designation}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4" />
            <span>{dignitary.department}</span>
          </div>

          <p className="mt-4 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {dignitary.bio}
          </p>

          {dignitary.email && (
            <motion.a
              href={`mailto:${dignitary.email}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </motion.a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function DignitariesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20">
        <AnimatedBackground />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary ring-1 ring-primary/20">
              College Dignitaries
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
              Our <span className="gradient-text">Distinguished Leaders</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground text-pretty">
              Meet the esteemed leaders and mentors of Guru Nanak Institutions who guide, support, and inspire the IEEE SMC GNITC community in achieving excellence in innovation, research, and technical development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dignitaries Grid */}
      <SectionWrapper>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {dignitaries.map((dignitary, index) => (
              <DignitaryCard key={dignitary.id} dignitary={dignitary} index={index} />
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Message Section */}
      <SectionWrapper className="bg-card/30">
        <div className="mx-auto max-w-4xl px-6">
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="h-32 w-32 overflow-hidden rounded-2xl">
                  <img
                    src="/directoritc.png"
                    alt="Dr. S. Sreenatha Reddy"
                    className="h-full w-full object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 rounded-full bg-primary p-2">
                  <BookOpen className="h-4 w-4 text-primary-foreground" />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-1 text-center md:text-left"
              >
                <blockquote className="text-lg italic text-foreground leading-relaxed">
                  &ldquo;IEEE SMC GNI represents the best of our student community - their passion for innovation,
                  dedication to learning, and commitment to making a difference. I am proud to support
                  their journey and watch them grow into the leaders of tomorrow.&rdquo;
                </blockquote>
                <div className="mt-4">
                  <p className="font-semibold text-foreground">Dr. S. Sreenatha Reddy</p>
                  <p className="text-sm text-muted-foreground">Director of GNITC</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
