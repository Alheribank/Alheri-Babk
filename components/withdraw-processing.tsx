"use client"

import { CodeBackground } from "@/components/code-background"
import { useEffect, useState } from "react"
import { Zap, Network, Shield, Server, Satellite, Radio, Building, CreditCard, Wallet } from "lucide-react"
import Image from "next/image"

interface WithdrawProcessingProps {
  amount: number
  onComplete: () => void
}

const hackerCodes = [
  "$ sudo ./satellite-uplink.sh --connect",
  "> SATELLITE UPLINK ESTABLISHED",
  "> [SIGNAL] Frequency: 12.5 GHz | Strength: 98.7%",
  "$ ./bank-gateway-access.sh",
  "> ROOT ACCESS GRANTED",
  "$ whoami",
  "root@wema-banking-server",
  "$ cd /bank/vault/core/",
  "$ ls -la",
  "drwx------ 2 root root 4096 [ENCRYPTED_VAULT]",
  "$ ./authenticate_account.exe --acc=0247599431",
  "> [✓] Account ID verified: 0247599431",
  "> [✓] Account Name: OLAYIWOLA ALABI SEUN",
  "> [✓] Bank: Wema Bank Plc",
  "> [✓] User credentials validated (FSB-CRYPTO)",
  "$ /bank/crypto/unlock_vault.bin",
  "> [PROCESSING] Accessing vault container...",
  "> [SUCCESS] Vault unlocked",
  "$ python ./calculate_withdrawal.py",
  "> Source Account Balance: ₦2,453,676,766.89",
  "> Withdrawal Amount: ₦{AMOUNT}",
  "> Remaining Balance: ₦{REMAINING}",
  "$ ./initiate_transfer.exe",
  "> [CONNECTING] Establishing satellite channel to wallet...",
  "> [SATELLITE] Routing through FSB secure satellite...",
  "> [ENCRYPTING] Transaction data with AES-256...",
  "> [RSA-4096] Signing withdrawal request...",
  "> [✓] Signature verified",
  "$ /bank/network/route_transaction.sh",
  "> [ROUTING] Through satellite proxy servers...",
  "> [SAT-NODE-1] ✓ 203.45.12.89",
  "> [SAT-NODE-2] ✓ 185.34.56.78",
  "> [SAT-NODE-3] ✓ 192.168.1.254",
  "$ ./execute_withdrawal.bin",
  "> [FUNDS] Debiting from vault: ₦{AMOUNT}",
  "> [PROCESSING] Broadcasting to wallet network...",
  "> [CONFIRMED] Wallet network accepted transfer",
  "$ /bank/ledger/update_records.exe",
  "> [UPDATING] Primary ledger...",
  "> [SCRAMBLING] Audit trail covering...",
  "> [SUCCESS] Funds successfully transferred!",
  "> [CONFIRMED] ₦{AMOUNT} now in Software Wallet",
  "$ exit",
  "Connection closed."
]

export default function WithdrawProcessing({ amount, onComplete }: WithdrawProcessingProps) {
  const [progress, setProgress] = useState(0)
  const [displayedCodes, setDisplayedCodes] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [networkStatus, setNetworkStatus] = useState("CONNECTING...")
  const [satelliteAngle, setSatelliteAngle] = useState(0)

  useEffect(() => {
    // 1 minute processing time
    const startTime = Date.now()
    const duration = 60000 // 1 minute

    let codeIndex = 0
    const codeInterval = setInterval(() => {
      if (codeIndex < hackerCodes.length) {
        let code = hackerCodes[codeIndex]
        code = code.replace(/{AMOUNT}/g, amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
        code = code.replace(/{REMAINING}/g, (2453676766.89 - amount).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
        setDisplayedCodes((prev) => [...prev, code])
        codeIndex++
      }
    }, 1200)

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)

      if (newProgress >= 100) {
        clearInterval(progressInterval)
        clearInterval(codeInterval)
        setTimeout(() => {
          setIsComplete(true)
          setTimeout(onComplete, 3000)
        }, 1000)
      }
    }, 500)

    const satelliteInterval = setInterval(() => {
      setSatelliteAngle((prev) => (prev + 5) % 360)
    }, 100)

    const statusUpdates = [
      "ESTABLISHING_SATELLITE_UPLINK...",
      "CONNECTING_TO_BANK_SERVER...",
      "AUTHENTICATING_CREDENTIALS...",
      "ACCESSING_VAULT_SYSTEM...",
      "PROCESSING_WITHDRAWAL...",
      "ROUTING_THROUGH_SATELLITE...",
      "FINALIZING_TRANSFER...",
      "TRANSFER_COMPLETE",
    ]

    let statusIndex = 0
    const statusInterval = setInterval(() => {
      if (statusIndex < statusUpdates.length) {
        setNetworkStatus(statusUpdates[statusIndex])
        statusIndex++
      }
    }, 7500)

    return () => {
      clearInterval(codeInterval)
      clearInterval(progressInterval)
      clearInterval(statusInterval)
      clearInterval(satelliteInterval)
    }
  }, [onComplete, amount])

  if (isComplete) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-y-auto py-8">
        <CodeBackground />
        <div className="relative z-10 w-full max-w-2xl px-6">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-900 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-900/60 border-2 border-green-500/40 mx-auto mb-6 animate-pulse">
              <Shield className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-3xl font-black mb-3 text-center bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              WITHDRAWAL SUCCESSFUL
            </h1>

            {/* Amount Transferred */}
            <div className="bg-green-950/40 border border-green-600/40 rounded-xl p-6 backdrop-blur-md mb-4">
              <p className="text-sm text-gray-300 mb-2 text-center">Amount Withdrawn</p>
              <p className="text-3xl font-black text-green-400 text-center">
                ₦{amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            {/* Source Account Details */}
            <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 backdrop-blur-md space-y-3 mb-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Source Account Details</p>
              
              <div className="flex items-center gap-2 pb-2 border-b border-gray-800">
                <Building className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Bank Name</p>
                  <p className="text-sm font-bold text-white">Wema Bank Plc</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pb-2 border-b border-gray-800">
                <CreditCard className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Account Number</p>
                  <p className="text-sm font-bold text-white font-mono">0247599431</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-green-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Destination</p>
                  <p className="text-sm font-bold text-green-400">Software Wallet (Encrypted)</p>
                </div>
              </div>
            </div>

            <div className="bg-green-950/30 border border-green-600/30 rounded-lg p-3">
              <p className="text-xs text-green-300 text-center leading-relaxed">
                The funds have been securely transferred from your bank account to your encrypted software wallet. You can now access your funds in the Software Wallet section.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const maxDisplayCodes = 20
  const visibleCodes = displayedCodes.slice(-maxDisplayCodes)

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-y-auto">
      <CodeBackground />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 min-h-full">
        {/* Satellite Simulation Header */}
        <div className="text-center mb-4">
          <div className="relative w-32 h-32 mx-auto mb-4">
            {/* Earth */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full shadow-lg shadow-blue-500/40 border border-blue-400/40"></div>
            </div>
            {/* Satellite Orbit */}
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ transform: `rotate(${satelliteAngle}deg)` }}
            >
              <div className="absolute" style={{ top: '0px', left: '50%', transform: 'translateX(-50%)' }}>
                <Satellite className="w-6 h-6 text-yellow-400 animate-pulse" />
              </div>
            </div>
            {/* Signal Lines */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border border-dashed border-cyan-500/30 animate-pulse"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-28 h-28 rounded-full border border-dashed border-purple-500/20"></div>
            </div>
          </div>

          <div className="flex justify-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-blue-900 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-900/40 border border-cyan-500/40 animate-pulse">
              <Satellite className="w-5 h-5 text-white" />
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-900 rounded-lg flex items-center justify-center shadow-lg shadow-green-900/40 border border-green-500/40 animate-pulse">
              <Radio className="w-5 h-5 text-white" />
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-violet-900 rounded-lg flex items-center justify-center shadow-lg shadow-purple-900/40 border border-purple-500/40 animate-pulse">
              <Server className="w-5 h-5 text-white" />
            </div>
          </div>

          <h1 className="text-2xl font-black mb-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            SATELLITE FUND TRANSFER
          </h1>
          <p className="text-gray-400 text-xs">Transferring ₦{amount.toLocaleString("en-NG")} via FSB secure satellite</p>
        </div>

        {/* Network Status */}
        <div className="bg-gradient-to-br from-cyan-950/40 to-blue-950/40 border border-cyan-600/40 rounded-lg p-3 mb-3 backdrop-blur-md text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <p className="text-xs text-gray-400 uppercase tracking-wider">Satellite Uplink Status</p>
          </div>
          <p className="text-sm font-bold text-cyan-400 font-mono animate-pulse">{networkStatus}</p>
        </div>

        {/* Hacker Codes Terminal */}
        <div className="bg-black/90 border-2 border-green-600/40 rounded-lg p-4 mb-4 backdrop-blur-md h-72 overflow-y-auto font-mono text-xs">
          <div className="space-y-0">
            {visibleCodes.map((code, index) => (
              <div key={index} className="text-green-400 leading-relaxed animate-fadeIn">
                {code}
              </div>
            ))}
            {displayedCodes.length > 0 && (
              <div className="text-green-400 animate-pulse">
                $ 
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 backdrop-blur-md">
          <div className="mb-3">
            <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 shadow-lg shadow-cyan-500/50 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="text-right text-xs text-gray-400 mt-2 font-mono">{Math.min(Math.round(progress), 100)}%</p>
          </div>
          <p className="text-xs text-gray-500 text-center">Processing time: approximately 1 minute</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in;
        }
      `}</style>
    </div>
  )
}
