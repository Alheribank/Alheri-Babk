"use client"

import { CodeBackground } from "@/components/code-background"
import { AlertTriangle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface BitcoinActivationProps {
  bitcoinAmount: string
  bitcoinAddress: string
  onBack: () => void
}

export default function BitcoinActivation({ bitcoinAmount, bitcoinAddress, onBack }: BitcoinActivationProps) {
  const [activationCode, setActivationCode] = useState("")
  const [error, setError] = useState("")
  const [completed, setCompleted] = useState(false)

  const handleActivate = () => {
    setError("")

    if (!activationCode.trim()) {
      setError("Please enter the activation code")
      return
    }

    if (activationCode.length < 6) {
      setError("Activation code must be at least 6 characters")
      return
    }

    // Simulate activation
    setCompleted(true)
  }

  if (completed) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <CodeBackground />

        <div className="relative z-10 text-center max-w-2xl px-6">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-900 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-900/60 border-2 border-green-500/40 mx-auto mb-6">
              <Lock className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              TRANSFER COMPLETE
            </h1>

            <p className="text-xl text-gray-300 mb-2">Successfully transferred {bitcoinAmount} BTC</p>
            <p className="text-sm text-gray-400 font-mono break-all">{bitcoinAddress}</p>
          </div>

          <div className="bg-green-950/30 border border-green-600/30 rounded-xl p-6 mb-8 backdrop-blur-md text-left space-y-3">
            <p className="text-sm text-green-300">✓ Bitcoin activation completed successfully</p>
            <p className="text-sm text-green-300">✓ Funds transferred to your wallet</p>
            <p className="text-sm text-green-300">✓ Transaction will appear in 10-30 minutes</p>
          </div>

          <Button
            onClick={onBack}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-6 rounded-xl text-lg shadow-2xl shadow-green-900/40 border-2 border-green-500/40"
          >
            Return to Wallet
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <CodeBackground />

      <div className="relative z-10 text-center max-w-2xl px-6">
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-600 to-orange-900 rounded-2xl flex items-center justify-center shadow-2xl shadow-yellow-900/60 border-2 border-yellow-500/40 mx-auto mb-6">
            <AlertTriangle className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            ACTIVATION REQUIRED
          </h1>

          <p className="text-lg text-gray-300 mb-2">Bitcoin Transfer Pending Activation</p>
        </div>

        <div className="bg-yellow-950/30 border border-yellow-600/30 rounded-xl p-6 mb-8 backdrop-blur-md text-left">
          <p className="text-sm text-yellow-200 mb-4">
            Your Bitcoin transfer is ready but requires final activation to complete. This security measure ensures only
            authorized transfers are processed.
          </p>

          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold mt-1">•</span>
              <span className="text-gray-300">
                Transfer Amount: <span className="text-yellow-300 font-mono">{bitcoinAmount} BTC</span>
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold mt-1">•</span>
              <span className="text-gray-300">
                Destination: <span className="text-yellow-300 font-mono text-xs break-all">{bitcoinAddress}</span>
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold mt-1">•</span>
              <span className="text-gray-300">
                Status: <span className="text-yellow-300 font-bold">PENDING ACTIVATION</span>
              </span>
            </div>
            <div className="flex items-start gap-3 bg-orange-900/30 border border-orange-600/40 rounded-lg p-3 mt-4">
              <span className="text-orange-400 font-bold text-lg">⚠</span>
              <div>
                <p className="text-orange-300 font-semibold">Activation Fee Required: $550</p>
                <p className="text-orange-200 text-xs mt-1">
                  This fee will be deducted from your wallet balance to complete the Bitcoin transfer
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 mb-6 backdrop-blur-md space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
              Enter Activation Code
            </label>
            <input
              type="text"
              value={activationCode}
              onChange={(e) => setActivationCode(e.target.value)}
              placeholder="Enter your 6-digit activation code"
              className="w-full bg-black/60 border-gray-700 text-white text-lg font-mono px-4 py-3 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 border"
            />
            <p className="text-xs text-gray-500 mt-2">Check your email or authentication app for the activation code</p>
          </div>

          {error && (
            <div className="bg-red-950/40 border border-red-600/40 rounded-lg p-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <Button
            onClick={handleActivate}
            disabled={!activationCode.trim()}
            className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-6 rounded-xl text-lg shadow-2xl shadow-yellow-900/40 border-2 border-yellow-500/40 disabled:opacity-50"
          >
            Activate Transfer
          </Button>

          <Button
            onClick={onBack}
            variant="ghost"
            className="w-full text-gray-400 hover:text-white hover:bg-gray-800/50"
          >
            Cancel
          </Button>
        </div>

        <p className="text-xs text-gray-500">
          This is a security measure to protect your Bitcoin transfer. Your funds are secure.
        </p>
      </div>
    </div>
  )
}
