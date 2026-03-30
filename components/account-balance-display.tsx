"use client"

import { CodeBackground } from "@/components/code-background"
import { CheckCircle, ArrowLeft, Calendar, Building, CreditCard, User, Shield, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function AccountBalanceDisplay({ onBack, currentBalance }: { onBack: () => void; currentBalance: number }) {
  const accountBalance = 14877657356.98

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-between overflow-y-auto py-8">
      <CodeBackground />

      <div className="relative z-10 w-full max-w-2xl px-4 flex-1 flex flex-col">
        {/* Success Header */}
        <div className="text-center mb-4">
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

        {/* UBA Bank Logo */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            {/* Outer decorative frame */}
            <div className="absolute -inset-2 bg-gradient-to-br from-red-500/30 via-red-600/20 to-red-500/30 rounded-xl blur-sm"></div>
            <div className="absolute -inset-1 bg-gradient-to-br from-red-600/40 to-red-700/40 rounded-lg"></div>
            
            {/* Logo container */}
            <div className="relative w-28 h-28 rounded-lg overflow-hidden border-2 border-red-400/60 shadow-2xl shadow-red-900/60 bg-white flex items-center justify-center">
              <Image
                src="/uba-bank-logo.jpg"
                alt="United Bank for Africa Logo"
                width={100}
                height={100}
                className="object-contain p-2"
              />
            </div>
            
            {/* Verified badge */}
            <div className="absolute -bottom-2 -right-2 w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center border-3 border-black shadow-lg shadow-green-500/50 z-30">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            
            {/* Active status indicator */}
            <div className="absolute -top-2 -left-2 z-30">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                <div className="relative w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center border-2 border-black shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex justify-center gap-3 mb-4">
          {/* Active Status */}
          <div className="flex items-center gap-1.5 bg-green-950/60 border border-green-500/50 rounded-full px-3 py-1.5 backdrop-blur-sm">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse"></div>
              <Zap className="relative w-3 h-3 text-green-400" />
            </div>
            <span className="text-xs font-bold text-green-400 uppercase tracking-wider">Active</span>
          </div>
          
          {/* Joint Account Badge */}
          <div className="flex items-center gap-1.5 bg-blue-950/60 border border-blue-500/50 rounded-full px-3 py-1.5 backdrop-blur-sm">
            <Users className="w-3 h-3 text-blue-400" />
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Joint Account</span>
          </div>
        </div>

        {/* Date and Time Info */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="bg-gray-900/60 border border-gray-800 rounded-lg px-4 py-2 backdrop-blur-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-400" />
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="text-sm font-bold text-white">30/03/2026</p>
            </div>
          </div>
          <div className="bg-gray-900/60 border border-gray-800 rounded-lg px-4 py-2 backdrop-blur-sm flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <div>
              <p className="text-xs text-gray-500">Time</p>
              <p className="text-sm font-bold text-white">12:06</p>
            </div>
          </div>
        </div>

        {/* Account Balance */}
        <div className="bg-gradient-to-br from-green-950/40 to-emerald-950/40 border border-green-600/40 rounded-lg p-4 mb-4 backdrop-blur-md text-center relative overflow-hidden">
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent animate-pulse"></div>
          <div className="relative z-10">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Account Balance</p>
            <p className="text-3xl font-black text-green-400 mb-1">
              ₦{accountBalance.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-gray-500 font-mono">Available Balance</p>
          </div>
        </div>

        {/* Account Details */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 backdrop-blur-md space-y-3 mb-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-800">
            <User className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 mb-1">Account Name</p>
              <p className="text-sm font-bold text-white break-words">AUTOGRAPH CONSTRUCTION LIMITED</p>
            </div>
          </div>

          <div className="flex items-center gap-2 pb-3 border-b border-gray-800">
            <Building className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">Bank Name</p>
              <p className="text-sm font-bold text-white">United Bank For Africa</p>
            </div>
          </div>

          <div className="flex items-center gap-2 pb-3 border-b border-gray-800">
            <CreditCard className="w-4 h-4 text-orange-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">Account Number</p>
              <p className="text-sm font-bold text-white font-mono">1022090307</p>
            </div>
          </div>

          <div className="flex items-center gap-2 pb-3 border-b border-gray-800">
            <Shield className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">BVN</p>
              <p className="text-sm font-bold text-white font-mono">22235685379</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-green-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">Date Retrieved</p>
              <p className="text-sm font-bold text-white">28/03/2026</p>
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
