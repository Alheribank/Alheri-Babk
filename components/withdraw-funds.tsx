"use client"

import { CodeBackground } from "@/components/code-background"
import { ArrowDownToLine, ArrowLeft, Wallet, AlertTriangle, CheckCircle, Lock, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useState } from "react"
import WithdrawProcessing from "@/components/withdraw-processing"

interface WithdrawFundsProps {
  onBack: () => void
  currentBalance: number
  onWithdraw: (amount: number) => void
}

export function WithdrawFunds({ onBack, currentBalance = 257567234.98, onWithdraw }: WithdrawFundsProps) {
  const [amount, setAmount] = useState("")
  const [error, setError] = useState("")
  const [stage, setStage] = useState<"form" | "token" | "pin" | "processing">("form")
  const [tokenCode, setTokenCode] = useState("")
  const [tokenError, setTokenError] = useState("")
  const [bankPin, setBankPin] = useState("")
  const [pinError, setPinError] = useState("")

  const handleWithdraw = () => {
    const withdrawAmount = Number.parseFloat(amount.replace(/,/g, ""))

    if (!withdrawAmount || withdrawAmount <= 0) {
      setError("Please enter a valid amount")
      return
    }

    if (withdrawAmount > currentBalance) {
      setError("Insufficient funds in account")
      return
    }

    setError("")
    setStage("token")
  }

  const handleTokenSubmit = () => {
    setTokenError("")

    if (tokenCode.length !== 6 || !/^\d+$/.test(tokenCode)) {
      setTokenError("Please enter a valid 6-digit code")
      return
    }

    setStage("pin")
  }

  const handlePinSubmit = () => {
    setPinError("")

    if (bankPin.length !== 4 || !/^\d+$/.test(bankPin)) {
      setPinError("Please enter a valid 4-digit PIN")
      return
    }

    setStage("processing")
  }

  const formatNumber = (value: string) => {
    const number = value.replace(/,/g, "")
    if (!number) return ""
    return Number.parseFloat(number).toLocaleString("en-NG")
  }

  if (stage === "processing") {
    return <WithdrawProcessing amount={Number.parseFloat(amount.replace(/,/g, ""))} onComplete={() => {
      const withdrawAmount = Number.parseFloat(amount.replace(/,/g, ""))
      onWithdraw(withdrawAmount)
      setStage("form")
      setAmount("")
      setTokenCode("")
      setBankPin("")
    }} />
  }

  if (stage === "pin") {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-between overflow-y-auto py-8">
        <CodeBackground />

        <div className="relative z-10 w-full max-w-2xl px-4 flex-1 flex flex-col items-center justify-center">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-900 rounded-xl flex items-center justify-center shadow-lg shadow-purple-900/40 border border-purple-500/40">
                <Lock className="w-7 h-7 text-white" />
              </div>
            </div>
            <h1 className="text-xl font-black mb-1 bg-gradient-to-r from-purple-400 via-violet-500 to-purple-600 bg-clip-text text-transparent">
              BANK PIN VERIFICATION
            </h1>
            <p className="text-gray-400 text-xs">Enter your 4-digit bank PIN</p>
          </div>

          {/* PIN Display */}
          <div className="bg-gradient-to-br from-purple-950/40 to-violet-950/40 border border-purple-600/40 rounded-lg p-6 mb-6 backdrop-blur-md w-full max-w-sm">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 text-center">Withdrawal Amount</p>
            <p className="text-2xl font-black text-purple-400 text-center">
              ₦{Number.parseFloat(amount.replace(/,/g, "")).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          {/* PIN Input */}
          <div className="w-full max-w-sm mb-6">
            <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
              4-Digit Bank PIN
            </label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={bankPin}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "")
                setBankPin(val)
                setPinError("")
              }}
              placeholder="••••"
              className="w-full bg-black/60 border-2 border-purple-700 text-white text-4xl font-bold py-4 px-4 rounded-lg text-center tracking-[0.5em] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
            {pinError && (
              <div className="mt-2 flex items-center gap-2 bg-red-950/40 border border-red-600/40 rounded-lg p-2">
                <AlertTriangle className="w-3 h-3 text-red-400 flex-shrink-0" />
                <p className="text-xs text-red-300">{pinError}</p>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="w-full max-w-sm space-y-3">
            <Button
              onClick={handlePinSubmit}
              disabled={bankPin.length !== 4}
              className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-bold py-3 rounded-lg text-sm shadow-lg shadow-purple-900/40 border border-purple-500/40 disabled:opacity-50"
            >
              Verify PIN
            </Button>
            <Button
              onClick={() => {
                setStage("token")
                setBankPin("")
                setPinError("")
              }}
              variant="outline"
              className="w-full bg-gray-900/60 border-gray-700 text-white hover:bg-gray-800"
            >
              Back to Token
            </Button>
          </div>
        </div>

        <Button onClick={onBack} className="w-11/12 max-w-2xl bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-3 rounded-lg border border-gray-700 hover:border-orange-500 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Arsenal
        </Button>
      </div>
    )
  }

  if (stage === "token") {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-between overflow-y-auto py-8">
        <CodeBackground />

        <div className="relative z-10 w-full max-w-2xl px-4 flex-1 flex flex-col items-center justify-center">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-900 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40 border border-blue-500/40">
                <Lock className="w-7 h-7 text-white" />
              </div>
            </div>
            <h1 className="text-xl font-black mb-1 bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
              HARDWARE TOKEN VERIFICATION
            </h1>
            <p className="text-gray-400 text-xs">Enter your 6-digit token code</p>
          </div>

          {/* Token Display */}
          <div className="bg-gradient-to-br from-blue-950/40 to-cyan-950/40 border border-blue-600/40 rounded-lg p-6 mb-6 backdrop-blur-md w-full max-w-sm">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 text-center">Withdrawal Amount</p>
            <p className="text-2xl font-black text-blue-400 text-center">
              ₦{Number.parseFloat(amount.replace(/,/g, "")).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          {/* Token Input */}
          <div className="w-full max-w-sm mb-6">
            <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
              6-Digit Hardware Token Code
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={tokenCode}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "")
                setTokenCode(val)
                setTokenError("")
              }}
              placeholder="000000"
              className="w-full bg-black/60 border-2 border-blue-700 text-white text-3xl font-bold py-4 px-4 rounded-lg text-center tracking-[0.3em] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            {tokenError && (
              <div className="mt-2 flex items-center gap-2 bg-red-950/40 border border-red-600/40 rounded-lg p-2">
                <AlertTriangle className="w-3 h-3 text-red-400 flex-shrink-0" />
                <p className="text-xs text-red-300">{tokenError}</p>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="w-full max-w-sm space-y-3">
            <Button
              onClick={handleTokenSubmit}
              disabled={tokenCode.length !== 6}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 rounded-lg text-sm shadow-lg shadow-blue-900/40 border border-blue-500/40 disabled:opacity-50"
            >
              Verify Token
            </Button>
            <Button
              onClick={() => {
                setStage("form")
                setTokenCode("")
                setTokenError("")
              }}
              variant="outline"
              className="w-full bg-gray-900/60 border-gray-700 text-white hover:bg-gray-800"
            >
              Cancel
            </Button>
          </div>
        </div>

        <Button onClick={onBack} className="w-11/12 max-w-2xl bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-3 rounded-lg border border-gray-700 hover:border-orange-500 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Arsenal
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-between overflow-y-auto py-8">
      <CodeBackground />

      <div className="relative z-10 w-full max-w-2xl px-4 flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-900 rounded-xl flex items-center justify-center shadow-lg shadow-orange-900/40 border border-orange-500/40">
              <ArrowDownToLine className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-xl font-black mb-1 bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent">
            WITHDRAW FUNDS
          </h1>
          <p className="text-gray-400 text-xs">Transfer funds to secure software wallet</p>
        </div>

        {/* Account Photo */}
        <div className="flex justify-center mb-3">
          <div className="relative">
            <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-orange-500/40 shadow-lg shadow-orange-900/40">
              <Image
                src="/account-photo.png"
                alt="Account Holder"
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-orange-600 rounded-full flex items-center justify-center border-2 border-black shadow-lg">
              <CheckCircle className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>

        {/* Current Balance */}
        <div className="bg-gradient-to-br from-blue-950/40 to-cyan-950/40 border border-blue-600/40 rounded-lg p-4 mb-4 backdrop-blur-md text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Current Account Balance</p>
          <p className="text-2xl font-black text-blue-400">
            ₦{currentBalance.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        {/* Withdraw Form */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 backdrop-blur-md mb-4">
          <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
            Enter Withdrawal Amount
          </label>
          <div className="relative mb-3">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-500">₦</span>
            <Input
              type="text"
              value={amount}
              onChange={(e) => {
                const value = e.target.value.replace(/[^\d.]/g, "")
                setAmount(value)
                setError("")
              }}
              onBlur={(e) => {
                if (e.target.value) {
                  setAmount(formatNumber(e.target.value))
                }
              }}
              placeholder="0.00"
              className="w-full bg-black/60 border-gray-700 text-white text-lg font-bold pl-10 pr-3 py-3 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          {error && (
            <div className="bg-red-950/40 border border-red-600/40 rounded-lg p-2 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-3 h-3 text-red-400 flex-shrink-0" />
              <p className="text-xs text-red-300">{error}</p>
            </div>
          )}

          <Button
            onClick={handleWithdraw}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 rounded-lg text-sm shadow-lg shadow-orange-900/40 border border-orange-500/40"
          >
            <Wallet className="w-4 h-4 mr-1" />
            Withdraw Funds
          </Button>
        </div>

        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[1000000, 10000000, 100000000, 500000000].map((quickAmount) => (
            <Button
              key={quickAmount}
              onClick={() => setAmount(quickAmount.toString())}
              variant="outline"
              className="bg-gray-900/60 border-gray-700 hover:bg-gray-800 hover:border-orange-500 text-gray-300 hover:text-white text-xs py-2 h-auto"
            >
              ₦{(quickAmount / 1000000).toFixed(0)}M
            </Button>
          ))}
        </div>

        {/* Warning */}
        <div className="bg-orange-950/30 border border-orange-600/30 rounded-lg p-3 mb-6">
          <p className="text-xs text-orange-300 text-center leading-relaxed">
            Funds will be transferred to your encrypted software wallet using FSB secure protocols. This process is irreversible and anonymous.
          </p>
        </div>
      </div>

      {/* Back Button - Fixed at Bottom */}
      <Button onClick={onBack} className="w-11/12 max-w-2xl bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-3 rounded-lg border border-gray-700 hover:border-orange-500 mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Arsenal
      </Button>
    </div>
  )
}
