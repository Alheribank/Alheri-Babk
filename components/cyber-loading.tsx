"use client"

import { useEffect, useState } from "react"
import { Shield, Lock, Terminal, Wifi } from "lucide-react"

export function CyberLoading({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("INITIALIZING SECURE CONNECTION...")

  useEffect(() => {
    const stages = [
      { time: 0, status: "INITIALIZING SECURE CONNECTION...", progress: 0 },
      { time: 5000, status: "ESTABLISHING ENCRYPTED TUNNEL...", progress: 15 },
      { time: 10000, status: "VERIFYING FSB AUTHENTICATION PROTOCOLS...", progress: 30 },
      { time: 15000, status: "LOADING RUSSIAN CYBER DATABASE...", progress: 45 },
      { time: 22000, status: "DECRYPTING QUANTUM-PROTECTED FILES...", progress: 60 },
      { time: 30000, status: "ACTIVATING NEURAL SECURITY LAYER...", progress: 75 },
      { time: 40000, status: "SYNCHRONIZING CYBER WARFARE MODULES...", progress: 85 },
      { time: 50000, status: "FINALIZING SECURE ACCESS...", progress: 95 },
      { time: 58000, status: "ACCESS GRANTED - PREPARING VERIFICATION...", progress: 100 },
    ]

    stages.forEach((stage) => {
      setTimeout(() => {
        setStatus(stage.status)
        setProgress(stage.progress)
      }, stage.time)
    })

    const timer = setTimeout(() => {
      onComplete()
    }, 60000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Animated background codes */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-green-500 font-mono text-xs whitespace-nowrap animate-scroll-left"
            style={{
              top: `${i * 3.33}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {`${Math.random().toString(16).substring(2, 18)} ENCRYPTED ${Math.random().toString(36).substring(2, 10).toUpperCase()} `}
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl px-6">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-900 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-900/50 border-2 border-red-500/30">
            <Shield className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-black text-center mb-12 bg-gradient-to-r from-red-400 via-red-500 to-orange-500 bg-clip-text text-transparent">
          ELITE RUSSIAN CYBER
        </h1>

        {/* Status icons */}
        <div className="flex justify-center gap-8 mb-12">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-red-950/50 border border-red-500/30 flex items-center justify-center">
              <Lock className="w-6 h-6 text-red-400 animate-pulse" />
            </div>
            <span className="text-xs text-gray-400">ENCRYPTION</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-red-950/50 border border-red-500/30 flex items-center justify-center">
              <Terminal className="w-6 h-6 text-red-400 animate-pulse" style={{ animationDelay: "0.2s" }} />
            </div>
            <span className="text-xs text-gray-400">SYSTEMS</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-red-950/50 border border-red-500/30 flex items-center justify-center">
              <Wifi className="w-6 h-6 text-red-400 animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
            <span className="text-xs text-gray-400">CONNECTION</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="h-3 bg-gray-900 rounded-full overflow-hidden border border-red-900/50">
            <div
              className="h-full bg-gradient-to-r from-red-600 via-red-500 to-orange-500 transition-all duration-1000 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>PROGRESS</span>
            <span className="font-mono text-red-400">{progress}%</span>
          </div>
        </div>

        {/* Status message */}
        <div className="bg-black/60 border border-red-900/50 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <p className="text-sm font-mono text-red-400 tracking-wider">{status}</p>
          </div>
        </div>

        {/* Warning */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-600 uppercase tracking-widest">Establishing Secure Russian FSB Connection</p>
        </div>
      </div>
    </div>
  )
}
