"use client"

import { useState, useEffect } from "react"
import { Shield, Loader2, Globe, Zap, Server, Wifi, Lock } from "lucide-react"

interface ChinaVPNLoadingProps {
  onComplete: () => void
  selectedProvince: string
}

const chineseHackingCodes = [
  "正在建立安全连接...",
  "加密隧道协议激活中...",
  "连接中国防火墙绕过系统...",
  "初始化量子加密引擎...",
  "验证FSB-中国联合安全协议...",
  "访问中国国家数据库...",
  "绕过网络监控系统...",
  "激活军事级VPN隧道...",
  "连接中国银行网络...",
  "加载省级服务器节点...",
  "解密区域安全层...",
  "建立匿名路由...",
  "同步中俄加密密钥...",
  "访问受限网络区域...",
  "激活深度隐身模式...",
  "连接地下服务器农场...",
  "绕过政府防火墙...",
  "初始化神经网络保护...",
  "激活量子纠缠通道...",
  "连接军事卫星网络...",
]

export function ChinaVPNLoading({ onComplete, selectedProvince }: ChinaVPNLoadingProps) {
  const [progress, setProgress] = useState(0)
  const [currentCode, setCurrentCode] = useState(0)
  const [connectionStatus, setConnectionStatus] = useState("INITIALIZING")
  const [serverPing, setServerPing] = useState(0)

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 1.67
      })
    }, 1000)

    const codeInterval = setInterval(() => {
      setCurrentCode((prev) => (prev + 1) % chineseHackingCodes.length)
    }, 800)

    const statusInterval = setInterval(() => {
      const statuses = ["CONNECTING", "ENCRYPTING", "TUNNELING", "BYPASSING", "SECURING", "ESTABLISHING"]
      setConnectionStatus(statuses[Math.floor(Math.random() * statuses.length)])
    }, 2000)

    const pingInterval = setInterval(() => {
      setServerPing(Math.floor(Math.random() * 50) + 10)
    }, 500)

    return () => {
      clearInterval(progressInterval)
      clearInterval(codeInterval)
      clearInterval(statusInterval)
      clearInterval(pingInterval)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
      {/* Chinese hacking codes background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-red-500 font-mono text-xs whitespace-nowrap animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          >
            {chineseHackingCodes[Math.floor(Math.random() * chineseHackingCodes.length)]}
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl px-6 text-center">
        {/* Main loading icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-red-600 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-900/80 animate-pulse">
              <Shield className="w-16 h-16 text-white" />
            </div>
            <div
              className="absolute inset-0 border-4 border-red-500/50 rounded-full animate-spin"
              style={{ animationDuration: "3s" }}
            ></div>
            <div
              className="absolute -inset-4 border-2 border-yellow-500/30 rounded-full animate-spin"
              style={{ animationDuration: "5s", animationDirection: "reverse" }}
            ></div>
          </div>
        </div>

        <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 bg-clip-text text-transparent">
          中国VPN连接
        </h1>
        <h2 className="text-2xl font-bold text-white mb-2">CHINA VPN CONNECTING</h2>
        <p className="text-gray-400 mb-6">Establishing secure tunnel to {selectedProvince}</p>

        {/* Connection status */}
        <div className="bg-gradient-to-r from-red-950/60 to-yellow-950/40 border border-red-600/40 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <Globe className="w-6 h-6 text-red-400 mx-auto mb-1 animate-spin" style={{ animationDuration: "4s" }} />
              <p className="text-xs text-gray-500">Region</p>
              <p className="text-sm font-bold text-red-400">CHINA</p>
            </div>
            <div className="text-center">
              <Server className="w-6 h-6 text-yellow-400 mx-auto mb-1 animate-pulse" />
              <p className="text-xs text-gray-500">Server</p>
              <p className="text-sm font-bold text-yellow-400">ACTIVE</p>
            </div>
            <div className="text-center">
              <Wifi className="w-6 h-6 text-green-400 mx-auto mb-1 animate-pulse" />
              <p className="text-xs text-gray-500">Ping</p>
              <p className="text-sm font-bold text-green-400">{serverPing}ms</p>
            </div>
            <div className="text-center">
              <Lock className="w-6 h-6 text-blue-400 mx-auto mb-1 animate-pulse" />
              <p className="text-xs text-gray-500">Encryption</p>
              <p className="text-sm font-bold text-blue-400">AES-512</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mb-4">
            <Loader2 className="w-5 h-5 text-red-400 animate-spin" />
            <span className="text-red-400 font-mono text-sm">{connectionStatus}...</span>
          </div>

          {/* Progress bar */}
          <div className="relative h-4 bg-gray-900 rounded-full overflow-hidden mb-4">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-white drop-shadow-lg">{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Current code display */}
          <div className="bg-black/60 rounded-lg p-3 border border-red-600/30">
            <p className="text-red-400 font-mono text-sm animate-pulse">{chineseHackingCodes[currentCode]}</p>
          </div>
        </div>

        {/* Power indicators */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-red-950/40 border border-red-600/30 rounded-lg p-3 text-center">
            <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-1 animate-pulse" />
            <p className="text-xs text-gray-400">Power</p>
            <p className="text-sm font-bold text-yellow-400">MAXIMUM</p>
          </div>
          <div className="bg-red-950/40 border border-red-600/30 rounded-lg p-3 text-center">
            <Shield className="w-5 h-5 text-red-400 mx-auto mb-1 animate-pulse" />
            <p className="text-xs text-gray-400">Security</p>
            <p className="text-sm font-bold text-red-400">MILITARY</p>
          </div>
          <div className="bg-red-950/40 border border-red-600/30 rounded-lg p-3 text-center">
            <Globe className="w-5 h-5 text-green-400 mx-auto mb-1 animate-pulse" />
            <p className="text-xs text-gray-400">Coverage</p>
            <p className="text-sm font-bold text-green-400">GLOBAL</p>
          </div>
        </div>

        <p className="text-xs text-gray-500 font-mono">
          Establishing quantum-encrypted tunnel through Chinese firewall...
        </p>
      </div>
    </div>
  )
}
