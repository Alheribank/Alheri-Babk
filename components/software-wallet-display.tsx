"use client"

import { CodeBackground } from "@/components/code-background"
import { Wallet, ArrowLeft, Clock, Shield, TrendingUp, Bitcoin, ArrowDownLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { BitcoinTransfer } from "@/components/bitcoin-transfer"

interface BitcoinTransferRecord {
  amount: number
  address: string
  date: string
}

interface SoftwareWalletDisplayProps {
  onBack: () => void
  walletBalance: number
  bitcoinTransfers?: BitcoinTransferRecord[]
  onBitcoinTransferComplete?: (amount: number, bitcoinAddress: string) => void
}

export function SoftwareWalletDisplay({ 
  onBack, 
  walletBalance,
  bitcoinTransfers = [],
  onBitcoinTransferComplete
}: SoftwareWalletDisplayProps) {
  const [showBitcoinTransfer, setShowBitcoinTransfer] = useState(false)

  const handleBitcoinTransferComplete = (amount: number, bitcoinAddress: string) => {
    if (onBitcoinTransferComplete) {
      onBitcoinTransferComplete(amount, bitcoinAddress)
    }
    setShowBitcoinTransfer(false)
  }

  if (showBitcoinTransfer) {
    return <BitcoinTransfer 
      onBack={() => setShowBitcoinTransfer(false)} 
      walletBalance={walletBalance}
      onTransferComplete={handleBitcoinTransferComplete}
    />
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-between overflow-y-auto py-8">
      <CodeBackground />

      <div className="relative z-10 w-full max-w-2xl px-4 flex-1 flex flex-col">
        <div className="text-center mb-4">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-900 rounded-xl flex items-center justify-center shadow-lg shadow-purple-900/40 border border-purple-500/40 animate-pulse">
              <Wallet className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-xl font-black mb-1 bg-gradient-to-r from-purple-400 via-violet-500 to-purple-600 bg-clip-text text-transparent">
            SOFTWARE WALLET BALANCE
          </h1>
          <p className="text-gray-400 text-xs">Secure Russian FSB Encrypted Wallet System</p>
        </div>

        {/* Available Funds */}
        <div className="bg-gradient-to-br from-purple-950/40 to-violet-950/40 border border-purple-600/40 rounded-lg p-4 mb-4 backdrop-blur-md text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-violet-600/10 animate-pulse"></div>
          <div className="relative z-10">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Available Funds</p>
            <p className="text-3xl font-black text-purple-400 mb-1">
              ₦{walletBalance.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-gray-500 font-mono">Encrypted Wallet Balance</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-3 backdrop-blur-md text-center">
            <Shield className="w-4 h-4 text-green-400 mx-auto mb-1" />
            <p className="text-xs text-gray-400 mb-0.5">Security</p>
            <p className="text-xs font-bold text-green-400">FSB Grade</p>
          </div>
          <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-3 backdrop-blur-md text-center">
            <Clock className="w-4 h-4 text-blue-400 mx-auto mb-1" />
            <p className="text-xs text-gray-400 mb-0.5">Status</p>
            <p className="text-xs font-bold text-blue-400">Active</p>
          </div>
          <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-3 backdrop-blur-md text-center">
            <TrendingUp className="w-4 h-4 text-purple-400 mx-auto mb-1" />
            <p className="text-xs text-gray-400 mb-0.5">Type</p>
            <p className="text-xs font-bold text-purple-400">Encrypted</p>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 backdrop-blur-md mb-4">
          <h3 className="text-xs font-bold text-gray-300 mb-3 uppercase tracking-wider">Transaction History</h3>
          {bitcoinTransfers.length > 0 || walletBalance > 0 ? (
            <div className="space-y-2">
              {/* Bitcoin Transfers */}
              {bitcoinTransfers.map((transfer, idx) => (
                <div key={idx} className="flex items-center justify-between pb-2 border-b border-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-orange-600/20 rounded-full flex items-center justify-center border border-orange-500/30">
                      <ArrowDownLeft className="w-3 h-3 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Bitcoin Transfer</p>
                      <p className="text-xs text-gray-500">{transfer.date}</p>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-red-400">
                    -₦{transfer.amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              ))}

              {/* Initial Deposit */}
              {walletBalance > 0 && (
                <div className="flex items-center justify-between pb-2 border-b border-gray-800">
                  <div>
                    <p className="text-xs font-semibold text-white">Initial Wallet Deposit</p>
                    <p className="text-xs text-gray-500">From account withdrawal</p>
                  </div>
                  <p className="text-xs font-bold text-green-400">
                    +₦{walletBalance.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-gray-500 text-center py-3">No transactions yet</p>
          )}
        </div>

        <div className="space-y-3 mb-6">
          <Button
            onClick={() => setShowBitcoinTransfer(true)}
            className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white font-bold py-3 rounded-lg text-sm shadow-lg shadow-orange-900/40 border border-orange-500/40"
          >
            <Bitcoin className="w-4 h-4 mr-2" />
            Transfer to Bitcoin Wallet
          </Button>
        </div>

        <div className="bg-purple-950/30 border border-purple-600/30 rounded-lg p-3 mb-6">
          <p className="text-xs text-purple-300 text-center leading-relaxed">
            All funds are secured using quantum-resistant encryption developed by Russian FSB cyber division. Wallet is anonymous and untraceable.
          </p>
        </div>
      </div>

      <Button onClick={onBack} className="w-11/12 max-w-2xl bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-3 rounded-lg border border-gray-700 hover:border-purple-500 mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Arsenal
      </Button>
    </div>
  )
}
