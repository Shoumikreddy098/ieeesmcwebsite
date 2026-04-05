import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Preloader } from '@/components/preloader'
import './globals.css'

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: 'IEEE SMC GNI',
  description: 'Empowering students to innovate, create, and lead. Join IEEE SMC GNI - the premier college club for technology enthusiasts and future leaders.',
  keywords: ['college club', 'technology', 'innovation', 'students', 'campus', 'events'],
  authors: [{ name: 'IEEE SMC GNI' }],
  openGraph: {
    title: 'IEEE SMC GNI',
    description: 'Empowering students to innovate, create, and lead.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a2e' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Preloader />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
