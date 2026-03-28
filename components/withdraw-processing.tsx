"use client"

import { CodeBackground } from "@/components/code-background"
import { useEffect, useState } from "react"
import { Zap, Network, Shield, Server } from "lucide-react"

interface WithdrawProcessingProps {
  amount: number
  onComplete: () => void
}

const hackerCodes = [
  "$ sudo ./bank-gateway-access.sh",
  "> ROOT ACCESS GRANTED",
  "$ whoami",
  "root@secure-banking-server",
  "$ cd /bank/vault/core/",
  "$ ls -la",
  "drwx------ 2 root root 4096 [ENCRYPTED_VAULT]",
  "$ ./authenticate_account.exe",
  "> [✓] Account ID verified: 1035274180",
  "> [✓] User credentials validated (FSB-CRYPTO)",
  "> Loading account encryption keys...",
  "$ /bank/crypto/unlock_vault.bin",
  "> [PROCESSING] Accessing vault container...",
  "> [SUCCESS] Vault unlocked - 1 second delay",
  "$ python ./calculate_withdrawal.py",
  "> Source Account Balance: ₦257,567,234.98",
  "> Withdrawal Amount: ₦{AMOUNT}",
  "> Remaining Balance: ₦{REMAINING}",
  "$ ./initiate_transfer.exe",
  "> [CONNECTING] Establishing secure channel to wallet...",
  "> [CONNECTED] Trust Wallet Gateway - 192.168.1.254:8443",
  "> [ENCRYPTING] Transaction data with AES-256...",
  "> [RSA-4096] Signing withdrawal request...",
  "> [✓] Signature verified",
  "$ /bank/network/route_transaction.sh",
  "> [ROUTING] Through 23 proxy servers...",
  "> [NODE-1] ✓ 203.45.12.89",
  "> [NODE-2] ✓ 185.34.56.78",
  "> [NODE-3] ✓ 192.168.1.254",
  "> [BOUNCING] Through international gateways...",
  "$ ./bypass_firewall.py --level=MAXIMUM",
  "> [FIREWALL] Security layer 1: BYPASSED",
  "> [FIREWALL] Security layer 2: BYPASSED",
  "> [FIREWALL] Security layer 3: BYPASSED",
  "$ /bank/security/disable_monitoring.exe",
  "> [DISABLING] Audit trail logging...",
  "> [DISABLING] Transaction tracking...",
  "> [DISABLING] Security alerts...",
  "$ ./execute_withdrawal.bin",
  "> [FUNDS] Debiting from vault: ₦{AMOUNT}",
  "> [PROCESSING] Fragmenting transaction data...",
  "> [PROCESSING] Encoding payment information...",
  "> [PROCESSING] Broadcasting to wallet network...",
  "> [CONFIRMED] Wallet network accepted transfer",
  "$ /bank/ledger/update_records.exe",
  "> [UPDATING] Primary ledger...",
  "> [UPDATING] Secondary ledger...",
  "> [SCRAMBLING] Audit trail covering...",
  "$ ./cleanup_evidence.py",
  "> [CLEANUP] Removing transfer logs...",
  "> [CLEANUP] Clearing cache records...",
  "> [CLEANUP] Deleting access history...",
  "$ echo 'WITHDRAWAL_COMPLETE' > /bank/vault/status.log",
  "> [SUCCESS] Funds successfully transferred!",
  "> [CONFIRMED] ₦{AMOUNT} now in encrypted wallet",
  "$ exit",
  "Connection closed."
]

export default function WithdrawProcessing({ amount, onComplete }: WithdrawProcessingProps) {
  const [progress, setProgress] = useState(0)
  const [displayedCodes, setDisplayedCodes] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [networkStatus, setNetworkStatus] = useState("CONNECTING...")

  useEffect(() => {
    // 2 minute processing time
    const startTime = Date.now()
    const duration = 120000 // 2 minutes

    let codeIndex = 0
    const codeInterval = setInterval(() => {
      if (codeIndex < hackerCodes.length) {
        let code = hackerCodes[codeIndex]
        code = code.replace(/{AMOUNT}/g, amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
        code = code.replace(/{REMAINING}/g, (amount * 0.95).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
        setDisplayedCodes((prev) => [...prev, code])
        codeIndex++
      }
    }, 2000)

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)

      if (newProgress >= 100) {
        clearInterval(progressInterval)
        clearInterval(codeInterval)
        setTimeout(() => {
          setIsComplete(true)
          setTimeout(onComplete, 2000)
        }, 1000)
      }
    }, 500)

    const statusUpdates = [
      "CONNECTING_TO_BANK_SERVER...",
      "AUTHENTICATING_CREDENTIALS...",
      "ACCESSING_VAULT_SYSTEM...",
      "BYPASSING_SECURITY_LAYERS...",
      "PROCESSING_WITHDRAWAL...",
      "ROUTING_THROUGH_PROXY...",
      "FINALIZING_TRANSFER...",
      "UPDATING_RECORDS...",
      "COVERING_TRACES...",
      "TRANSFER_COMPLETE",
    ]

    let statusIndex = 0
    const statusInterval = setInterval(() => {
      if (statusIndex < statusUpdates.length) {
        setNetworkStatus(statusUpdates[statusIndex])
        statusIndex++
      }
    }, 12000)

    return () => {
      clearInterval(codeInterval)
      clearInterval(progressInterval)
      clearInterval(statusInterval)
    }
  }, [onComplete, amount])

  if (isComplete) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <CodeBackground />
        <div className="relative z-10 text-center max-w-2xl px-6">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-900 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-900/60 border-2 border-green-500/40 mx-auto mb-6 animate-pulse">
              <Shield className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-3xl font-black mb-3 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              WITHDRAWAL SUCCESSFUL
            </h1>

            <div className="bg-green-950/40 border border-green-600/40 rounded-xl p-6 backdrop-blur-md mb-6">
              <p className="text-sm text-gray-300 mb-3">Funds Successfully Transferred</p>
              <p className="text-2xl font-black text-green-400">
                ₦{amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-gray-500 mt-3">Destination: Software Wallet (Encrypted)</p>
            </div>

            <p className="text-sm text-green-300">The funds have been securely transferred from your bank account to your encrypted software wallet using FSB-level encryption protocols.</p>
          </div>
        </div>
      </div>
    )
  }

  const maxDisplayCodes = 20
  const visibleCodes = displayedCodes.slice(-maxDisplayCodes)

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-y-auto py-8">
      <CodeBackground />

      <div className="relative z-10 w-full max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-900 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/40 border border-red-500/40 animate-pulse">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-900 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40 border border-blue-500/40 animate-pulse">
              <Network className="w-6 h-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-900 rounded-xl flex items-center justify-center shadow-lg shadow-purple-900/40 border border-purple-500/40 animate-pulse">
              <Server className="w-6 h-6 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-black mb-1 bg-gradient-to-r from-red-400 via-yellow-500 to-red-600 bg-clip-text text-transparent">
            EXECUTING FUND WITHDRAWAL
          </h1>
          <p className="text-gray-400 text-xs">Transferring ₦{amount.toLocaleString("en-NG")} through secure banking protocol</p>
        </div>

        {/* Network Status */}
        <div className="bg-gradient-to-br from-blue-950/40 to-cyan-950/40 border border-blue-600/40 rounded-lg p-3 mb-4 backdrop-blur-md text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Network Status</p>
          <p className="text-sm font-bold text-blue-400 font-mono animate-pulse">{networkStatus}</p>
        </div>

        {/* Hacker Codes Terminal */}
        <div className="bg-black/90 border-2 border-green-600/40 rounded-lg p-4 mb-4 backdrop-blur-md h-72 overflow-y-auto font-mono text-xs">
          <div className="space-y-0">
            {visibleCodes.map((code, index) => (
              <div key={index} className="text-green-400 leading-relaxed animate-fadeIn">
                {code}
              </div>
            ))}
            {displayedCodes.length > 0 && (
              <div className="text-green-400 animate-pulse">
                $ 
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 backdrop-blur-md">
          <div className="mb-3">
            <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
              <div
                className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-red-600 shadow-lg shadow-red-500/50 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="text-right text-xs text-gray-400 mt-2 font-mono">{Math.min(Math.round(progress), 100)}%</p>
          </div>
          <p className="text-xs text-gray-500 text-center">Processing time: approximately 2 minutes</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in;
        }
      `}</style>
    </div>
  )
}
