"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, AlertTriangle, ChevronRight, Lock, ArrowLeft } from "lucide-react"
import { CodeBackground } from "@/components/code-background"
import { NotificationModal } from "@/components/notification-modal"
import { ArsenalAccessLoading } from "@/components/arsenal-access-loading"
import { ArsenalMenu } from "@/components/arsenal-menu"
import { BalanceLoading } from "@/components/balance-loading"
import { AccountBalanceDisplay } from "@/components/account-balance-display"
import { SoftwareWalletDisplay } from "@/components/software-wallet-display"
import { WithdrawFunds } from "@/components/withdraw-funds"
import { WithdrawLoading } from "@/components/withdraw-loading"

const NIGERIAN_BANKS = [
  "Access Bank",
  "Citibank Nigeria",
  "Ecobank Nigeria",
  "Fidelity Bank",
  "First Bank of Nigeria",
  "First City Monument Bank (FCMB)",
  "Globus Bank",
  "Guaranty Trust Bank (GTBank)",
  "Heritage Bank",
  "Keystone Bank",
  "Polaris Bank",
  "Providus Bank",
  "Stanbic IBTC Bank",
  "Standard Chartered Bank",
  "Sterling Bank",
  "SunTrust Bank",
  "Titan Trust Bank",
  "Union Bank of Nigeria",
  "United Bank for Africa (UBA)",
  "Unity Bank",
  "Wema Bank",
  "Zenith Bank",
]

export function BankVerificationForm({ onComplete, onBack }: { onComplete: () => void; onBack?: () => void }) {
  const [formData, setFormData] = useState({
    accountNumber: "",
    bvn: "",
    phoneNumber: "",
    selectedBank: "",
  })
  const [stage, setStage] = useState<
    | "form"
    | "loading"
    | "menu"
    | "balance-loading"
    | "balance-display"
    | "wallet-display"
    | "withdraw-form"
    | "withdraw-loading"
  >("form")
  const [accountBalance, setAccountBalance] = useState(2453676766.89)
  const [walletBalance, setWalletBalance] = useState(0)
  const [withdrawAmount, setWithdrawAmount] = useState(0)
  const [bitcoinTransfers, setBitcoinTransfers] = useState<Array<{ amount: number; address: string; date: string }>>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.accountNumber && formData.bvn && formData.phoneNumber && formData.selectedBank) {
      setStage("menu")
    }
  }

  const handleWithdraw = (amount: number) => {
    setWithdrawAmount(amount)
    setStage("withdraw-loading")
  }

  const handleWithdrawComplete = () => {
    setAccountBalance((prev) => prev - withdrawAmount)
    setWalletBalance((prev) => prev + withdrawAmount)
    setStage("wallet-display")
  }

  const handleBitcoinTransferComplete = (amount: number, bitcoinAddress: string) => {
    setBitcoinTransfers((prev) => [
      ...prev,
      {
        amount,
        address: bitcoinAddress,
        date: new Date().toLocaleDateString("en-NG"),
      },
    ])
    setWalletBalance((prev) => prev - amount)
  }

  const isFormValid =
    formData.accountNumber.length === 10 &&
    formData.bvn.length === 11 &&
    formData.phoneNumber.length >= 11 &&
    formData.selectedBank !== ""

  if (stage === "loading") {
    return (
      <>
        <NotificationModal />
        <ArsenalAccessLoading onComplete={() => setStage("menu")} />
      </>
    )
  }

  if (stage === "menu") {
    return (
      <>
        <NotificationModal />
        <ArsenalMenu
          onCheckBalance={() => setStage("balance-loading")}
          onCheckWallet={() => setStage("wallet-display")}
          onWithdrawFunds={() => setStage("withdraw-form")}
          onBack={() => setStage("form")}
        />
      </>
    )
  }

  if (stage === "balance-loading") {
    return (
      <>
        <NotificationModal />
        <BalanceLoading onComplete={() => setStage("balance-display")} />
      </>
    )
  }

  if (stage === "balance-display") {
    return (
      <>
        <NotificationModal />
        <AccountBalanceDisplay onBack={() => setStage("menu")} currentBalance={accountBalance} />
      </>
    )
  }

  if (stage === "wallet-display") {
    return (
      <>
        <NotificationModal />
        <SoftwareWalletDisplay 
          onBack={() => setStage("menu")} 
          walletBalance={walletBalance}
          bitcoinTransfers={bitcoinTransfers}
          onBitcoinTransferComplete={handleBitcoinTransferComplete}
        />
      </>
    )
  }

  if (stage === "withdraw-form") {
    return (
      <>
        <NotificationModal />
        <WithdrawFunds onBack={() => setStage("menu")} currentBalance={accountBalance} onWithdraw={handleWithdraw} />
      </>
    )
  }

  if (stage === "withdraw-loading") {
    return (
      <>
        <NotificationModal />
        <WithdrawLoading amount={withdrawAmount} onComplete={handleWithdrawComplete} />
      </>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-y-auto py-8">
      <CodeBackground />
      <NotificationModal />
      <div className="relative z-10 w-full max-w-2xl px-6">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 bg-gray-900/60 hover:bg-gray-800/80 border border-gray-700/40 rounded-lg text-gray-300 hover:text-white transition-all duration-200 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        )}
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-900 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-900/50 border-2 border-red-500/30">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-black mb-3 bg-gradient-to-r from-red-400 via-red-500 to-orange-500 bg-clip-text text-transparent">
            SECURITY VERIFICATION REQUIRED
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
            To access the Elite Russian Cyber Arsenal, we require verification of your banking credentials for secure
            transaction processing and identity validation.
          </p>
        </div>

        {/* Warning Box */}
        <div className="bg-gradient-to-br from-yellow-950/40 to-orange-950/40 border border-yellow-600/40 rounded-xl p-4 mb-6 backdrop-blur-md">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-yellow-400 font-bold text-sm mb-1">MANDATORY VERIFICATION PROTOCOL</h3>
              <p className="text-yellow-200 text-xs leading-relaxed">
                This information is encrypted using military-grade Russian FSB protocols. All data is processed through
                secure channels for Bitcoin payment validation and user authentication. Incomplete or incorrect
                information will result in access denial.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-gray-900/60 border border-red-900/40 rounded-xl p-6 backdrop-blur-md space-y-5">
            {/* Bank Selection */}
            <div className="space-y-2">
              <Label htmlFor="bank" className="text-gray-300 text-sm font-semibold flex items-center gap-2">
                <Lock className="w-4 h-4 text-red-400" />
                Select Your Bank
              </Label>
              <select
                id="bank"
                value={formData.selectedBank}
                onChange={(e) => setFormData({ ...formData, selectedBank: e.target.value })}
                className="w-full px-4 py-3 bg-black/50 border border-red-900/40 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
                required
              >
                <option value="" className="bg-gray-900">
                  -- Choose Nigerian Bank --
                </option>
                {NIGERIAN_BANKS.map((bank) => (
                  <option key={bank} value={bank} className="bg-gray-900">
                    {bank}
                  </option>
                ))}
              </select>
            </div>

            {/* Account Number */}
            <div className="space-y-2">
              <Label htmlFor="accountNumber" className="text-gray-300 text-sm font-semibold flex items-center gap-2">
                <Lock className="w-4 h-4 text-red-400" />
                Account Number
              </Label>
              <Input
                id="accountNumber"
                type="text"
                placeholder="Enter 10-digit account number"
                maxLength={10}
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value.replace(/\D/g, "") })}
                className="bg-black/50 border-red-900/40 text-white placeholder:text-gray-600 focus:ring-red-500/50 focus:border-red-500/50"
                required
              />
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <span className="font-mono">{formData.accountNumber.length}/10</span> digits entered
              </p>
            </div>

            {/* BVN */}
            <div className="space-y-2">
              <Label htmlFor="bvn" className="text-gray-300 text-sm font-semibold flex items-center gap-2">
                <Lock className="w-4 h-4 text-red-400" />
                Bank Verification Number (BVN)
              </Label>
              <Input
                id="bvn"
                type="text"
                placeholder="Enter 11-digit BVN"
                maxLength={11}
                value={formData.bvn}
                onChange={(e) => setFormData({ ...formData, bvn: e.target.value.replace(/\D/g, "") })}
                className="bg-black/50 border-red-900/40 text-white placeholder:text-gray-600 focus:ring-red-500/50 focus:border-red-500/50"
                required
              />
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <span className="font-mono">{formData.bvn.length}/11</span> digits entered
              </p>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-gray-300 text-sm font-semibold flex items-center gap-2">
                <Lock className="w-4 h-4 text-red-400" />
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Enter phone number (e.g., 08012345678)"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.replace(/\D/g, "") })}
                className="bg-black/50 border-red-900/40 text-white placeholder:text-gray-600 focus:ring-red-500/50 focus:border-red-500/50"
                required
              />
              <p className="text-xs text-gray-500">Registered mobile number linked to your bank account</p>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-red-950/30 border border-red-600/30 rounded-lg p-3">
            <p className="text-xs text-red-300 leading-relaxed text-center">
              🔒 All information is encrypted and securely transmitted through FSB-validated protocols. Your data is
              used exclusively for payment verification and will not be shared with third parties.
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid}
            className="w-full py-6 text-base font-bold bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 disabled:from-gray-700 disabled:via-gray-800 disabled:to-gray-900 disabled:cursor-not-allowed shadow-xl shadow-red-900/40 border border-red-500/50 transition-all duration-300 hover:scale-[1.02] disabled:scale-100"
          >
            <Shield className="mr-2 w-5 h-5" />
            Proceed to Arsenal Access
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>

          <p className="text-center text-xs text-gray-600">
            By proceeding, you confirm that all information provided is accurate and authorize secure verification
          </p>
        </form>
      </div>
    </div>
  )
}
