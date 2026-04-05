"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Clock, CheckCircle2, Linkedin, Twitter, Instagram, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SectionWrapper } from "@/components/section-wrapper"
import { AnimatedBackground } from "@/components/animated-background"
import emailjs from "@emailjs/browser"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "ieeegnitc.smc@gniindia.org",
    href: "mailto:ieeegnitc.smc@gniindia.org",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 70139 18658",
    href: "tel:+917013918658",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Guru Nanak Institutions Technical Campus, Ibrahimpatnam, Hyderabad, Telangana – 501506",
    href: "https://maps.app.goo.gl/BhUzwh24aAyCpPZW8",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon - Fri: 10:00 AM - 4:00 PM",
    href: "#",
  },
]

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/ieee-smc-gni/?viewAsMember=true" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/ieee_smc_gni/" },
]

const faqs = [
  {
    question: "How can I join IEEE SMC GNI?",
    answer: "You can join by filling out the membership form available on our website or contacting our team.",
  },
  {
    question: "Do I need technical experience to join?",
    answer: "No, students from all backgrounds are welcome. We provide learning opportunities for everyone.",
  },
  {
    question: "What kind of events do you organize?",
    answer: "We organize hackathons, workshops, tech talks, networking events, and our annual Tech Summit. Check our Events page for upcoming activities.",
  },
  {
    question: "Can I propose an event idea?",
    answer: "Absolutely! We encourage members to propose new initiatives. Use the contact form to share your ideas, and our team will review them.",
  },
]

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    await emailjs.send(
      "service_3ztxr29",
      "template_69108qf",
      {
        name: formState.name,
        email: formState.email,
        subject: formState.subject,
        message: formState.message,
      },
      "wSEWjVH1UL8vCqLMD"
    );

    setIsSubmitted(true);
    setFormState({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setIsSubmitted(false), 5000);

  } catch (error) {
    console.error(error);
    alert("Failed to send message ❌");
  }

  setIsSubmitting(false);
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

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
              Get in Touch
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
              Let&apos;s <span className="gradient-text">Connect</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground text-pretty">
              Have questions, ideas, or interested in joining IEEE SMC GNITC? We’d be happy to connect with you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <SectionWrapper>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-2xl font-bold">Send Us a Message</h2>
              <p className="mt-2 text-muted-foreground">
                Fill out the form below and our team will get back to you at the earliest.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="bg-secondary/50"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="bg-secondary/50"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-input bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a subject</option>
                    <option value="membership">Membership Inquiry</option>
                    <option value="events">Events & Collaboration</option>
                    <option value="sponsorship">Sponsorship</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us more about your inquiry..."
                    value={formState.message}
                    onChange={handleChange}
                    required
                    className="w-full resize-none rounded-lg border border-input bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto glow-sm"
                  >
                    {isSubmitting ? (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2 inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent"
                      />
                    ) : isSubmitted ? (
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                    ) : (
                      <Send className="mr-2 h-4 w-4" />
                    )}
                    {isSubmitting ? "Sending..." : isSubmitted ? "Message Sent!" : "Submit Inquiry"}
                  </Button>
                </motion.div>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg bg-primary/10 p-4 text-sm text-primary"
                  >
                    Thank you for reaching out! We&apos;ll get back to you within 24-48 hours.
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-2xl font-bold">Contact Information</h2>
              <p className="mt-2 text-muted-foreground">
                Reach out to us through any of the following channels.
              </p>

              <div className="mt-8 space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 rounded-xl bg-card p-4 transition-colors hover:bg-secondary"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <info.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-medium text-foreground">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Follow Us
                </h3>
                <div className="mt-4 flex gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-8 overflow-hidden rounded-2xl"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d487961.0120139097!2d78.0492907!3d17.1607031!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb09dabc04d5b9%3A0x333765a35bb449cd!2sGurunanak%20Institute%20of%20Technology%20-%20Ibrahimpatnam!5e0!3m2!1sen!2sin!4v1775373680350!5m2!1sen!2sin"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale transition-all hover:grayscale-0"
                  title="IEEE SMC GNI Location"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* FAQs */}
      <SectionWrapper className="bg-card/30">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="mt-4 text-muted-foreground">
              Find answers to common queries about IEEE SMC GNI.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="overflow-hidden rounded-xl bg-card"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="font-medium text-foreground">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 flex-shrink-0 text-muted-foreground"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedFaq === index ? "auto" : 0,
                    opacity: expandedFaq === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
