"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, AlertTriangle, Shield } from "lucide-react"
import { CodeBackground } from "@/components/code-background"
import { CyberLoading } from "@/components/cyber-loading"
import { BankVerificationForm } from "@/components/bank-verification-form"
import { NotificationModal } from "@/components/notification-modal"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const [showLoading, setShowLoading] = useState(false)
  const [showVerification, setShowVerification] = useState(false)
  const router = useRouter()

  const handleAccessClick = () => {
    setShowLoading(true)
  }

  const handleLoadingComplete = () => {
    setShowLoading(false)
    setShowVerification(true)
  }

  const handleVerificationComplete = () => {
    router.push("/tools")
  }

  if (showVerification) {
    return (
      <>
        <NotificationModal />
        <BankVerificationForm onComplete={handleVerificationComplete} />
      </>
    )
  }

  if (showLoading) {
    return (
      <>
        <NotificationModal />
        <CyberLoading onComplete={handleLoadingComplete} />
      </>
    )
  }

  return (
    <div className="min-h-screen relative">
      <CodeBackground />

      <NotificationModal />

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
      <section className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Badge */}
          <div className="flex items-center justify-center mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-950/70 border border-red-600/40 rounded-full backdrop-blur-sm">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              <span className="text-xs font-semibold text-red-300 uppercase tracking-wider">
                Professional Tools Only
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight text-center">
            <span className="bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent">
              Dark Softwares
            </span>
            <span className="block text-3xl md:text-4xl mt-3 bg-gradient-to-r from-red-400 via-red-500 to-orange-500 bg-clip-text text-transparent">
              Elite Russian Cyber
            </span>
          </h1>

          <div className="bg-gradient-to-br from-red-950/80 to-black/80 border border-red-600/40 rounded-xl p-6 mb-8 backdrop-blur-md shadow-xl shadow-red-900/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center flex-shrink-0 border border-red-500/30">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-red-400 mb-3 uppercase tracking-wide">
                  Professional Cyber Warfare Arsenal
                </h3>
                <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
                  <p className="font-semibold text-white">⚠️ CRITICAL SECURITY NOTICE: Elite FSB-Validated Tools</p>
                  <p>
                    This platform provides access to{" "}
                    <span className="text-red-400 font-bold">military-grade cyber warfare software</span> developed by
                    Russian Federal Security Service (FSB) specialists and validated by international cybersecurity
                    institutions. Each tool represents years of advanced research in digital infiltration and network
                    penetration technologies.
                  </p>
                  <div className="border-l-2 border-yellow-500/50 pl-4 py-2 bg-yellow-950/20 rounded-r space-y-2">
                    <p className="text-yellow-300 font-semibold text-xs uppercase tracking-wide">
                      Mandatory Requirements:
                    </p>
                    <ul className="text-yellow-200 text-xs space-y-1 list-disc list-inside">
                      <li>VPN protection systems are REQUIRED for all operations</li>
                      <li>Professional expertise in cybersecurity is MANDATORY</li>
                      <li>Each software MUST be paired with its designated VPN</li>
                      <li>International compliance and operational security protocols apply</li>
                    </ul>
                  </div>
                  <p className="text-red-300 font-bold text-xs border-t border-red-600/30 pt-3">
                    ⚠️ LEGAL DISCLAIMER: By accessing this arsenal, you accept full responsibility for all consequences,
                    technical failures, legal complications, and operational risks. Improper usage may result in severe
                    personal, legal, and technical repercussions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <Button
              size="lg"
              onClick={handleAccessClick}
              className="w-full max-w-md text-base font-bold py-6 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 shadow-xl shadow-red-900/40 border border-red-500/50 transition-all duration-300 hover:scale-[1.02]"
            >
              <Shield className="mr-2 w-5 h-5" />
              Access cyber softwares
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Secure Bitcoin Payment • Instant Access After Confirmation
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
