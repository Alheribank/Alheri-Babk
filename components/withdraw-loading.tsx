"use client"

import { CodeBackground } from "@/components/code-background"
import { useEffect, useState } from "react"
import { ArrowDownToLine, Loader2, CheckCircle, Shield } from "lucide-react"

interface WithdrawLoadingProps {
  amount: number
  onComplete: () => void
}

export function WithdrawLoading({ amount, onComplete }: WithdrawLoadingProps) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("Initializing secure transfer protocol...")
  const [codes, setCodes] = useState<string[]>([])

  const transferStatuses = [
    "Initializing secure transfer protocol...",
    "Connecting to FSB encrypted network...",
    "Verifying account credentials...",
    "Extracting funds from source account...",
    "Encrypting transaction data...",
    "Routing through anonymous nodes...",
    "Bypassing security protocols...",
    "Transferring to software wallet...",
    "Finalizing quantum encryption...",
    "Transfer complete - funds secured",
  ]

  const hackingCodes = [
    "TRANSFER_INIT: 0x7F3A9C2E → WALLET_ADDR: 0x9B4E7F1A",
    "AMOUNT: ₦" + amount.toLocaleString("en-NG"),
    "ENCRYPT_KEY: RSA-4096 | AES-256-GCM",
    "ROUTING: TOR_NODE_47 → VPN_MOSCOW_12",
    "BYPASS: FIREWALL_ZENITH → SUCCESS",
    "TRACE_REMOVAL: ACTIVE | LOGS_CLEARED",
    "QUANTUM_LOCK: ENABLED | UNTRACEABLE",
    "FSB_PROTOCOL: AUTHENTICATED",
    "WALLET_UPDATE: +₦" + amount.toLocaleString("en-NG"),
    "STATUS: TRANSFER_COMPLETE",
  ]

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => onComplete(), 1000)
          return 100
        }
        return prev + 1
      })
    }, 600)

    return () => clearInterval(progressInterval)
  }, [onComplete])

  useEffect(() => {
    const statusInterval = setInterval(() => {
      const statusIndex = Math.floor(progress / 10)
      if (statusIndex < transferStatuses.length) {
        setStatus(transferStatuses[statusIndex])
      }
    }, 600)

    return () => clearInterval(statusInterval)
  }, [progress])

  useEffect(() => {
    const codeInterval = setInterval(() => {
      const randomCode = hackingCodes[Math.floor(Math.random() * hackingCodes.length)]
      setCodes((prev) => {
        const newCodes = [randomCode, ...prev].slice(0, 12)
        return newCodes
      })
    }, 300)

    return () => clearInterval(codeInterval)
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
      <CodeBackground />

      <div className="relative z-10 w-full max-w-4xl px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-red-900 rounded-3xl flex items-center justify-center shadow-2xl shadow-orange-900/60 border-2 border-orange-500/40 animate-pulse">
                <ArrowDownToLine className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Shield className="w-8 h-8 text-green-400 animate-pulse" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-black mb-3 bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent animate-pulse">
            EXECUTING FUND WITHDRAWAL
          </h1>
          <p className="text-gray-400 text-sm uppercase tracking-wider font-mono">
            FSB Encrypted Transfer Protocol Active
          </p>
        </div>

        {/* Amount Display */}
        <div className="bg-gradient-to-br from-orange-950/40 to-red-950/40 border-2 border-orange-600/40 rounded-xl p-6 mb-6 backdrop-blur-md text-center">
          <p className="text-sm text-gray-400 mb-2">Transfer Amount</p>
          <p className="text-3xl font-black text-orange-400">
            ₦{amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 backdrop-blur-md mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-300">Transfer Progress</span>
            <span className="text-sm font-bold text-orange-400">{progress}%</span>
          </div>
          <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-orange-600 to-red-600 transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center gap-2">
            {progress < 100 ? (
              <Loader2 className="w-4 h-4 text-orange-400 animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4 text-green-400" />
            )}
            <p className="text-sm text-gray-400 font-mono">{status}</p>
          </div>
        </div>

        {/* Hacking Codes Display */}
        <div className="bg-black/80 border border-green-900/40 rounded-xl p-4 backdrop-blur-md font-mono text-xs h-64 overflow-hidden">
          <div className="space-y-1">
            {codes.map((code, index) => (
              <div
                key={index}
                className="text-green-400 opacity-0 animate-[fadeIn_0.3s_ease-in_forwards]"
                style={{
                  animationDelay: `${index * 0.05}s`,
                  textShadow: "0 0 10px rgba(74, 222, 128, 0.5)",
                }}
              >
                <span className="text-orange-500">[{new Date().toLocaleTimeString()}]</span> {code}
              </div>
            ))}
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 bg-orange-950/30 border border-orange-600/30 rounded-xl p-4">
          <p className="text-xs text-orange-300 text-center leading-relaxed">
            🔒 Transfer is encrypted using FSB quantum-resistant protocols. All traces are being removed from banking
            networks.
          </p>
        </div>
      </div>
    </div>
  )
}
