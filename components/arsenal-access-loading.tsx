"use client"

import { useEffect, useState } from "react"
import { CodeBackground } from "@/components/code-background"
import { Shield, Wifi, Lock, Database, Server, Globe } from "lucide-react"

export function ArsenalAccessLoading({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [currentStatus, setCurrentStatus] = useState("")

  const statusMessages = [
    "Establishing encrypted connection to FSB servers...",
    "Accessing Russian military network protocols...",
    "Decrypting quantum-resistant security layers...",
    "Synchronizing with international cyber infrastructure...",
    "Validating neural-adaptive authentication systems...",
    "Bypassing conventional firewall architectures...",
    "Activating classified database access channels...",
    "Initializing advanced penetration testing modules...",
    "Connecting to global banking network grids...",
    "Calibrating offensive cyber warfare tools...",
    "Establishing secure command and control channel...",
    "Finalizing arsenal access authorization...",
  ]

  useEffect(() => {
    const duration = 30000 // 30 seconds
    const interval = 100
    const increment = 100 / (duration / interval)

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + increment
      })
    }, interval)

    return () => clearInterval(progressTimer)
  }, [onComplete])

  useEffect(() => {
    const statusInterval = setInterval(() => {
      setCurrentStatus(statusMessages[Math.floor((progress / 100) * statusMessages.length)])
    }, 3000)

    return () => clearInterval(statusInterval)
  }, [progress])

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <CodeBackground />

      <div className="relative z-10 w-full max-w-3xl px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-900 rounded-3xl flex items-center justify-center shadow-2xl shadow-red-900/60 border-2 border-red-500/40 animate-pulse">
                <Shield className="w-14 h-14 text-white" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl blur-xl opacity-30 animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-red-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
            ACCESSING DATA NETWORK
          </h1>
          <p className="text-gray-400 text-sm uppercase tracking-wider font-mono">
            Establishing Secure Connection to Arsenal
          </p>
        </div>

        {/* Network Status Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900/60 border border-green-900/40 rounded-lg p-4 backdrop-blur-md">
            <Wifi className="w-6 h-6 text-green-400 mb-2" />
            <p className="text-xs text-gray-400 mb-1">Network Status</p>
            <p className="text-sm font-bold text-green-400">CONNECTED</p>
          </div>
          <div className="bg-gray-900/60 border border-blue-900/40 rounded-lg p-4 backdrop-blur-md">
            <Lock className="w-6 h-6 text-blue-400 mb-2" />
            <p className="text-xs text-gray-400 mb-1">Encryption</p>
            <p className="text-sm font-bold text-blue-400">AES-512</p>
          </div>
          <div className="bg-gray-900/60 border border-purple-900/40 rounded-lg p-4 backdrop-blur-md">
            <Database className="w-6 h-6 text-purple-400 mb-2" />
            <p className="text-xs text-gray-400 mb-1">Database</p>
            <p className="text-sm font-bold text-purple-400">SYNCING</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-mono text-gray-400">Progress</span>
            <span className="text-sm font-mono font-bold text-red-400">{Math.floor(progress)}%</span>
          </div>
          <div className="h-3 bg-gray-900/80 rounded-full border border-red-900/40 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-red-600 transition-all duration-300 ease-out shadow-lg shadow-red-500/50"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Status Message */}
        <div className="bg-gray-900/60 border border-red-900/40 rounded-xl p-6 backdrop-blur-md mb-8">
          <div className="flex items-start gap-3">
            <Server className="w-5 h-5 text-red-400 flex-shrink-0 mt-1 animate-pulse" />
            <div className="flex-1">
              <p className="text-sm text-gray-300 leading-relaxed font-mono">{currentStatus || statusMessages[0]}</p>
            </div>
          </div>
        </div>

        {/* Hacking Codes Animation */}
        <div className="bg-black/60 border border-green-900/40 rounded-xl p-4 backdrop-blur-md overflow-hidden">
          <div className="space-y-1 font-mono text-xs">
            <div className="text-green-400 animate-pulse">
              [INIT] Loading cyber warfare modules... ████████████████████ 100%
            </div>
            <div className="text-blue-400 animate-pulse delay-100">
              [AUTH] Validating RSA-4096 keys... ████████████████████ COMPLETE
            </div>
            <div className="text-yellow-400 animate-pulse delay-200">
              [CONN] Establishing tunnel to 185.220.101.★★★... SECURED
            </div>
            <div className="text-purple-400 animate-pulse delay-300">
              [EXEC] Running payload injection sequence... SUCCESS
            </div>
            <div className="text-orange-400 animate-pulse delay-500">
              [DATA] Retrieving encrypted database entries... SYNCING
            </div>
            <div className="text-red-400 animate-pulse delay-700">
              [FINAL] Arsenal access authorization... IN PROGRESS
            </div>
          </div>
        </div>

        {/* Footer Warning */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-600 font-mono">
            <Globe className="w-3 h-3 inline mr-1" />
            Connection secured through Russian FSB encrypted channels
          </p>
        </div>
      </div>
    </div>
  )
}
