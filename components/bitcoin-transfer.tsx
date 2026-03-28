import { CodeBackground } from "@/components/code-background"
import { ArrowLeft, Bitcoin, AlertTriangle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import BitcoinTransferLoading from "@/components/bitcoin-transfer-loading"

interface BitcoinTransferProps {
  onBack: () => void
  walletBalance: number
  onTransferComplete?: (amount: number, bitcoinAddress: string) => void
}

export function BitcoinTransfer({ onBack, walletBalance, onTransferComplete }: BitcoinTransferProps) {
  const [bitcoinAddress, setBitcoinAddress] = useState("")
  const [nairaAmount, setNairaAmount] = useState("")
  const BITCOIN_RATE = 69345.00
  const NAIRA_TO_USD_RATE = 1630
  const [bitcoinAmount, setBitcoinAmount] = useState("")
  const [error, setError] = useState("")
  const [transferring, setTransferring] = useState(false)
  const [processingStage, setProcessingStage] = useState<"form" | "processing" | "complete">("form")

  const handleNairaChange = (value: string) => {
    const cleanValue = value.replace(/[^\d.]/g, "")
    setNairaAmount(cleanValue)
    setError("")

    if (cleanValue) {
      const nairaNum = Number.parseFloat(cleanValue)

      if (nairaNum > walletBalance) {
        setError(`Insufficient wallet balance. Available: ₦${walletBalance.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`)
        setBitcoinAmount("")
        return
      }

      // Convert NGN to USD to BTC
      const usdAmount = nairaNum / NAIRA_TO_USD_RATE
      const btcAmount = usdAmount / BITCOIN_RATE
      setBitcoinAmount(btcAmount.toFixed(8))
    } else {
      setBitcoinAmount("")
    }
  }

  const handleTransfer = () => {
    setError("")

    if (!bitcoinAddress.trim()) {
      setError("Please enter a valid Bitcoin address")
      return
    }

    if (!nairaAmount || Number.parseFloat(nairaAmount) <= 0) {
      setError("Please enter a valid amount")
      return
    }

    if (Number.parseFloat(nairaAmount) > walletBalance) {
      setError("Insufficient wallet balance")
      return
    }

    setProcessingStage("processing")
    setTransferring(true)
  }

  if (processingStage === "processing") {
    return (
      <BitcoinTransferLoading 
        bitcoinAmount={bitcoinAmount} 
        bitcoinAddress={bitcoinAddress}
        walletBalance={walletBalance}
        nairaAmount={nairaAmount}
        onComplete={() => setProcessingStage("complete")} 
      />
    )
  }

  if (processingStage === "complete") {
    const transferredAmount = Number.parseFloat(nairaAmount.replace(/,/g, "")) || 0
    const remainingBalance = walletBalance - transferredAmount

    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-y-auto py-8">
        <CodeBackground />

        <div className="relative z-10 w-full max-w-2xl px-4">
          {/* Success Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-900 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-900/60 border-2 border-green-500/40 mx-auto mb-4 animate-pulse">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-black mb-2 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              TRANSFER SUCCESSFUL
            </h1>
            <p className="text-gray-400 text-sm">Funds transferred to Bitcoin wallet</p>
          </div>

          {/* Transfer Details */}
          <div className="bg-green-950/40 border border-green-600/40 rounded-xl p-6 mb-6 backdrop-blur-md space-y-4">
            {/* Amount Transferred */}
            <div className="border-b border-green-600/30 pb-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Amount Transferred</p>
              <p className="text-2xl font-black text-green-400">
                ₦{transferredAmount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            {/* Bitcoin Amount */}
            <div className="border-b border-green-600/30 pb-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Bitcoin Amount</p>
              <p className="text-lg font-bold text-green-300">{bitcoinAmount} BTC</p>
            </div>

            {/* Destination Address */}
            <div className="border-b border-green-600/30 pb-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Destination Wallet</p>
              <p className="text-xs font-mono text-green-300 break-all">{bitcoinAddress}</p>
            </div>

            {/* Remaining Balance */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Software Wallet Balance</p>
              <p className="text-2xl font-black text-green-400">
                ₦{remainingBalance.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-gray-500 mt-1">Previously: ₦{walletBalance.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 mb-6">
            <p className="text-xs text-gray-300 leading-relaxed">
              <strong>Transfer Status:</strong> The funds have been successfully deducted from your software wallet and transferred to the Bitcoin wallet address using quantum-encrypted protocols. The transaction is now irreversible and permanently recorded on the blockchain.
            </p>
          </div>

          {/* Back Button */}
          <Button onClick={() => {
            if (onTransferComplete) {
              onTransferComplete(transferredAmount, bitcoinAddress)
            }
            onBack()
          }} className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-3 rounded-lg border border-gray-700 hover:border-green-500">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Wallet
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-y-auto py-8">
      <CodeBackground />

      <div className="relative z-10 w-full max-w-2xl px-4">

        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-yellow-900 rounded-xl flex items-center justify-center shadow-lg shadow-orange-900/40 border border-orange-500/40">
              <Bitcoin className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-xl font-black mb-1 bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
            BITCOIN TRANSFER
          </h1>
          <p className="text-gray-400 text-xs">Transfer funds to Bitcoin wallet</p>
        </div>

        {/* Current Exchange Rate */}
        <div className="bg-gradient-to-br from-yellow-950/40 to-orange-950/40 border border-yellow-600/40 rounded-lg p-4 mb-4 backdrop-blur-md text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Current Bitcoin Rate</p>
          <p className="text-2xl font-black text-yellow-400">
            ${BITCOIN_RATE.toFixed(2)} per BTC
          </p>
        </div>

        {/* Wallet Balance */}
        <div className="bg-gradient-to-br from-purple-950/40 to-violet-950/40 border border-purple-600/40 rounded-lg p-4 mb-4 backdrop-blur-md text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Available Wallet Balance</p>
          <p className="text-2xl font-black text-purple-400">
            ₦{walletBalance.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        {/* Transfer Form */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 backdrop-blur-md mb-4 space-y-3">
          {/* Bitcoin Address Input */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1 uppercase tracking-wider">
              Bitcoin Wallet Address
            </label>
            <input
              type="text"
              value={bitcoinAddress}
              onChange={(e) => setBitcoinAddress(e.target.value)}
              placeholder="Enter Bitcoin wallet address"
              className="w-full bg-black/60 border border-gray-700 text-white font-mono text-xs px-3 py-2 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
            />
          </div>

          {/* Naira Amount Input */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1 uppercase tracking-wider">
              Amount in Nigerian Naira (₦)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-500">₦</span>
              <input
                type="text"
                value={nairaAmount}
                onChange={(e) => handleNairaChange(e.target.value)}
                placeholder="0.00"
                className="w-full bg-black/60 border border-gray-700 text-white text-lg font-bold pl-8 pr-3 py-2 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
              />
            </div>
          </div>

          {/* Bitcoin Amount Display */}
          {bitcoinAmount && (
            <div className="bg-orange-950/40 border border-orange-600/40 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">You will transfer</p>
              <p className="text-xl font-black text-orange-400">{bitcoinAmount} BTC</p>
            </div>
          )}

          {error && (
            <div className="bg-red-950/40 border border-red-600/40 rounded-lg p-2 flex items-center gap-2">
              <AlertTriangle className="w-3 h-3 text-red-400 flex-shrink-0" />
              <p className="text-xs text-red-300">{error}</p>
            </div>
          )}

          <Button
            onClick={handleTransfer}
            disabled={transferring || !bitcoinAddress || !nairaAmount}
            className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white font-bold py-2 rounded-lg text-sm shadow-lg shadow-orange-900/40 border border-orange-500/40 disabled:opacity-50"
          >
            <Bitcoin className="w-4 h-4 mr-1" />
            {transferring ? "Transferring..." : "Send to Bitcoin"}
          </Button>
        </div>

        {/* Security Notice */}
        <div className="bg-orange-950/30 border border-orange-600/30 rounded-lg p-3 mb-4">
          <p className="text-xs text-orange-300 text-center leading-relaxed">
            Bitcoin transfers are processed immediately at current market rate. All transactions are encrypted and anonymous.
          </p>
        </div>

        {/* Back Button */}
        <Button onClick={onBack} className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-3 rounded-lg border border-gray-700 hover:border-orange-500">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Wallet
        </Button>
      </div>
    </div>
  )
}
