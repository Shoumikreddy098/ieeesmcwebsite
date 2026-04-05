"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, Github, Twitter, Linkedin, Instagram, Mail, MapPin, Phone } from "lucide-react"

const footerLinks = {
  navigation: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
    { href: "/members", label: "Members" },
    { href: "/dignitaries", label: "Dignitaries" },
    { href: "/contact", label: "Contact" },
  ],
  resources: [
    { href: "/events", label: "Events" },
    { href: "/dignitaries", label: "Dignitaries" },
    { href: "/contact", label: "Join Us" },
  ],
}

const socialLinks = [
  { href: "https://www.linkedin.com/company/ieee-smc-gni/?viewAsMember=true", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.instagram.com/ieee_smc_gni/", icon: Instagram, label: "Instagram" },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-card/50">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                IEEE SMC<span className="text-primary"> GNI</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering innovation in Artificial Intelligence, Cybernetics, and Intelligent Systems through student-driven initiatives.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Navigation</h3>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-6 w-6 text-primary" />
                <span>Guru Nanak Institutions, Ibrahimpatnam, Telangana 501506</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:ieeegnitc.smc@gniindia.org" className="hover:text-primary transition-colors">
                  ieeegnitc.smc@gniindia.org
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+91 70139 18658" className="hover:text-primary transition-colors">
                  +91 70139 18658
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row"
        >
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} IEEE SMC GNI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
