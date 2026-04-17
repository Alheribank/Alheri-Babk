"use client"

import { CodeBackground } from "@/components/code-background"
import { NotificationModal } from "@/components/notification-modal"
import { useState } from "react"
import { ArrowLeft, Send, Building, CreditCard, User, AlertTriangle, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BankTransferLoading } from "@/components/bank-transfer-loading"
import { BankTransferActivation } from "@/components/bank-transfer-activation"

interface NigerianBankTransferProps {
  onBack: () => void
  walletBalance: number
}

const nigerianBanks = [
  "Access Bank Plc",
  "Citibank Nigeria Limited",
  "Ecobank Nigeria Plc",
  "Fidelity Bank Plc",
  "First Bank of Nigeria Limited",
  "First City Monument Bank Plc",
  "Globus Bank Limited",
  "Guaranty Trust Bank Plc",
  "Heritage Bank Plc",
  "Keystone Bank Limited",
  "Lotus Bank Limited",
  "Optimus Bank Limited",
  "Parallex Bank Limited",
  "Polaris Bank Limited",
  "Premium Trust Bank Limited",
  "Providus Bank Limited",
  "Stanbic IBTC Bank Plc",
  "Standard Chartered Bank Nigeria Limited",
  "Sterling Bank Plc",
  "SunTrust Bank Nigeria Limited",
  "Titan Trust Bank Limited",
  "Union Bank of Nigeria Plc",
  "United Bank for Africa Plc",
  "Unity Bank Plc",
  "Wema Bank Plc",
  "Zenith Bank Plc",
]

export function NigerianBankTransfer({ onBack, walletBalance }: NigerianBankTransferProps) {
  const [accountNumber, setAccountNumber] = useState("")
  const [accountName, setAccountName] = useState("")
  const [selectedBank, setSelectedBank] = useState("")
  const [amount, setAmount] = useState("")
  const [showBankDropdown, setShowBankDropdown] = useState(false)
  const [stage, setStage] = useState<"form" | "loading" | "activation">("form")
  const [error, setError] = useState("")

  const handleTransfer = () => {
    setError("")

    if (!accountNumber || accountNumber.length !== 10) {
      setError("Please enter a valid 10-digit account number")
      return
    }

    if (!accountName.trim()) {
      setError("Please enter the account name")
      return
    }

    if (!selectedBank) {
      setError("Please select a bank")
      return
    }

    const transferAmount = Number.parseFloat(amount)
    if (isNaN(transferAmount) || transferAmount <= 0) {
      setError("Please enter a valid amount")
      return
    }

    if (transferAmount > walletBalance) {
      setError("Insufficient wallet balance")
      return
    }

    setStage("loading")
  }

  if (stage === "loading") {
    return (
      <>
        <NotificationModal />
        <BankTransferLoading
          onComplete={() => setStage("activation")}
          transferAmount={Number.parseFloat(amount)}
          accountNumber={accountNumber}
          accountName={accountName}
          bankName={selectedBank}
        />
      </>
    )
  }

  if (stage === "activation") {
    return (
      <>
        <NotificationModal />
        <BankTransferActivation
          onBack={onBack}
          transferAmount={Number.parseFloat(amount)}
          accountNumber={accountNumber}
          accountName={accountName}
          bankName={selectedBank}
        />
      </>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-y-auto py-8">
      <CodeBackground />
      <NotificationModal />

      <div className="relative z-10 w-full max-w-xl px-6">
        {/* Back Button */}
        <Button onClick={onBack} variant="ghost" className="mb-6 text-gray-400 hover:text-white hover:bg-gray-800/50">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Wallet
        </Button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-900 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-900/60 border-2 border-green-500/40">
              <Building className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-black mb-2 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
            NIGERIAN BANK TRANSFER
          </h1>
          <p className="text-gray-400 text-sm">Secure FSB-Encrypted Transfer Protocol</p>
        </div>

        {/* Wallet Balance Display */}
        <div className="bg-gradient-to-br from-purple-950/40 to-violet-950/40 border border-purple-600/40 rounded-xl p-4 mb-6 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase">Available Balance</p>
              <p className="text-xl font-bold text-purple-400">
                ₦{walletBalance.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <CreditCard className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        {/* Transfer Form */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-green-600/30 rounded-xl p-6 mb-6 backdrop-blur-md">
          <h3 className="text-sm font-bold text-green-400 uppercase tracking-wider mb-4">Transfer Details</h3>

          {/* Account Number */}
          <div className="mb-4">
            <label className="text-xs text-gray-400 uppercase mb-2 block">Account Number</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="Enter 10-digit account number"
                className="w-full bg-black/60 border-gray-700 text-white pl-11 h-12 font-mono focus:border-green-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{accountNumber.length}/10 digits</p>
          </div>

          {/* Account Name */}
          <div className="mb-4">
            <label className="text-xs text-gray-400 uppercase mb-2 block">Account Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value.toUpperCase())}
                placeholder="Enter account holder name"
                className="w-full bg-black/60 border-gray-700 text-white pl-11 h-12 uppercase focus:border-green-500"
              />
            </div>
          </div>

          {/* Bank Selection */}
          <div className="mb-4">
            <label className="text-xs text-gray-400 uppercase mb-2 block">Select Bank</label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
              <button
                type="button"
                onClick={() => setShowBankDropdown(!showBankDropdown)}
                className="w-full bg-black/60 border border-gray-700 text-white pl-11 pr-10 h-12 rounded-md text-left focus:border-green-500 focus:outline-none"
              >
                {selectedBank || "Select a bank"}
              </button>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

              {showBankDropdown && (
                <div className="absolute z-20 w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg max-h-60 overflow-y-auto">
                  {nigerianBanks.map((bank) => (
                    <button
                      key={bank}
                      type="button"
                      onClick={() => {
                        setSelectedBank(bank)
                        setShowBankDropdown(false)
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-green-600/20 hover:text-green-400 transition-colors"
                    >
                      {bank}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label className="text-xs text-gray-400 uppercase mb-2 block">Amount (NGN)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₦</span>
              <Input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                placeholder="Enter amount to transfer"
                className="w-full bg-black/60 border-gray-700 text-white pl-10 h-12 font-mono focus:border-green-500"
              />
            </div>
            {Number.parseFloat(amount) > walletBalance && (
              <p className="text-xs text-red-400 mt-1">Insufficient wallet balance</p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-950/40 border border-red-600/40 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Transfer Button */}
          <Button
            onClick={handleTransfer}
            disabled={
              !accountNumber || !accountName || !selectedBank || !amount || Number.parseFloat(amount) > walletBalance
            }
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 h-14 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 mr-2" />
            Send Money
          </Button>
        </div>

        {/* Security Notice */}
        <div className="bg-orange-950/30 border border-orange-600/30 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-orange-300 leading-relaxed">
                <span className="font-bold">SECURITY WARNING:</span> All Nigerian bank transfers are processed through
                Russian FSB encrypted channels. Transfers require activation before funds are released to the recipient.
                Please ensure all account details are correct before proceeding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
