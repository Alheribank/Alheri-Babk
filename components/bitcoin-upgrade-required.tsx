"use client"

import { CodeBackground } from "@/components/code-background"
import { AlertTriangle, Lock, ArrowLeft, ShieldAlert, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BitcoinUpgradeRequiredProps {
  bitcoinAmount: string
  bitcoinAddress: string
  nairaAmount: string
  onBack: () => void
}

export default function BitcoinUpgradeRequired({
  bitcoinAmount,
  bitcoinAddress,
  nairaAmount,
  onBack,
}: BitcoinUpgradeRequiredProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-between overflow-y-auto py-8">
      <CodeBackground />

      <div className="relative z-10 w-full max-w-2xl px-4 flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-pink-900 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/40 border border-red-500/40">
              <ShieldAlert className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-black mb-1 bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
            WALLET UPGRADE REQUIRED
          </h1>
          <p className="text-gray-400 text-xs">Security verification needed to complete transfer</p>
        </div>

        {/* Transaction Details */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 mb-4 backdrop-blur-md">
          <h3 className="text-xs font-bold text-gray-300 mb-3 uppercase tracking-wider">Pending Transaction</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-xs text-gray-400">Amount</p>
              <p className="text-xs font-semibold text-white">₦{Number.parseFloat(nairaAmount).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({bitcoinAmount} BTC)</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs text-gray-400">Destination</p>
              <p className="text-xs font-mono text-gray-300 break-all">{bitcoinAddress.slice(0, 20)}...</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs text-gray-400">Status</p>
              <p className="text-xs font-semibold text-yellow-400">PENDING UPGRADE</p>
            </div>
          </div>
        </div>

        {/* Warning Box */}
        <div className="bg-red-950/30 border-2 border-red-600/50 rounded-lg p-4 mb-4 backdrop-blur-md">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-red-400 mb-2">Wallet Security Update</p>
              <p className="text-xs text-red-300 leading-relaxed">
                Your wallet has been flagged by our security system for potential unauthorized access attempts. To protect your funds and enable transfers to external wallets, a mandatory security upgrade is required.
              </p>
            </div>
          </div>
        </div>

        {/* Upgrade Details */}
        <div className="bg-blue-950/30 border border-blue-600/40 rounded-lg p-4 mb-4 backdrop-blur-md">
          <div className="flex items-start gap-3 mb-3">
            <Lock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-blue-300">Premium Security Upgrade</p>
            </div>
          </div>
          <div className="space-y-2 ml-8">
            <p className="text-xs text-blue-200">Includes:</p>
            <ul className="text-xs text-blue-300 space-y-1">
              <li>• Multi-factor authentication layer</li>
              <li>• Quantum-resistant encryption upgrade</li>
              <li>• Real-time threat monitoring</li>
              <li>• Unlimited transfer capability</li>
            </ul>
          </div>
        </div>

        {/* Cost Box */}
        <div className="bg-gradient-to-br from-yellow-950/40 to-orange-950/40 border-2 border-yellow-600/40 rounded-lg p-5 mb-6 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-yellow-400" />
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Upgrade Cost</p>
                <p className="text-2xl font-black text-yellow-400">$740</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 mb-1">One-time fee</p>
              <p className="text-xs text-yellow-300 font-semibold">Valid for life</p>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-3 mb-6">
          <p className="text-xs text-gray-300 leading-relaxed">
            <strong>Note:</strong> This upgrade is mandatory for transfers to external wallets. The $740 fee will be deducted from your wallet balance upon upgrade completion. Without this upgrade, your current transaction cannot be processed.
          </p>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-2xl px-4 space-y-3">
        <Button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-3 rounded-lg border border-yellow-500/40 shadow-lg shadow-yellow-900/40">
          <DollarSign className="w-4 h-4 mr-2" />
          Proceed with $740 Upgrade
        </Button>
        <Button
          onClick={onBack}
          variant="outline"
          className="w-full bg-gray-900/60 border-gray-700 text-white hover:bg-gray-800 hover:border-gray-600 py-3 font-bold"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Cancel Transaction
        </Button>
      </div>

      <div className="relative z-10 w-full max-w-2xl px-4 mt-4">
        <p className="text-xs text-gray-500 text-center">
          This upgrade is provided by FSB Cyber Security Division. All transactions are protected under international cybersecurity protocols.
        </p>
      </div>
    </div>
  )
}
