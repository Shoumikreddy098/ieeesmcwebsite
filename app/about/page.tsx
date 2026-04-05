"use client"

import { motion } from "framer-motion"
import { Target, Eye, Heart, Award, Users, Sparkles } from "lucide-react"
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper"
import { AnimatedBackground } from "@/components/animated-background"
import Image from "next/image"
import {
  TextReveal,
  WordReveal,
  StaggerReveal,
  ClipReveal,
  ParallaxSection,
  useSmoothScroll
} from "@/components/gsap-animations"
import {
  TiltCard,
  ScrollReveal,
  FloatingElement,
  MouseTrackingOrb
} from "@/components/interactive-elements"

const timeline = [
  {
    year: "February 2025",
    title: "TechX: The Coding Battle",
    description: "A flagship coding competition designed to challenge participants through multiple rounds of problem-solving, algorithmic thinking, and real-world scenarios. The event fostered technical excellence, competitive spirit, and innovation among students across various domains.",
  },
  {
    year: "April 2025",
    title: "CyberCrack 1.0",
    description: "A 3-day hands-on cybersecurity bootcamp focused on ethical hacking and Capture The Flag (CTF) challenges. Participants gained practical experience with industry tools such as Wireshark, Nmap, and Kali Linux while developing foundational cybersecurity skills.",
  },
  {
    year: "August 2025",
    title: "AI Tools & Applications Webinar",
    description: "An expert-led session exploring modern AI tools and their real-world applications in automation, business processes, and IT systems. The event provided valuable insights into how AI is transforming industries.",
  },
  {
    year: "September 2025",
    title: "CyberCrack 2.0",
    description: "An advanced cybersecurity bootcamp featuring live hacking demonstrations, tool-based training, and competitive CTF challenges. The event enhanced participants’ practical skills in offensive security and real-world cyber operations.",
  },
  {
    year: "January 2026",
    title: "TechX 2.0 Innovation Challenge",
    description: "TECHX 2.0 is a multi-domain innovation challenge by IEEE SMC GNITC, featuring coding, AI, and ideation tracks designed to test problem-solving skills, creativity, and real-world thinking.",
  },
  {
    year: "March 2026",
    title: "TECH HORIZON 1.0",
    description: "A national-level hackathon bringing together participants from multiple institutions to solve real-world challenges across domains such as healthcare, security, and e-commerce through innovation and collaboration.",
  },
  {
    year: "March. 2026",
    title: "Cyber-Safe Bootcamp",
    description: "A large-scale cybersecurity awareness and career-oriented event featuring industry experts, interactive sessions, and hands-on learning, with over 300 participants gaining insights into cyber defense and digital security.",
  },
]

const values = [
  {
    icon: Target,
    title: "Innovation",
    description: "Encouraging creative thinking and development of impactful technological solutions.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Promoting teamwork and interdisciplinary learning to solve complex problems.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Heart,
    title: "Excellence",
    description: "Striving for high standards in technical skills, research, and execution.",
    gradient: "from-red-500 to-orange-500",
  },
  {
    icon: Award,
    title: "Leadership",
    description: "Developing future leaders through responsibility, initiative, and innovation.",
    gradient: "from-amber-500 to-yellow-500",
  },
]

const galleryImages = [
  { src: "/1.png", alt: "Team collaboration" },
  { src: "/3.png", alt: "Workshop session" },
  { src: "/4.png", alt: "Tech presentation" },
  { src: "/5.png", alt: "Hackathon" },
  { src: "/6.png", alt: "Conference" },
  { src: "/7.png", alt: "Team meeting" },
]

export default function AboutPage() {
  useSmoothScroll()

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <AnimatedBackground />
        <MouseTrackingOrb className="left-1/4 top-1/3 opacity-30" />

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
              className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary ring-1 ring-primary/20"
            >
              About Us
            </motion.span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl overflow-hidden">
              <span className="block">
                <TextReveal delay={0.3}>Empowering Innovation in</TextReveal>
              </span>
              <span className="block">
                <TextReveal delay={0.6}>Intelligent Systems</TextReveal>
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-6 text-lg text-muted-foreground text-pretty"
            >
              IEEE SMC GNITC is a dynamic student-led community dedicated to advancing knowledge in Artificial Intelligence, Cybernetics, and Intelligent Systems. We empower students to innovate, collaborate, and solve real-world challenges through technology and research.
            </motion.p>
          </motion.div>
        </div>

        {/* Floating decorative elements */}
        <FloatingElement className="absolute left-20 top-40" duration={4} distance={30}>
          <div className="h-3 w-3 rounded-full bg-primary/30" />
        </FloatingElement>
        <FloatingElement className="absolute right-32 top-60" duration={5} distance={25} delay={1}>
          <div className="h-2 w-2 rounded-full bg-accent/40" />
        </FloatingElement>
        <FloatingElement className="absolute left-1/3 bottom-32" duration={3.5} distance={20} delay={0.5}>
          <div className="h-4 w-4 rounded-full bg-primary/20" />
        </FloatingElement>
      </section>

      {/* Mission & Vision */}
      <SectionWrapper className="bg-card/30 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <StaggerReveal staggerAmount={0.2} className="grid gap-8 md:grid-cols-2">
            <TiltCard tiltAmount={8}>
              <div className="glass-card rounded-2xl p-8 h-full relative overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="relative space-y-8">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary"
                  >
                    <Eye className="h-6 w-6" />
                  </motion.div>
                  <h2 className="text-2xl font-bold">Our Vision</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    To be a leading student-driven technical community that fosters innovation, research, and collaboration in intelligent systems, creating future-ready engineers and global technology leaders.
                  </p>
                </div>
              </div>
            </TiltCard>

            <TiltCard tiltAmount={8}>
              <div className="glass-card rounded-2xl p-8 h-full relative overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="relative space-y-8">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4 inline-flex rounded-xl bg-accent/10 p-3 text-accent"
                  >
                    <Target className="h-6 w-6" />
                  </motion.div>
                  <h2 className="text-2xl font-bold">Our Mission</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    To empower students with technical knowledge, practical experience, and industry exposure through workshops, hackathons, and collaborative projects, bridging the gap between academic learning and real-world applications.
                  </p>
                </div>
              </div>
            </TiltCard>
          </StaggerReveal>
        </div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper>
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal effect="scale">
            <SectionHeader
              title="Our Core Values"
              subtitle="The principles that guide everything we do"
            />
          </ScrollReveal>

          <StaggerReveal staggerAmount={0.1} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <TiltCard key={value.title} tiltAmount={15} scale={1.05}>
                <div className="group glass-card rounded-2xl p-6 text-center h-full relative overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  <div className="relative space-y-8">
                    <motion.div
                      whileHover={{ rotate: 360, y: -5 }}
                      transition={{ duration: 0.5 }}
                      className="mx-auto mb-4 inline-flex rounded-xl bg-primary/10 p-4 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                    >
                      <value.icon className="h-6 w-6" />
                    </motion.div>
                    <h3 className="text-lg font-semibold mt-1 mb-2 text-left group-hover:text-primary transition-colors">{value.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed text-left">{value.description}</p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </StaggerReveal>
        </div>
      </SectionWrapper>

      {/* Timeline */}
      <SectionWrapper className="bg-card/30 overflow-hidden">
        <div className="mx-auto max-w-4xl px-6">
          <ScrollReveal effect="fadeUp">
            <SectionHeader
              title="Our Journey"
              subtitle="A journey of innovation, growth, and impactful technical events driven by IEEE SMC GNITC."
            />
          </ScrollReveal>

          <div className="relative space-y-8">
            {/* Timeline line with gradient */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute left-4 top-0 w-px bg-gradient-to-b from-primary via-accent to-primary md:left-1/2 md:-translate-x-px"
            />

            {timeline.map((item, index) => (
              <ScrollReveal
                key={item.year}
                effect={index % 2 === 0 ? "fadeRight" : "fadeLeft"}
                delay={index * 0.1}
              >
                <div
                  className={`relative mb-8 pl-12 md:mb-12 md:w-1/2 md:pl-0 ${index % 2 === 0 ? "md:pr-12" : "md:ml-auto md:pl-12"
                    }`}
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
                    whileHover={{ scale: 1.3 }}
                    className={`absolute left-0 top-1 h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30 md:left-auto ${index % 2 === 0 ? "md:-right-4" : "md:-left-4"
                      }`}
                  >
                    <Sparkles className="h-4 w-4" />
                  </motion.div>

                  <TiltCard tiltAmount={5}>
                    <div className="glass-card rounded-xl p-6 group hover:shadow-lg hover:shadow-primary/10 transition-shadow duration-300">
                      <motion.span
                        className="text-sm font-bold text-primary block mb-1"
                        whileHover={{ scale: 1.1 }}
                      >
                        {item.year}
                      </motion.span>
                      <h3 className="mt-1 text-lg font-semibold group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </TiltCard>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Gallery */}
      <SectionWrapper>
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal effect="scale">
            <SectionHeader
              title="Gallery"
              subtitle="A glimpse of innovation, collaboration, and learning through our events, workshops, and hackathons."
            />
          </ScrollReveal>

          <StaggerReveal staggerAmount={0.1} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image, index) => (
              <ClipReveal key={image.alt} direction={index % 2 === 0 ? "up" : "left"}>
                <TiltCard tiltAmount={8}>
                  <div className="group relative overflow-hidden rounded-2xl cursor-pointer">
                    <motion.img
                      src={image.src}
                      alt={image.alt}
                      className="aspect-[4/3] w-full object-contain bg-black rounded-2xl"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      crossOrigin="anonymous"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex items-end"
                    >
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        className="p-4 text-sm font-medium text-foreground"
                      >
                        {image.alt}
                      </motion.p>
                    </motion.div>

                    {/* Corner accent */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      className="absolute right-4 top-4 h-8 w-8 rounded-full bg-primary/80 flex items-center justify-center"
                    >
                      <Sparkles className="h-4 w-4 text-primary-foreground" />
                    </motion.div>
                  </div>
                </TiltCard>
              </ClipReveal>
            ))}
          </StaggerReveal>
        </div>
      </SectionWrapper>
    </>
  )
}
