"use client"
import { CodeBackground } from "@/components/code-background"
import { NotificationModal } from "@/components/notification-modal"
import { DollarSign, CreditCard, Lock, ChevronRight, Shield, ArrowLeft } from "lucide-react"

interface ArsenalMenuProps {
  onCheckBalance: () => void
  onCheckWallet: () => void
  onWithdrawFunds: () => void
  onBack?: () => void
}

export function ArsenalMenu({ onCheckBalance, onCheckWallet, onWithdrawFunds, onBack }: ArsenalMenuProps) {
  const options = [
    {
      id: "balance",
      title: "Check Account Balance",
      description: "View current account balance and transaction history",
      icon: DollarSign,
      color: "from-green-600 to-emerald-700",
      borderColor: "border-green-900/40",
      iconColor: "text-green-400",
      onClick: onCheckBalance,
    },
    {
      id: "wallet",
      title: "Software Wallet Balance",
      description: "View funds transferred to encrypted software wallet",
      icon: CreditCard,
      color: "from-purple-600 to-violet-700",
      borderColor: "border-purple-900/40",
      iconColor: "text-purple-400",
      onClick: onCheckWallet,
    },
    {
      id: "withdraw",
      title: "Withdraw Funds",
      description: "Transfer funds from account to software wallet",
      icon: Lock,
      color: "from-orange-600 to-red-700",
      borderColor: "border-orange-900/40",
      iconColor: "text-orange-400",
      onClick: onWithdrawFunds,
    },
  ]

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-y-auto py-8">
      <CodeBackground />
      <NotificationModal />

      <div className="relative z-10 w-full max-w-4xl px-6">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold">Back to Verification</span>
          </button>
        )}

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-900 rounded-3xl flex items-center justify-center shadow-2xl shadow-red-900/60 border-2 border-red-500/40">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-black mb-3 bg-gradient-to-r from-red-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
            ELITE RUSSIAN CYBER ARSENAL
          </h1>
          <p className="text-gray-400 text-sm uppercase tracking-wider font-mono">Select Operation Mode</p>
        </div>

        {/* Options Grid */}
        <div className="space-y-4 mb-8">
          {options.map((option, index) => {
            const Icon = option.icon
            return (
              <button
                key={option.id}
                onClick={option.onClick}
                className={`w-full bg-gray-900/60 border ${option.borderColor} rounded-xl p-6 backdrop-blur-md hover:bg-gray-800/60 transition-all duration-300 group hover:scale-[1.02] hover:shadow-2xl`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className={`text-xl font-bold mb-1 ${option.iconColor}`}>{option.title}</h3>
                    <p className="text-sm text-gray-400">{option.description}</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-gray-400 group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            )
          })}
        </div>

        {/* Warning */}
        <div className="bg-red-950/30 border border-red-600/30 rounded-xl p-4">
          <p className="text-xs text-red-300 text-center leading-relaxed">
            ⚠️ All operations are logged and encrypted. Unauthorized access attempts will be detected and reported to
            security authorities.
          </p>
        </div>
      </div>
    </div>
  )
}
