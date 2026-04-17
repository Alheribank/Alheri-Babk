"use client"

import { CodeBackground } from "@/components/code-background"
import { useState, useEffect } from "react"
import { Loader2, ArrowRight, Shield, Database, Server, Wifi } from "lucide-react"

interface BankTransferLoadingProps {
  onComplete: () => void
  transferAmount: number
  accountNumber: string
  accountName: string
  bankName: string
}

export function BankTransferLoading({
  onComplete,
  transferAmount,
  accountNumber,
  accountName,
  bankName,
}: BankTransferLoadingProps) {
  const [progress, setProgress] = useState(0)
  const [currentStatus, setCurrentStatus] = useState("Initializing secure transfer protocol...")
  const [hackingCodes, setHackingCodes] = useState<string[]>([])
  const [showAccountInfo, setShowAccountInfo] = useState(false)

  const statusMessages = [
    "Initializing secure transfer protocol...",
    "Connecting to Russian FSB banking gateway...",
    "Establishing encrypted tunnel...",
    "Bypassing banking security firewall...",
    "Accessing Nigerian banking network...",
    `Locating target account: ${accountNumber}...`,
    `Verifying account holder: ${accountName}...`,
    `Connecting to ${bankName} servers...`,
    "Injecting transfer payload...",
    "Routing funds through secure channels...",
    "Executing quantum-encrypted transfer...",
    "Masking transaction trail...",
    "Confirming fund allocation...",
    "Finalizing secure transfer...",
    "Transfer protocol complete...",
  ]

  const hackingCodeLines = [
    `> INIT TRANSFER_PROTOCOL v4.7.2`,
    `> CONNECT FSB_GATEWAY --secure --encrypted`,
    `> BYPASS FIREWALL --stealth-mode`,
    `> TARGET_ACCOUNT: ${accountNumber}`,
    `> ACCOUNT_HOLDER: ${accountName}`,
    `> BANK_SYSTEM: ${bankName}`,
    `> AMOUNT: ₦${transferAmount.toLocaleString()}`,
    `> ENCRYPT --quantum-resistant --level=MAX`,
    `> INJECT PAYLOAD --silent`,
    `> ROUTE --anonymous --multi-hop`,
    `> EXECUTE TRANSFER --confirm`,
    `> MASK TRAIL --complete`,
    `> STATUS: PROCESSING...`,
    `> VERIFY ALLOCATION...`,
    `> TRANSFER: COMPLETE`,
  ]

  useEffect(() => {
    const duration = 60000 // 1 minute
    const interval = duration / 100

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          setTimeout(() => onComplete(), 500)
          return 100
        }
        return prev + 1
      })
    }, interval)

    return () => clearInterval(progressTimer)
  }, [onComplete])

  useEffect(() => {
    const statusIndex = Math.min(Math.floor(progress / 7), statusMessages.length - 1)
    setCurrentStatus(statusMessages[statusIndex])

    if (progress > 30) {
      setShowAccountInfo(true)
    }
  }, [progress])

  useEffect(() => {
    const codeTimer = setInterval(() => {
      const codeIndex = Math.floor(progress / 7)
      if (codeIndex < hackingCodeLines.length) {
        setHackingCodes((prev) => {
          if (!prev.includes(hackingCodeLines[codeIndex])) {
            return [...prev, hackingCodeLines[codeIndex]]
          }
          return prev
        })
      }
    }, 4000)

    return () => clearInterval(codeTimer)
  }, [progress])

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
      <CodeBackground />

      <div className="relative z-10 w-full max-w-4xl px-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-900 rounded-full flex items-center justify-center shadow-2xl shadow-green-900/60 border-4 border-green-500/40 animate-pulse">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
          </div>
          <h1 className="text-2xl font-black mb-2 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent animate-pulse">
            EXECUTING BANK TRANSFER
          </h1>
          <p className="text-gray-400 text-sm">Russian FSB Secure Transfer Protocol Active</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Transfer Progress</span>
            <span className="text-green-400 font-mono">{progress}%</span>
          </div>
          <div className="h-3 bg-gray-900 rounded-full overflow-hidden border border-gray-700">
            <div
              className="h-full bg-gradient-to-r from-green-600 via-emerald-500 to-green-400 transition-all duration-300 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div className="bg-gray-900/80 border border-green-600/40 rounded-xl p-4 mb-6 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-green-400 font-mono text-sm">{currentStatus}</p>
          </div>
        </div>

        {/* Transfer Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* From Wallet */}
          <div className="bg-gradient-to-br from-purple-950/40 to-violet-950/40 border border-purple-600/40 rounded-xl p-4 backdrop-blur-md">
            <p className="text-xs text-gray-400 uppercase mb-2">From</p>
            <p className="text-sm font-bold text-purple-400 mb-1">Software Wallet</p>
            <p className="text-lg font-black text-red-400">-₦{transferAmount.toLocaleString()}</p>
          </div>

          {/* To Bank */}
          <div className="bg-gradient-to-br from-green-950/40 to-emerald-950/40 border border-green-600/40 rounded-xl p-4 backdrop-blur-md">
            <p className="text-xs text-gray-400 uppercase mb-2">To</p>
            <p className="text-sm font-bold text-green-400 mb-1">Bank Account</p>
            <p className="text-lg font-black text-green-400">+₦{transferAmount.toLocaleString()}</p>
          </div>
        </div>

        {/* Account Information Display */}
        {showAccountInfo && (
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-2 border-green-600/50 rounded-xl p-5 mb-6 backdrop-blur-md animate-pulse">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-5 h-5 text-green-400" />
              <h3 className="text-sm font-bold text-green-400 uppercase tracking-wider">TARGET ACCOUNT INFORMATION</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Account Number</p>
                <p className="text-lg font-mono font-bold text-white">{accountNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Account Name</p>
                <p className="text-lg font-bold text-white">{accountName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Bank</p>
                <p className="text-lg font-bold text-green-400">{bankName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Amount</p>
                <p className="text-lg font-bold text-yellow-400">₦{transferAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}

        {/* Hacking Codes Display */}
        <div className="bg-black/80 border border-green-600/30 rounded-xl p-4 backdrop-blur-md font-mono text-xs max-h-48 overflow-y-auto">
          <div className="flex items-center gap-2 mb-3">
            <Server className="w-4 h-4 text-green-400" />
            <span className="text-green-400 uppercase tracking-wider text-xs">FSB Transfer Protocol Log</span>
          </div>
          {hackingCodes.map((code, index) => (
            <div
              key={index}
              className="text-green-400 mb-1 animate-pulse"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {code}
            </div>
          ))}
          <div className="text-green-400 animate-pulse">
            <span className="inline-block w-2 h-4 bg-green-400 animate-pulse"></span>
          </div>
        </div>

        {/* Network Status */}
        <div className="flex justify-center gap-8 mt-6">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-green-400 animate-pulse" />
            <span className="text-xs text-gray-400">Network: Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-400 animate-pulse" />
            <span className="text-xs text-gray-400">Encryption: Active</span>
          </div>
          <div className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-green-400 animate-pulse" />
            <span className="text-xs text-gray-400">Transfer: In Progress</span>
          </div>
        </div>
      </div>
    </div>
  )
}
