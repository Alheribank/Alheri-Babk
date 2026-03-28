"use client"

import { CodeBackground } from "@/components/code-background"
import { useEffect, useState } from "react"
import { Bitcoin, ArrowRight } from "lucide-react"

interface BitcoinTransferLoadingProps {
  bitcoinAmount: string
  bitcoinAddress: string
  onComplete: () => void
  walletBalance: number
  nairaAmount?: string
}

export default function BitcoinTransferLoading({ bitcoinAmount, bitcoinAddress, onComplete, walletBalance, nairaAmount = "0" }: BitcoinTransferLoadingProps) {
  const [progress, setProgress] = useState(0)
  const [displayedBalance, setDisplayedBalance] = useState(walletBalance)
  const [receivedAmount, setReceivedAmount] = useState(0)
  const nairaNum = Number.parseFloat(nairaAmount.replace(/,/g, "")) || 0

  useEffect(() => {
    // 2 minute timer (120 seconds)
    const startTime = Date.now()
    const duration = 120000 // 2 minutes in milliseconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)

      // Deduct from source wallet
      const deductedAmount = walletBalance - (walletBalance * (newProgress / 100) * 0.95)
      setDisplayedBalance(Math.max(deductedAmount, 0))

      // Add to destination wallet
      const received = nairaNum * (newProgress / 100)
      setReceivedAmount(received)

      if (newProgress >= 100) {
        clearInterval(interval)
        setTimeout(onComplete, 500)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [onComplete, walletBalance, nairaNum])

  const hackingLines = [
    "> SYSTEM ACCESS GRANTED",
    "> $ whoami",
    "> root@secure-wallet-server",
    "> $ sudo bitcoin-transfer-init",
    "> [ROOT] Initiating secure wallet transfer...",
    "> [*] Connecting to Trust Wallet network...",
    "> [+] Connection established (172.45.23.18)",
    "> [*] Authenticating user credentials...",
    "> [SUCCESS] User verified - ID: FSB-CRYPTO-2024",
    "> [*] Loading encrypted wallet data...",
    "> [+] Source Wallet Balance: ₦" + walletBalance.toLocaleString("en-NG"),
    "> [*] Initializing transfer protocol...",
    "> [PROCESSING] Encrypting transaction data (RSA-4096)",
    "> [PROCESSING] Signing transaction with private key...",
    "> [+] Transaction signature verified",
    "> [*] Routing through secure blockchain nodes...",
    "> [*] Node 1: 203.45.12.89 - Connected",
    "> [*] Node 2: 185.34.56.78 - Connected",
    "> [*] Node 3: 192.168.1.254 - Connected",
    "> [VERIFYING] Bitcoin address: " + bitcoinAddress.slice(0, 15) + "...",
    "> [VERIFY] Address is whitelisted",
    "> [*] Amount to transfer: ₦" + nairaNum.toLocaleString("en-NG"),
    "> [*] BTC equivalent: " + bitcoinAmount + " BTC",
    "> [PROCESSING] Deducting from source wallet...",
    "> [+] Deduction complete",
    "> [*] Checking network consensus...",
    "> [SYNCING] Updating ledger entries across 1,247 nodes...",
    "> [SYNCING] Block height: 847,392",
    "> [*] Transaction mempool status: PENDING",
    "> [PROCESSING] Broadcasting transaction to network...",
    "> [+] Transaction broadcast successful",
    "> [*] Finalizing transaction signature...",
    "> [+] All security checks passed",
    "> [COMPLETE] Transfer initialized successfully",
  ]

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
      <CodeBackground />

      <div className="relative z-10 w-full max-w-5xl px-6 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-yellow-900 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-900/60 border-2 border-orange-500/40 mx-auto mb-4 animate-pulse">
            <Bitcoin className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black mb-2 bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
            PROCESSING BITCOIN TRANSFER
          </h1>
          <p className="text-sm text-gray-500">Transferring {bitcoinAmount} BTC to destination wallet</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Source Wallet */}
          <div className="bg-gradient-to-br from-red-950/40 to-orange-950/40 border border-red-600/40 rounded-lg p-4 backdrop-blur-md">
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Source Wallet</p>
            <p className="text-lg font-black text-red-400 mb-2">
              ₦{displayedBalance.toLocaleString("en-NG", { maximumFractionDigits: 0 })}
            </p>
            <div className="text-xs text-gray-500 font-mono truncate">Software Wallet</div>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center">
            <div className="text-center">
              <ArrowRight className="w-6 h-6 text-orange-500 mx-auto mb-2 animate-pulse" />
              <p className="text-xs text-gray-400">{Math.round(progress)}%</p>
            </div>
          </div>

          {/* Destination Wallet */}
          <div className="bg-gradient-to-br from-green-950/40 to-emerald-950/40 border border-green-600/40 rounded-lg p-4 backdrop-blur-md">
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Destination Wallet</p>
            <p className="text-lg font-black text-green-400 mb-2">
              ₦{receivedAmount.toLocaleString("en-NG", { maximumFractionDigits: 0 })}
            </p>
            <div className="text-xs text-gray-500 font-mono truncate">Trust Wallet</div>
          </div>
        </div>

        {/* Terminal Output */}
        <div className="bg-black/90 border-2 border-orange-600/40 rounded-lg p-4 mb-6 backdrop-blur-md font-mono text-xs h-56 overflow-y-auto">
          <div className="space-y-1">
            {hackingLines.map((line, idx) => (
              <div
                key={idx}
                className={`text-left ${
                  idx < Math.floor((progress / 100) * hackingLines.length)
                    ? "text-green-400"
                    : "text-gray-700"
                }`}
              >
                {idx < Math.floor((progress / 100) * hackingLines.length) && (
                  <span>{line}</span>
                )}
              </div>
            ))}
            {Math.floor((progress / 100) * hackingLines.length) >= hackingLines.length && (
              <div className="text-green-400">$ _</div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 backdrop-blur-md">
          <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
            <div
              className="h-full bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 shadow-lg shadow-orange-500/50 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-right text-xs text-gray-400 mt-2">{Math.min(Math.round(progress), 100)}%</p>
        </div>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Processing takes approximately 2 minutes. Please do not close this window.
        </p>
      </div>
    </div>
  )
}
