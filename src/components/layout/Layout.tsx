import * as React from "react"
import { Shield, Phone, Mail, Lock, Heart, Car, CheckCircle2, Star } from "lucide-react"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50/50 to-red-50/30">
      {/* Hero Header with Car Image */}
      <header className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-red-600">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        {/* Navigation Bar */}
        <nav className="relative z-10 border-b border-white/20 bg-white/10 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-orange-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Shield className="h-7 w-7" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">AutoInsure</h1>
                  <p className="text-xs font-medium text-orange-100">Compare & Save</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-2 text-sm font-medium text-white bg-white/20 px-4 py-2 rounded-full border border-white/30 backdrop-blur-sm">
                  <Lock className="h-4 w-4" />
                  <span>Secure & Private</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                <CheckCircle2 className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">Trusted by 50,000+ drivers</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Find Your Perfect
                <span className="block mt-2">Auto Insurance</span>
              </h2>
              
              <p className="text-lg md:text-xl text-orange-100 leading-relaxed max-w-lg">
                Compare quotes from top providers in minutes. Save up to 40% on your car insurance today.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-white font-medium">4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm">Free quotes</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm">No obligation</span>
                </div>
              </div>
            </div>

            {/* Right: Car Image */}
            <div className="relative">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80"
                  alt="Modern car on road"
                  className="w-full h-auto rounded-2xl shadow-lg object-cover"
                />
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-orange-100">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary text-white">
                      <Car className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">40%</p>
                      <p className="text-xs text-slate-600">Average Savings</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="url(#wave-gradient)"/>
            <defs>
              <linearGradient id="wave-gradient" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fff7ed"/>
                <stop offset="1" stopColor="#ffedd5"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary text-white shadow-md">
                  <Shield className="h-5 w-5" strokeWidth={2} />
                </div>
                <span className="font-bold text-lg text-slate-800">AutoInsure</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Compare auto insurance quotes from top providers and find the best coverage for your needs.
              </p>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Heart className="h-4 w-4 text-orange-500 fill-orange-500" />
                <span>Made with care for your peace of mind</span>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-slate-800">Contact Us</h3>
              <div className="space-y-3">
                <a href="tel:1-800-AUTO-INS" className="flex items-center gap-3 text-sm text-slate-600 hover:text-orange-600 transition-colors group">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 group-hover:bg-orange-200 transition-colors">
                    <Phone className="h-4 w-4 text-orange-600" strokeWidth={2} />
                  </div>
                  <span className="font-medium">1-800-AUTO-INS</span>
                </a>
                <a href="mailto:support@autoinsure.com" className="flex items-center gap-3 text-sm text-slate-600 hover:text-orange-600 transition-colors group">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 group-hover:bg-orange-200 transition-colors">
                    <Mail className="h-4 w-4 text-orange-600" strokeWidth={2} />
                  </div>
                  <span className="font-medium">support@autoinsure.com</span>
                </a>
              </div>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-slate-800">Legal</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-2 text-sm text-slate-600 hover:text-orange-600 transition-colors group">
                  <div className="h-1.5 w-1.5 rounded-full bg-orange-300 group-hover:bg-orange-500 transition-colors" />
                  <span className="font-medium">Privacy Policy</span>
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-slate-600 hover:text-orange-600 transition-colors group">
                  <div className="h-1.5 w-1.5 rounded-full bg-orange-300 group-hover:bg-orange-500 transition-colors" />
                  <span className="font-medium">Terms of Service</span>
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-slate-600 hover:text-orange-600 transition-colors group">
                  <div className="h-1.5 w-1.5 rounded-full bg-orange-300 group-hover:bg-orange-500 transition-colors" />
                  <span className="font-medium">Cookie Policy</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-orange-200 text-center">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} AutoInsure. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}