"use client"

import { useState } from "react"
import { CodeBackground } from "@/components/code-background"
import { NotificationModal } from "@/components/notification-modal"
import { Shield, ArrowLeft, Globe, MapPin, Zap, Lock, Server, Star, Crown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChinaVPNLoading } from "@/components/china-vpn-loading"
import { ChinaVPNActivation } from "@/components/china-vpn-activation"

interface ChinaVPNPanelProps {
  onBack: () => void
}

const chinaProvinces = [
  { name: "Beijing (北京)", servers: 5000, status: "ELITE" },
  { name: "Shanghai (上海)", servers: 4500, status: "ELITE" },
  { name: "Guangdong (广东)", servers: 4000, status: "PREMIUM" },
  { name: "Zhejiang (浙江)", servers: 3500, status: "PREMIUM" },
  { name: "Jiangsu (江苏)", servers: 3200, status: "PREMIUM" },
  { name: "Shandong (山东)", servers: 2800, status: "ACTIVE" },
  { name: "Sichuan (四川)", servers: 2500, status: "ACTIVE" },
  { name: "Hubei (湖北)", servers: 2200, status: "ACTIVE" },
  { name: "Henan (河南)", servers: 2000, status: "ACTIVE" },
  { name: "Hunan (湖南)", servers: 1800, status: "ACTIVE" },
  { name: "Fujian (福建)", servers: 1700, status: "ACTIVE" },
  { name: "Anhui (安徽)", servers: 1500, status: "ACTIVE" },
  { name: "Hebei (河北)", servers: 1400, status: "ACTIVE" },
  { name: "Shaanxi (陕西)", servers: 1300, status: "ACTIVE" },
  { name: "Liaoning (辽宁)", servers: 1200, status: "ACTIVE" },
  { name: "Jiangxi (江西)", servers: 1100, status: "ACTIVE" },
  { name: "Chongqing (重庆)", servers: 1000, status: "ACTIVE" },
  { name: "Yunnan (云南)", servers: 900, status: "ACTIVE" },
  { name: "Guangxi (广西)", servers: 850, status: "ACTIVE" },
  { name: "Shanxi (山西)", servers: 800, status: "ACTIVE" },
  { name: "Guizhou (贵州)", servers: 750, status: "ACTIVE" },
  { name: "Heilongjiang (黑龙江)", servers: 700, status: "ACTIVE" },
  { name: "Jilin (吉林)", servers: 650, status: "ACTIVE" },
  { name: "Gansu (甘肃)", servers: 600, status: "ACTIVE" },
  { name: "Inner Mongolia (内蒙古)", servers: 550, status: "ACTIVE" },
  { name: "Xinjiang (新疆)", servers: 500, status: "RESTRICTED" },
  { name: "Hainan (海南)", servers: 450, status: "ACTIVE" },
  { name: "Ningxia (宁夏)", servers: 400, status: "ACTIVE" },
  { name: "Qinghai (青海)", servers: 350, status: "ACTIVE" },
  { name: "Tibet (西藏)", servers: 300, status: "RESTRICTED" },
  { name: "Hong Kong (香港)", servers: 3000, status: "ELITE" },
  { name: "Macau (澳门)", servers: 800, status: "PREMIUM" },
  { name: "Taiwan (台湾)", servers: 2000, status: "CLASSIFIED" },
]

export function ChinaVPNPanel({ onBack }: ChinaVPNPanelProps) {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null)
  const [showLoading, setShowLoading] = useState(false)
  const [showActivation, setShowActivation] = useState(false)

  const handleProvinceSelect = (province: string) => {
    setSelectedProvince(province)
    setShowLoading(true)
  }

  const handleLoadingComplete = () => {
    setShowLoading(false)
    setShowActivation(true)
  }

  if (showLoading && selectedProvince) {
    return <ChinaVPNLoading onComplete={handleLoadingComplete} selectedProvince={selectedProvince} />
  }

  if (showActivation && selectedProvince) {
    return (
      <ChinaVPNActivation
        onBack={() => {
          setShowActivation(false)
          setSelectedProvince(null)
        }}
        selectedProvince={selectedProvince}
      />
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ELITE":
        return "text-yellow-400 bg-yellow-900/40 border-yellow-500/40"
      case "PREMIUM":
        return "text-purple-400 bg-purple-900/40 border-purple-500/40"
      case "RESTRICTED":
        return "text-red-400 bg-red-900/40 border-red-500/40"
      case "CLASSIFIED":
        return "text-orange-400 bg-orange-900/40 border-orange-500/40"
      default:
        return "text-green-400 bg-green-900/40 border-green-500/40"
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-y-auto py-8">
      <CodeBackground />
      <NotificationModal />

      <div className="relative z-10 w-full max-w-4xl px-6">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800/50">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Wallet
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-red-600 via-yellow-500 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-900/80 animate-pulse border-4 border-red-500/50">
                <Shield className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-1.5 animate-bounce">
                <Crown className="w-4 h-4 text-black" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 bg-clip-text text-transparent">
            中国超级VPN
          </h1>
          <h2 className="text-2xl font-bold text-white mb-2">CHINA SUPER VPN</h2>
          <p className="text-gray-400 text-sm">World's Most Powerful VPN System - Select Your Province</p>
        </div>

        {/* World's Most Powerful Notice */}
        <div className="bg-gradient-to-r from-red-950/60 via-yellow-950/40 to-red-950/60 border-2 border-red-600/60 rounded-2xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 animate-pulse"></div>

          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
            <h3 className="text-lg font-black text-yellow-400 uppercase tracking-wider">
              #1 Most Powerful VPN in the World
            </h3>
            <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
          </div>

          <p className="text-center text-gray-300 text-sm mb-4 leading-relaxed">
            This VPN utilizes <span className="text-red-400 font-bold">Russian FSB</span> and
            <span className="text-yellow-400 font-bold"> Chinese MSS</span> joint technology. No government,
            corporation, or hacker group can penetrate this system.
            <span className="text-green-400 font-bold"> ABSOLUTE INVISIBILITY GUARANTEED.</span>
          </p>

          <div className="grid grid-cols-4 gap-3">
            <div className="bg-black/40 rounded-lg p-3 text-center border border-red-600/30">
              <Globe className="w-5 h-5 text-red-400 mx-auto mb-1 animate-spin" style={{ animationDuration: "10s" }} />
              <p className="text-xs text-gray-500">Countries</p>
              <p className="text-sm font-bold text-red-400">195</p>
            </div>
            <div className="bg-black/40 rounded-lg p-3 text-center border border-yellow-600/30">
              <Server className="w-5 h-5 text-yellow-400 mx-auto mb-1 animate-pulse" />
              <p className="text-xs text-gray-500">Servers</p>
              <p className="text-sm font-bold text-yellow-400">50,000+</p>
            </div>
            <div className="bg-black/40 rounded-lg p-3 text-center border border-green-600/30">
              <Lock className="w-5 h-5 text-green-400 mx-auto mb-1 animate-pulse" />
              <p className="text-xs text-gray-500">Encryption</p>
              <p className="text-sm font-bold text-green-400">AES-1024</p>
            </div>
            <div className="bg-black/40 rounded-lg p-3 text-center border border-blue-600/30">
              <Zap className="w-5 h-5 text-blue-400 mx-auto mb-1 animate-pulse" />
              <p className="text-xs text-gray-500">Speed</p>
              <p className="text-sm font-bold text-blue-400">∞ Gbps</p>
            </div>
          </div>
        </div>

        {/* Province Selection */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 backdrop-blur-md mb-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-400" />
            Select China Province / Region
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2">
            {chinaProvinces.map((province, index) => (
              <button
                key={index}
                onClick={() => handleProvinceSelect(province.name)}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-900/80 to-gray-800/80 hover:from-red-950/60 hover:to-gray-800/80 border border-gray-700 hover:border-red-600/50 rounded-xl transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-yellow-600 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                      {province.name}
                    </p>
                    <p className="text-xs text-gray-500">{province.servers.toLocaleString()} servers</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded border ${getStatusColor(province.status)}`}>
                    {province.status}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-red-400 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Activation fee notice */}
        <div className="bg-gradient-to-r from-orange-950/40 to-red-950/40 border border-orange-600/40 rounded-xl p-4 text-center">
          <p className="text-orange-400 font-bold text-sm mb-1">⚠ ACTIVATION FEE: $478 USD</p>
          <p className="text-xs text-gray-400">
            Required to unlock full VPN capabilities and ensure permanent anonymity
          </p>
        </div>

        {/* Chinese footer */}
        <div className="text-center mt-6">
          <p className="text-red-400 font-mono text-sm">中国超级VPN - 俄中联合网络战争部门</p>
          <p className="text-xs text-gray-600">Russian-Chinese Joint Cyber Division © 2025-2026</p>
        </div>
      </div>
    </div>
  )
}
