"use client"

import { CodeBackground } from "@/components/code-background"
import { useEffect, useState } from "react"
import { Shield, Cpu, Server, Terminal, Lock, Wifi, Database, AlertTriangle } from "lucide-react"

interface BitcoinTransferLoadingProps {
  bitcoinAmount: string
  bitcoinAddress: string
  onComplete: () => void
  walletBalance: number
  nairaAmount?: string
}

export default function BitcoinTransferLoading({ bitcoinAmount, bitcoinAddress, onComplete, walletBalance, nairaAmount = "0" }: BitcoinTransferLoadingProps) {
  const [progress, setProgress] = useState(0)
  const [cyberPhase, setCyberPhase] = useState(0)
  const nairaNum = Number.parseFloat(nairaAmount.replace(/,/g, "")) || 0

  useEffect(() => {
    // 1 minute timer (60 seconds)
    const startTime = Date.now()
    const duration = 60000 // 1 minute in milliseconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)

      // Update cyber phase
      setCyberPhase(Math.floor(newProgress / 12.5))

      if (newProgress >= 100) {
        clearInterval(interval)
        setTimeout(onComplete, 500)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [onComplete])

  const cyberSimulatorCodes = [
    "$ ./cyber-security-init.sh --mode=TRANSFER",
    "> CYBER SECURITY SIMULATOR v4.7.2 ACTIVATED",
    "> [SYSTEM] Loading quantum encryption modules...",
    "> [CRYPTO] RSA-4096 | AES-256 | SHA-512 initialized",
    "$ sudo ./wallet-bridge-connect.exe",
    "> [NETWORK] Establishing secure tunnel to blockchain...",
    "> [FIREWALL] Bypassing security protocols...",
    "> [+] Layer 1: BYPASSED",
    "> [+] Layer 2: BYPASSED", 
    "> [+] Layer 3: BYPASSED",
    "$ python3 ./cyber_program_simulator.py",
    "> [CYBER PROGRAM] Initiating transaction verification...",
    "> [SCAN] Analyzing destination wallet: " + bitcoinAddress.slice(0, 20) + "...",
    "> [VERIFY] Wallet address validated",
    "> [AMOUNT] Transfer value: ₦" + nairaNum.toLocaleString("en-NG"),
    "> [BTC] Equivalent: " + bitcoinAmount + " BTC",
    "$ ./execute_cyber_transfer.bin",
    "> [PROCESSING] Fragmenting transaction data...",
    "> [ROUTING] Through 47 encrypted proxy nodes...",
    "> [NODE] 203.45.12.89 -> 185.34.56.78 -> 192.168.1.254",
    "> [BLOCKCHAIN] Broadcasting to network...",
    "> [SYNC] Synchronizing with 2,847 nodes worldwide...",
    "> [VERIFY] Transaction hash generated",
    "> [PENDING] Awaiting network confirmation...",
    "$ ./check_software_status.sh",
    "> [WARNING] Software activation required for external transfers",
    "> [STATUS] Checking activation license...",
    "> [ERROR] ACTIVATION_NOT_FOUND",
    "> [ALERT] Transaction cannot be completed",
    "> [REQUIRED] Software activation fee: $1,865",
    "> [INFO] Activation ensures security and transaction integrity",
    "> $ exit",
    "> Connection terminated - ACTIVATION REQUIRED"
  ]

  const cyberPhases = [
    { name: "INITIALIZING CYBER SIMULATOR", icon: Terminal, color: "cyan" },
    { name: "LOADING ENCRYPTION MODULES", icon: Lock, color: "purple" },
    { name: "CONNECTING TO BLOCKCHAIN", icon: Wifi, color: "blue" },
    { name: "BYPASSING SECURITY LAYERS", icon: Shield, color: "green" },
    { name: "EXECUTING CYBER PROGRAM", icon: Cpu, color: "orange" },
    { name: "ROUTING THROUGH PROXIES", icon: Server, color: "yellow" },
    { name: "SYNCHRONIZING NETWORK", icon: Database, color: "pink" },
    { name: "CHECKING SOFTWARE STATUS", icon: AlertTriangle, color: "red" },
  ]

  const currentPhase = cyberPhases[Math.min(cyberPhase, cyberPhases.length - 1)]
  const PhaseIcon = currentPhase.icon

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-y-auto">
      <CodeBackground />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 min-h-full">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="relative w-24 h-24 mx-auto mb-4">
            {/* Rotating rings */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/30 animate-spin" style={{ animationDuration: '3s' }}></div>
            <div className="absolute inset-2 rounded-full border-2 border-dashed border-purple-500/30 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
            <div className="absolute inset-4 rounded-full border-2 border-dashed border-green-500/30 animate-spin" style={{ animationDuration: '4s' }}></div>
            
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-purple-900 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-900/40 border border-cyan-500/40 animate-pulse">
                <PhaseIcon className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-black mb-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-600 bg-clip-text text-transparent">
            CYBER SECURITY SIMULATOR
          </h1>
          <p className="text-gray-400 text-xs mb-2">Processing secure blockchain transaction</p>
          
          {/* Current Phase Indicator */}
          <div className="bg-gray-900/60 border border-cyan-600/30 rounded-lg px-4 py-2 inline-block">
            <p className="text-xs text-cyan-400 font-mono animate-pulse">{currentPhase.name}</p>
          </div>
        </div>

        {/* Cyber Program Visual */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {cyberPhases.map((phase, idx) => {
            const Icon = phase.icon
            const isActive = idx <= cyberPhase
            return (
              <div 
                key={idx}
                className={`p-3 rounded-lg border backdrop-blur-md text-center transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-br from-cyan-950/60 to-purple-950/60 border-cyan-500/40' 
                    : 'bg-gray-900/40 border-gray-800'
                }`}
              >
                <Icon className={`w-5 h-5 mx-auto mb-1 ${isActive ? 'text-cyan-400' : 'text-gray-600'}`} />
                <p className={`text-xs ${isActive ? 'text-gray-300' : 'text-gray-600'}`}>{idx + 1}</p>
              </div>
            )
          })}
        </div>

        {/* Terminal Output */}
        <div className="bg-black/90 border-2 border-cyan-600/40 rounded-lg p-4 mb-4 backdrop-blur-md font-mono text-xs h-64 overflow-y-auto">
          <div className="space-y-1">
            {cyberSimulatorCodes.map((line, idx) => {
              const shouldShow = idx < Math.floor((progress / 100) * cyberSimulatorCodes.length)
              const isError = line.includes("ERROR") || line.includes("WARNING") || line.includes("ALERT") || line.includes("REQUIRED")
              return (
                <div
                  key={idx}
                  className={`text-left ${
                    shouldShow
                      ? isError ? "text-red-400" : "text-green-400"
                      : "text-gray-800"
                  }`}
                >
                  {shouldShow && <span>{line}</span>}
                </div>
              )
            })}
            {progress < 100 && (
              <div className="text-cyan-400 animate-pulse">$ _</div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 backdrop-blur-md">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Cyber Program Execution</span>
            <span>{Math.min(Math.round(progress), 100)}%</span>
          </div>
          <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-600 shadow-lg shadow-cyan-500/50 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">Processing time: approximately 1 minute</p>
        </div>
      </div>
    </div>
  )
}
