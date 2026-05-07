"use client"

import { CodeBackground } from "@/components/code-background"
import { CheckCircle, ArrowLeft, Calendar, Building, CreditCard, User, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function AccountBalanceDisplay({ onBack, currentBalance = 4096119.43 }: { onBack: () => void; currentBalance?: number }) {
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-between overflow-y-auto py-8">
      <CodeBackground />

      <div className="relative z-10 w-full max-w-2xl px-4 flex-1 flex flex-col">
        {/* Success Header */}
        <div className="text-center mb-5">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-900 rounded-xl flex items-center justify-center shadow-lg shadow-green-900/40 border border-green-500/40">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-xl font-black mb-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
            ACCOUNT VERIFICATION SUCCESSFUL
          </h1>
          <p className="text-gray-400 text-xs">Account data retrieved from secure banking network</p>
        </div>

        {/* Account Holder Photo */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-28 h-32 rounded-lg overflow-hidden border-2 border-green-500/40 shadow-lg shadow-green-900/40">
              <Image
                src="/profile-photo.png"
                alt="Account Holder - MIYO ENERGY LIMITED"
                width={112}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center border-2 border-black shadow-lg">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Account Balance */}
        <div className="bg-gradient-to-br from-green-950/40 to-emerald-950/40 border border-green-600/40 rounded-lg p-4 mb-4 backdrop-blur-md text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Account Balance</p>
          <p className="text-3xl font-black text-green-400 mb-1">
            ₦{currentBalance.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-gray-500 font-mono">Available Balance</p>
        </div>

        {/* Account Details */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 backdrop-blur-md space-y-3 mb-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-800">
            <User className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 mb-1">Account Name</p>
              <p className="text-sm font-bold text-white break-words">MIYO ENERGY LIMITED</p>
            </div>
          </div>

          <div className="flex items-center gap-2 pb-3 border-b border-gray-800">
            <Building className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">Bank Name</p>
              <p className="text-sm font-bold text-white">Ecobank Nigeria Plc</p>
            </div>
          </div>

          <div className="flex items-center gap-2 pb-3 border-b border-gray-800">
            <CreditCard className="w-4 h-4 text-orange-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">Account Number</p>
              <p className="text-sm font-bold text-white font-mono">0044119775</p>
            </div>
          </div>

          <div className="flex items-center gap-2 pb-3 border-b border-gray-800">
            <Shield className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">BVN</p>
              <p className="text-sm font-bold text-white font-mono">22443702112</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-green-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">Date Retrieved</p>
              <p className="text-sm font-bold text-white">07/05/2026</p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-green-950/30 border border-green-600/30 rounded-lg p-3 mb-6">
          <p className="text-xs text-green-300 text-center leading-relaxed">
            This information was securely retrieved using advanced Russian FSB cyber protocols. All data is encrypted and will not be stored on external servers.
          </p>
        </div>
      </div>

      {/* Back Button - Fixed at Bottom */}
      <Button onClick={onBack} className="w-11/12 max-w-2xl bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-3 rounded-lg border border-gray-700 hover:border-green-500 mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Arsenal
      </Button>
    </div>
  )
}
