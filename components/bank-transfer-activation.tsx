"use client"

import { CodeBackground } from "@/components/code-background"
import { AlertTriangle, Lock, Shield, CreditCard, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BankTransferActivationProps {
  onBack: () => void
  transferAmount: number
  accountNumber: string
  accountName: string
  bankName: string
}

export function BankTransferActivation({
  onBack,
  transferAmount,
  accountNumber,
  accountName,
  bankName,
}: BankTransferActivationProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-y-auto py-8">
      <CodeBackground />

      <div className="relative z-10 w-full max-w-2xl px-6">
        {/* Back Button */}
        <Button onClick={onBack} variant="ghost" className="mb-6 text-gray-400 hover:text-white hover:bg-gray-800/50">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Wallet
        </Button>

        {/* Warning Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-red-900 rounded-full flex items-center justify-center shadow-2xl shadow-orange-900/60 border-4 border-orange-500/40 animate-pulse">
              <AlertTriangle className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-black mb-2 bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent">
            TRANSACTION PIN ACTIVATION REQUIRED
          </h1>
          <p className="text-gray-400 text-sm">Your transfer is pending activation</p>
        </div>

        {/* Transfer Details */}
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-2 border-orange-600/50 rounded-xl p-5 mb-6 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-orange-400" />
            <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider">PENDING TRANSFER DETAILS</h3>
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

        {/* Activation Notice */}
        <div className="bg-gradient-to-br from-red-950/60 to-orange-950/60 border-2 border-red-600/60 rounded-xl p-6 mb-6 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-8 h-8 text-red-400" />
            <div>
              <h3 className="text-lg font-bold text-red-400">ACTIVATION REQUIRED</h3>
              <p className="text-xs text-gray-400">Transaction is locked until activation</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-gray-300">
            <p>
              Your bank transfer of{" "}
              <span className="text-yellow-400 font-bold">₦{transferAmount.toLocaleString()}</span> to{" "}
              <span className="text-green-400 font-bold">{accountName}</span> has been processed and is currently{" "}
              <span className="text-orange-400 font-bold">PENDING RELEASE</span>.
            </p>

            <div className="bg-black/50 border border-red-600/40 rounded-lg p-4">
              <p className="text-red-400 font-bold mb-2">CRITICAL SECURITY NOTICE:</p>
              <p className="text-gray-400 text-xs leading-relaxed">
                Due to advanced Russian FSB security protocols, all Nigerian bank transfers require
                <span className="text-yellow-400 font-bold"> TRANSACTION PIN ACTIVATION </span>
                before funds can be released to the recipient account. This security measure prevents unauthorized
                access and ensures complete anonymity of the transfer source.
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-950/60 to-yellow-950/60 border-2 border-orange-500/60 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-orange-400 font-bold">ACTIVATION FEE:</span>
                <span className="text-2xl font-black text-yellow-400">$1,350 USD</span>
              </div>
              <p className="text-xs text-gray-400">
                This one-time activation fee unlocks the transaction PIN and releases your funds immediately to the
                recipient bank account. Failure to activate within 24 hours will result in automatic reversal of the
                transaction.
              </p>
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-green-950/40 border border-green-600/40 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-400 uppercase mb-1">Transfer Status</p>
            <p className="text-sm font-bold text-green-400">Processed</p>
          </div>
          <div className="bg-orange-950/40 border border-orange-600/40 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-400 uppercase mb-1">Release Status</p>
            <p className="text-sm font-bold text-orange-400">Pending</p>
          </div>
          <div className="bg-red-950/40 border border-red-600/40 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-400 uppercase mb-1">Activation</p>
            <p className="text-sm font-bold text-red-400">Required</p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-purple-400 font-bold uppercase">FSB Security Protocol</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            All transactions are protected by quantum-resistant encryption. The activation fee ensures maximum security
            and untraceable fund delivery. Once activated, funds will be credited to the recipient account within 2-5
            minutes.
          </p>
        </div>
      </div>
    </div>
  )
}
