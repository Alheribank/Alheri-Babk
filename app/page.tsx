"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield } from "lucide-react"
import { CodeBackground } from "@/components/code-background"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter()

  const handleAccessClick = () => {
    router.push("/tools")
  }

  return (
    <div className="min-h-screen relative">
      <CodeBackground />

      {/* Header */}
      <header className="container mx-auto px-4 py-4 relative z-10 border-b border-red-900/20">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-900 rounded-lg flex items-center justify-center shadow-lg shadow-red-900/50">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Dark Softwares</span>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent">
              Dark Softwares
            </span>
          </h1>

          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Professional software tools for your business needs. Explore our complete catalog of solutions.
          </p>

          <Button
            size="lg"
            onClick={handleAccessClick}
            className="px-8 py-6 text-base font-bold bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 shadow-xl shadow-red-900/40 border border-red-500/50 transition-all duration-300 hover:scale-[1.02]"
          >
            <Shield className="mr-2 w-5 h-5" />
            View Tools
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  )
}
