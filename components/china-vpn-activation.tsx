"use client"
import { CodeBackground } from "@/components/code-background"
import { NotificationModal } from "@/components/notification-modal"
import { Shield, AlertTriangle, ArrowLeft, Globe, Zap, Lock, Server, Star, Crown, Eye, Target } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChinaVPNActivationProps {
  onBack: () => void
  selectedProvince: string
}

export function ChinaVPNActivation({ onBack, selectedProvince }: ChinaVPNActivationProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-y-auto py-8">
      <CodeBackground />
      <NotificationModal />

      <div className="relative z-10 w-full max-w-4xl px-6">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800/50">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-red-600 via-yellow-500 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-900/80 animate-pulse border-4 border-red-500/50">
                <Shield className="w-14 h-14 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-2 animate-bounce">
                <Crown className="w-4 h-4 text-black" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 bg-clip-text text-transparent">
            中国超级VPN
          </h1>
          <h2 className="text-2xl font-bold text-white mb-2">CHINA SUPER VPN</h2>
          <p className="text-gray-400">
            Connected to: <span className="text-yellow-400 font-bold">{selectedProvince}</span>
          </p>
        </div>

        {/* World's Most Powerful VPN Notice */}
        <div className="bg-gradient-to-r from-red-950/60 via-yellow-950/40 to-red-950/60 border-2 border-red-600/60 rounded-2xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 animate-pulse"></div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
            <h3 className="text-xl font-black text-yellow-400 uppercase tracking-wider">World's Most Powerful VPN</h3>
            <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
          </div>

          <p className="text-center text-gray-300 mb-6 leading-relaxed">
            This VPN represents the pinnacle of Russian-Chinese joint cyber warfare technology. Developed in
            collaboration between FSB and Chinese Ministry of State Security (MSS), this system provides{" "}
            <span className="text-red-400 font-bold">ABSOLUTE ANONYMITY</span> and
            <span className="text-yellow-400 font-bold"> UNBREAKABLE ENCRYPTION</span> that no government or
            organization on Earth can penetrate.
          </p>

          {/* Power stats */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            <div className="bg-black/40 rounded-xl p-4 text-center border border-red-600/30">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2 animate-pulse" />
              <p className="text-xs text-gray-500 uppercase">Power Level</p>
              <p className="text-lg font-black text-yellow-400">∞ MAX</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 text-center border border-red-600/30">
              <Globe className="w-8 h-8 text-red-400 mx-auto mb-2 animate-spin" style={{ animationDuration: "8s" }} />
              <p className="text-xs text-gray-500 uppercase">Coverage</p>
              <p className="text-lg font-black text-red-400">195 Countries</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 text-center border border-red-600/30">
              <Lock className="w-8 h-8 text-green-400 mx-auto mb-2 animate-pulse" />
              <p className="text-xs text-gray-500 uppercase">Encryption</p>
              <p className="text-lg font-black text-green-400">AES-1024</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 text-center border border-red-600/30">
              <Server className="w-8 h-8 text-blue-400 mx-auto mb-2 animate-pulse" />
              <p className="text-xs text-gray-500 uppercase">Servers</p>
              <p className="text-lg font-black text-blue-400">50,000+</p>
            </div>
          </div>

          {/* Capabilities */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-red-900/40 to-black/40 rounded-xl p-4 border border-red-600/30">
              <h4 className="text-sm font-bold text-red-400 mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" /> Attack Capabilities
              </h4>
              <ul className="text-xs text-gray-400 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">▸</span> Global Bank Network Access
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">▸</span> Government Database Penetration
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">▸</span> Military System Infiltration
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">▸</span> Corporate Espionage Tools
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-yellow-900/40 to-black/40 rounded-xl p-4 border border-yellow-600/30">
              <h4 className="text-sm font-bold text-yellow-400 mb-3 flex items-center gap-2">
                <Eye className="w-4 h-4" /> Stealth Features
              </h4>
              <ul className="text-xs text-gray-400 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">▸</span> Zero-Trace Technology
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">▸</span> Quantum Invisibility Mode
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">▸</span> AI-Powered Identity Masking
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">▸</span> Neural Network Obfuscation
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Activation Required Notice */}
        <div className="bg-gradient-to-r from-orange-950/60 to-red-950/60 border-2 border-orange-500/60 rounded-2xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-red-600/10 animate-pulse"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-orange-400 animate-bounce" />
              <h3 className="text-2xl font-black text-orange-400 uppercase tracking-wider">ACTIVATION REQUIRED</h3>
              <AlertTriangle className="w-8 h-8 text-orange-400 animate-bounce" />
            </div>

            <div className="bg-black/60 rounded-xl p-6 border-2 border-orange-500/40 mb-6">
              <p className="text-center text-white font-bold text-lg mb-4">
                To unlock the full power of China Super VPN, activation is{" "}
                <span className="text-red-400">MANDATORY</span>
              </p>

              <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-xl p-4 border border-green-500/40 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Activation Fee</p>
                    <p className="text-3xl font-black text-green-400">$478 USD</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Payment Method</p>
                    <p className="text-lg font-bold text-yellow-400">Bitcoin Only</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-400">
                <p className="flex items-center gap-2">
                  <span className="text-red-400">⚠</span>
                  Without activation, VPN will disconnect after 24 hours
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-red-400">⚠</span>
                  All operations will be logged without activation
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-red-400">⚠</span>
                  Your identity may be exposed to authorities
                </p>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 rounded-xl border-2 border-orange-500/40 text-lg">
              <Lock className="w-5 h-5 mr-2" />
              PAY $478 TO ACTIVATE VPN
            </Button>
          </div>
        </div>

        {/* Chinese text footer */}
        <div className="text-center">
          <p className="text-red-400 font-mono text-lg mb-2">中国超级VPN - 世界上最强大的VPN系统</p>
          <p className="text-xs text-gray-500">Russian-Chinese Joint Cyber Warfare Division © 2025-2026</p>
        </div>
      </div>
    </div>
  )
}
