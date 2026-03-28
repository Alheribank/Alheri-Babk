"use client"

import { useEffect, useState } from "react"
import { CodeBackground } from "@/components/code-background"
import { Database, Shield } from "lucide-react"

export function BalanceLoading({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const duration = 5000 // 5 seconds
    const interval = 50
    const increment = 100 / (duration / interval)

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 300)
          return 100
        }
        return prev + increment
      })
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <CodeBackground />

      <div className="relative z-10 w-full max-w-2xl px-6">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-900 rounded-3xl flex items-center justify-center shadow-2xl shadow-green-900/60 border-2 border-green-500/40 animate-pulse">
              <Database className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-black mb-4 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
            RETRIEVING ACCOUNT DATA
          </h1>
          <p className="text-gray-400 text-sm uppercase tracking-wider font-mono">Decrypting Banking Records</p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-mono text-gray-400">Decryption Progress</span>
            <span className="text-sm font-mono font-bold text-green-400">{Math.floor(progress)}%</span>
          </div>
          <div className="h-3 bg-gray-900/80 rounded-full border border-green-900/40 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 transition-all duration-300 ease-out shadow-lg shadow-green-500/50"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Programming Codes */}
        <div className="bg-black/60 border border-green-900/40 rounded-xl p-4 backdrop-blur-md overflow-hidden">
          <div className="space-y-1 font-mono text-xs">
            <div className="text-green-400 animate-pulse">[SQL] SELECT * FROM accounts WHERE id='2005220364'...</div>
            <div className="text-cyan-400 animate-pulse delay-100">
              [DECRYPT] AES_DECRYPT(balance, key) → Processing...
            </div>
            <div className="text-blue-400 animate-pulse delay-200">[AUTH] Validating BVN credentials... AUTHORIZED</div>
            <div className="text-yellow-400 animate-pulse delay-300">
              [FETCH] Retrieving transaction history... COMPLETE
            </div>
            <div className="text-purple-400 animate-pulse delay-500">[PARSE] Extracting account metadata... DONE</div>
            <div className="text-orange-400 animate-pulse delay-700">[FINAL] Compiling account summary... SUCCESS</div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600 font-mono flex items-center justify-center gap-2">
            <Shield className="w-3 h-3" />
            Secured connection via FSB encrypted protocols
          </p>
        </div>
      </div>
    </div>
  )
}
