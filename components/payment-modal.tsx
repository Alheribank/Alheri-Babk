"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, Copy, Clock, Loader2 } from "lucide-react"
import Image from "next/image"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  toolName: string
  toolPrice: string
}

type PaymentStep = "payment" | "confirming" | "waiting"

export function PaymentModal({ isOpen, onClose, toolName, toolPrice }: PaymentModalProps) {
  const [step, setStep] = useState<PaymentStep>("payment")
  const [copied, setCopied] = useState(false)

  const bitcoinAddress = "3LNP7YdRwCgnNXNW4BnWJ5X6kC7SNW2cQo"

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(bitcoinAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleConfirmPayment = () => {
    setStep("confirming")
    setTimeout(() => {
      setStep("waiting")
    }, 1500)
  }

  const handleClose = () => {
    setStep("payment")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-gray-900 border-gray-700 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {step === "payment" && "Bitcoin Payment"}
            {step === "confirming" && "Confirming Payment..."}
            {step === "waiting" && "Payment Submitted"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Payment Step */}
          {step === "payment" && (
            <>
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Product:</span>
                  <span className="font-semibold text-white">{toolName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Amount:</span>
                  <span className="font-bold text-2xl text-yellow-400">{toolPrice}</span>
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-gray-300 text-sm">
                  Scan the QR code or copy the Bitcoin address below to complete your payment
                </p>

                <div className="flex justify-center">
                  <div className="bg-white p-4 rounded-lg">
                    <Image src="/bitcoin-qr.png" alt="Bitcoin QR Code" width={250} height={250} className="rounded" />
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <p className="text-xs text-gray-400 mb-2">Bitcoin Address:</p>
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-yellow-400 text-sm break-all flex-1">{bitcoinAddress}</code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCopyAddress}
                      className="border-gray-600 hover:bg-gray-700 flex-shrink-0 bg-transparent"
                    >
                      {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-4">
                  <p className="text-orange-300 text-xs">
                    <strong>⚠️ IMPORTANT:</strong> Send exactly {toolPrice} in Bitcoin to the address above. After
                    sending, click "I Have Sent Payment" below.
                  </p>
                </div>

                <Button
                  onClick={handleConfirmPayment}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                >
                  I Have Sent Payment
                </Button>
              </div>
            </>
          )}

          {/* Confirming Step */}
          {step === "confirming" && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="w-16 h-16 text-green-500 animate-spin mb-4" />
              <p className="text-gray-300 text-center">Confirming your payment...</p>
            </div>
          )}

          {/* Waiting Step */}
          {step === "waiting" && (
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center py-4">
                <div className="w-20 h-20 bg-yellow-600/20 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-10 h-10 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">Payment Verification in Progress</h3>
                <p className="text-gray-300 text-center text-sm">Your payment has been submitted successfully!</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Payment Received</h4>
                    <p className="text-gray-400 text-sm">We have received your payment notification</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-yellow-400 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Verification in Progress</h4>
                    <p className="text-gray-400 text-sm">
                      Please wait while we verify your Bitcoin transaction on the blockchain
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-gray-400 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-400 mb-1">Access Granted</h4>
                    <p className="text-gray-500 text-sm">
                      You will receive download access once verification is complete
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4">
                <p className="text-yellow-300 text-sm text-center">
                  <strong>⏰ VERIFICATION TIME:</strong> Please allow up to <strong>24 hours</strong> for payment
                  verification. You will receive access to download and use <strong>{toolName}</strong> once the
                  transaction is confirmed on the blockchain.
                </p>
              </div>

              <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
                <p className="text-blue-300 text-xs text-center">
                  💡 <strong>TIP:</strong> Save your transaction ID for reference. You can check the status of your
                  Bitcoin transaction on any blockchain explorer.
                </p>
              </div>

              <Button onClick={handleClose} className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
