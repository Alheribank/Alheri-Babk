"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ShoppingCart,
  Star,
  Building,
  Download,
  Shield,
  AlertTriangle,
  Lock,
  Network,
  Cpu,
} from "lucide-react"
import Link from "next/link"
import { CodeBackground } from "@/components/code-background"
import { NotificationModal } from "@/components/notification-modal"
import { useState } from "react"
import { PaymentModal } from "@/components/payment-modal"

export default function ToolsPage() {
  const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: number]: boolean }>({})
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean
    toolName: string
    toolPrice: string
  }>({
    isOpen: false,
    toolName: "",
    toolPrice: "",
  })

  const [notificationModal, setNotificationModal] = useState<{
    isOpen: boolean
    message: string
  }>({
    isOpen: false,
    message: "",
  })

  const toggleDescription = (toolId: number) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [toolId]: !prev[toolId],
    }))
  }

  const tools = [
    {
      id: 1,
      name: "Dark International Software",
      price: "$8,890",
      originalPrice: "$6,299",
      description:
        "Dark International is the legendary primary cyber warfare platform developed by elite Russian Federal Security Service (FSB) hackers and deployed by sophisticated state-sponsored cyber operations teams worldwide. This revolutionary system represents the pinnacle of Russian cyber engineering, providing comprehensive offensive capabilities against any digital infrastructure globally including banking networks, government systems, military installations, and critical infrastructure. The software employs advanced AI-driven attack vectors, quantum-resistant stealth protocols, and zero-day exploit arsenals that remain undetected by conventional security systems. WARNING: This is not ordinary software - it is a professional-grade cyber weapon that requires extreme caution, extensive training, and strict adherence to operational protocols. Before activating this system, you MUST first enable Dark S H U vpn to protect your identity and location, as failure to do so will expose you to serious legal consequences and potential counter-intelligence operations. This tool demands professional expertise and carries significant responsibility.",
      features: [
        "OTP BYPASSING - Advanced one-time password bypass techniques that render multi-factor authentication completely obsolete using quantum-neural prediction algorithms",
        "BANK ATTACK - Comprehensive financial system penetration toolkit with specialized modules for SWIFT networks, payment processors, ATM systems, and core banking infrastructures worldwide",
        "HARDWARE ATTACK - Physical device security assessment and exploitation tools for breaching air-gapped systems, IoT networks, POS terminals, and embedded security chips",
        "CLEAR HISTORY - Complete system trace removal and cleanup protocols that erase all forensic evidence from logs, registries, network traces, and hardware signatures",
        "MALWARE ATTACK - Custom payload generation and deployment system with polymorphic code engines that evade all antivirus and EDR solutions",
        "VPN PROTECTION - Integrated compatibility with Dark S H U vpn for mandatory identity protection and operational security during all cyber operations",
        "RUSSIAN DATABASE - Direct access to classified FSB cyber intelligence databases containing zero-day exploits, vulnerability catalogs, and global target infrastructure maps compiled by Russian state hackers",
      ],
      rating: 4.8,
      reviews: 156,
      category: "Primary Cyber Warfare",
      icon: Shield,
      popular: true,
      required: false,
    },
    {
      id: 2,
      name: "Dark S H U Software",
      price: "$6,000",
      originalPrice: "$4,299",
      description:
        "Dark S H U Software is the primary cyber warfare tool used by elite RUSSIAN HACKERS for conducting sophisticated cyber operations worldwide. This advanced system provides comprehensive attack capabilities against any digital infrastructure globally. WARNING: Before using this software, you must first activate Dark S H U vpn to protect your identity and avoid serious consequences in your life. This is not a simple software - it requires extreme caution and professional expertise.",
      features: [
        "OTP BYPASSING - Advanced one-time password bypass techniques",
        "BANK ATTACK - Financial system penetration testing tools",
        "HARDWARE ATTACK - Physical device security assessment",
        "CLEAR HISTORY - Complete system trace removal and cleanup",
        "MALWARE ATTACK - Custom payload generation and deployment",
      ],
      rating: 4.6,
      reviews: 89,
      category: "Security Testing",
      icon: Lock,
      popular: true,
    },
    {
      id: 4,
      name: "Cloud Account VPN",
      price: "$11,490",
      originalPrice: "$8,750",
      description:
        "Cloud Account VPN is not merely a network protection system - it is the essential gateway to a dimension of cyber capabilities that exists beyond conventional understanding. Engineered by Russia's most elite cryptographic specialists in classified FSB laboratories, this VPN represents the only secure conduit capable of channeling the immense power of the Cloud Account platform without catastrophic system failure. The VPN's revolutionary architecture creates an impenetrable quantum-encrypted tunnel that enables the legendary OFFLINE POS 6-DIGIT PENETRATION SYSTEM to operate at full capacity - a feat that would be impossible through standard network protocols. This VPN doesn't just protect your identity; it amplifies and stabilizes the Cloud Account's reality-defying capabilities, allowing you to breach air-gapped point-of-sale terminals across the globe while remaining completely invisible to all detection systems. The technology operates on principles that challenge the laws of digital physics - utilizing neural-adaptive encryption that evolves faster than any defensive AI can analyze, quantum-entangled data packets that exist in multiple network states simultaneously, and cognitive-interference protocols that literally confuse monitoring systems into ignoring your presence. Without this VPN, attempting to use Cloud Account would be like trying to contain a nuclear reaction in a paper bag - the raw power would destroy your entire digital infrastructure within seconds. ABSOLUTE REQUIREMENT: This VPN is not optional - it is the mandatory foundation that makes Cloud Account's god-tier capabilities accessible to human operators. Every cybersecurity professional who witnesses this VPN in action experiences a profound paradigm shift, realizing that everything they knew about network security was merely scratching the surface of what's truly possible.",
      features: [
        "OFFLINE POS 6-DIGIT AMPLIFICATION - Specialized quantum tunneling that enables and supercharges the Cloud Account's revolutionary offline POS penetration capabilities, allowing extraction of 6-digit authentication codes from completely air-gapped systems across unlimited distance with zero latency",
        "QUANTUM-ENTANGLED ENCRYPTION - Military-grade Russian cryptographic protocols that exist in quantum superposition, making your network traffic literally undetectable by creating data packets that simultaneously exist and don't exist until observed",
        "NEURAL-ADAPTIVE STEALTH TECHNOLOGY - AI-powered invisibility system that learns and adapts to security monitoring in real-time, actively confusing defensive systems by generating cognitive interference patterns that make analysts question their own perception",
        "CLOUD ACCOUNT POWER STABILIZATION - Exclusive compatibility architecture that safely channels the immense processing power of Cloud Account's quantum-neural systems without causing catastrophic infrastructure collapse or detection",
        "GLOBAL BANK NETWORK DOMINATION - Authenticated access to restricted banking infrastructures worldwide, providing the secure foundation for Cloud Account's financial system penetration capabilities across all continents simultaneously",
        "FSB CYBER DIVISION VALIDATION - Tested and certified by Russia's Federal Security Service cyber warfare units in real-world operations, proven effective against the world's most advanced security systems",
        "MANDATORY CLOUD ACCOUNT INTEGRATION - Absolutely essential for proper Cloud Account functionality - attempting to operate Cloud Account without this VPN will result in immediate system failure and potential exposure",
      ],
      rating: 4.9,
      reviews: 312,
      category: "Revolutionary VPN",
      icon: Network,
      popular: false,
      required: true,
      enterprise: true,
    },
    {
      id: 5,
      name: "Cloud Account",
      price: "$8,989",
      originalPrice: "$6,500",
      description:
        "Cloud Account is the primary cyber warfare tool used by elite RUSSIAN HACKERS for conducting the most sophisticated cyber operations worldwide. This revolutionary system was engineered by Russia's Federal Security Service (FSB) Cyber Division and provides unparalleled attack capabilities against any digital infrastructure on the planet. The legendary OFFLINE POS 6-DIGIT PENETRATION SYSTEM enables you to breach completely air-gapped point-of-sale terminals and extract 6-digit authentication codes from systems that are entirely offline - a capability that defies all known cybersecurity principles and represents the pinnacle of Russian hacking technology. WARNING: Before using this software, you MUST first activate Cloud Account VPN to protect your identity and avoid catastrophic consequences in your life. This is not ordinary software - it operates at a level that transcends human comprehension and requires absolute caution, professional expertise, and mandatory VPN protection. Failure to use proper VPN protection will result in immediate exposure and serious legal problems. If you are a new hacker, we STRONGLY recommend finding an experienced professional mentor to guide you through proper usage protocols.",
      features: [
        "OFFLINE POS 6-DIGIT PENETRATION - Revolutionary capability to extract authentication codes from completely offline and air-gapped point-of-sale systems worldwide, bypassing all security measures with supernatural precision",
        "QUANTUM-NEURAL CLOUD INTERFACE - Direct access to global financial cloud infrastructures using quantum processing that operates beyond conventional computing limitations",
        "FSB CYBER DIVISION ENGINEERING - Developed by Russia's most elite programmers in classified facilities using technologies decades ahead of public knowledge",
        "BANK NETWORK DOMINATION - Comprehensive penetration tools for global banking systems, payment processors, ATM networks, and critical financial infrastructure",
        "INVISIBLE QUANTUM ENCRYPTION - Encryption protocols that exist in quantum superposition, making detection physically impossible by any security infrastructure",
        "ADAPTIVE NEURAL DEFENSE BYPASS - Self-evolving AI that learns and adapts to security systems faster than human comprehension, rendering all defensive measures obsolete",
        "PREDICTIVE TRANSACTION MANIPULATION - AI algorithms that predict and alter financial flows before they occur, operating beyond real-time processing capabilities",
        "MANDATORY VPN REQUIREMENT - Cloud Account VPN is absolutely essential for safe operations - attempting to use this software without proper VPN protection will result in catastrophic exposure",
      ],
      rating: 5.0,
      reviews: 247,
      category: "Revolutionary Cyber Warfare",
      icon: Cpu,
      popular: true,
      enterprise: true,
      flagship: true,
    },
  ]

  // ——— PDF HELPERS ———
  const downloadToolPDF = async (tool: (typeof tools)[0]) => {
    try {
      const jsPDF = (await import("jspdf")).default
      const doc = new jsPDF()

      doc.setFont("helvetica", "bold")
      doc.setFontSize(20)
      doc.text("Dark softwares - Tool Information", 20, 30)

      doc.setFontSize(16)
      doc.text(tool.name, 20, 50)

      doc.setFont("helvetica", "normal")
      doc.setFontSize(14)
      doc.text(`Price: ${tool.price}`, 20, 70)
      if (tool.originalPrice) doc.text(`Original Price: ${tool.originalPrice}`, 20, 85)
      doc.text(`Category: ${tool.category}`, 20, 100)
      doc.text(`Rating: ${tool.rating}/5 (${tool.reviews} reviews)`, 20, 115)

      doc.setFont("helvetica", "bold")
      doc.text("Description:", 20, 135)
      doc.setFont("helvetica", "normal")

      const splitDescription = doc.splitTextToSize(tool.description, 170)
      doc.text(splitDescription, 20, 150)

      if (tool.features?.length) {
        const yStart = 150 + splitDescription.length * 7 + 20
        doc.setFont("helvetica", "bold")
        doc.text("Key Features:", 20, yStart)
        doc.setFont("helvetica", "normal")
        tool.features.forEach((feature, i) => {
          const featureLines = doc.splitTextToSize(`• ${feature}`, 165)
          featureLines.forEach((line, lineIndex) => {
            doc.text(line, 25, yStart + 15 + i * 15 + lineIndex * 7)
          })
        })
      }

      doc.setFont("helvetica", "bold")
      doc.setTextColor(255, 0, 0)
      doc.text("WARNING:", 20, 280)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(0, 0, 0)
      const warningText = doc.splitTextToSize(
        "This tool is very powerful and designed for professional security testing only. Use it carefully and responsibly. We do not take responsibility for how you use it.",
        170,
      )
      doc.text(warningText, 20, 295)

      doc.save(`${tool.name.replace(/\s+/g, "_")}_Info.pdf`)

      console.log("PDF downloaded successfully")
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error downloading PDF. Please try again.")
    }
  }

  const downloadAllToolsPDF = async () => {
    try {
      const jsPDF = (await import("jspdf")).default
      const doc = new jsPDF()

      doc.setFont("helvetica", "bold")
      doc.setFontSize(24)
      doc.text("Dark softwares", 20, 40)
      doc.setFontSize(18)
      doc.text("Professional Security Tools Catalog", 20, 60)
      doc.setFont("helvetica", "normal")
      doc.setFontSize(12)
      doc.text("These tools are for professionals only.", 20, 80)
      doc.text("Make sure you know how to use them responsibly.", 20, 95)
      doc.text("We do not take responsibility for any problems that may occur.", 20, 110)

      tools.forEach((tool, idx) => {
        if (idx > 0) doc.addPage()
        const y0 = idx === 0 ? 140 : 30

        doc.setFont("helvetica", "bold")
        doc.setFontSize(16)
        doc.text(`${idx + 1}. ${tool.name}`, 20, y0)

        doc.setFont("helvetica", "normal")
        doc.setFontSize(12)
        doc.text(`Price: ${tool.price} (Original: ${tool.originalPrice || "N/A"})`, 20, y0 + 20)
        doc.text(`Category: ${tool.category}`, 20, y0 + 35)
        doc.text(`Rating: ${tool.rating}/5 (${tool.reviews} reviews)`, 20, y0 + 50)

        doc.setFont("helvetica", "bold")
        doc.text("Description:", 20, y0 + 70)
        doc.setFont("helvetica", "normal")

        const descLines = doc.splitTextToSize(tool.description, 170)
        doc.text(descLines, 20, y0 + 85)

        if (tool.features?.length) {
          const yFeat = y0 + 85 + descLines.length * 5 + 15
          doc.setFont("helvetica", "bold")
          doc.text("Key Features:", 20, yFeat)
          doc.setFont("helvetica", "normal")
          tool.features.forEach((feature, i) => {
            const featureLines = doc.splitTextToSize(`• ${feature}`, 165)
            featureLines.forEach((line, lineIndex) => {
              doc.text(line, 25, yFeat + 15 + i * 15 + lineIndex * 7)
            })
          })
        }
      })

      doc.save("Dark_Softwares_Complete_Catalog.pdf")
      console.log("PDF catalog downloaded successfully")

      setTimeout(() => {
        shareViaWhatsApp()
      }, 1000)
    } catch (error) {
      console.error("Error generating PDF catalog:", error)
      alert("Error downloading PDF catalog. Please try again.")
    }
  }

  const shareViaWhatsApp = () => {
    const catalogText = `🔥 *Dark Softwares - Professional Cyber Warfare Tools* 🔥

🛡️ *Dark International Software* - $8,890
👑 PRIMARY Russian hacker cyber warfare tool
⚡ AI-Adaptive Penetration Systems
🧠 Quantum Encryption Bypass
🌍 Global Infrastructure Targeting
⚠️ REQUIRES Dark S H U vpn for protection

🛡️ *Dark S H U Software* - $6,000
🎯 Elite Russian hacker cyber warfare tool

🌐 *Cloud Account VPN* - $11,490
⚡ REVOLUTIONARY VPN - Quantum-encrypted gateway
💎 OFFLINE POS 6-DIGIT AMPLIFICATION
🧠 Neural-adaptive stealth technology
🏦 Global Bank Network domination
🇷🇺 FSB Cyber Division validated
⚠️ MANDATORY for Cloud Account operations

🚀 *Cloud Account* - $8,989
👑 FLAGSHIP - Revolutionary FSB Cyber Warfare Platform
💎 OFFLINE POS 6-DIGIT PENETRATION SYSTEM
🧠 Quantum-Neural Cloud Interface
🌍 Global Infrastructure Domination
⚡ Technology Beyond Human Comprehension

⚠️ *CRITICAL NOTICE:*
- Russian FSB-engineered revolutionary technology
- MANDATORY for serious cybersecurity professionals
- Offline POS penetration capabilities
- Quantum-resistant encryption
- Validated by international security institutions

💰 No refunds • No support after purchase
🚀 Instant download available
🔒 For authorized professionals only

Contact us for enterprise licensing!`

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(catalogText)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleBuyNow = (toolId: number) => {
    const tool = tools.find((t) => t.id === toolId)
    if (!tool) return

    setPaymentModal({
      isOpen: true,
      toolName: tool.name,
      toolPrice: tool.price,
    })
  }

  const showNotification = (message: string) => {
    setNotificationModal({
      isOpen: true,
      message: message,
    })
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  return (
    <div className="min-h-screen relative">
      <CodeBackground />

      {/* Header */}
      <header className="container mx-auto px-4 py-3 relative z-10">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-blue-400 hover:text-blue-300">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">Dark softwares</span>
          </div>
        </nav>
      </header>

      {/* Page Header */}
      <section className="container mx-auto px-4 py-6 text-center relative z-10">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Professional Cyber Warfare Tools</h1>

        <div className="max-w-4xl mx-auto mb-6">
          <div className="bg-gradient-to-br from-red-950/40 via-red-900/30 to-black/40 border-2 border-red-500/50 rounded-xl p-6 backdrop-blur-sm shadow-2xl">
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-red-400 mr-3 animate-pulse" />
              <h2 className="text-xl font-bold text-red-400">CRITICAL SECURITY NOTICE</h2>
              <AlertTriangle className="w-8 h-8 text-red-400 ml-3 animate-pulse" />
            </div>

            <div className="space-y-4 text-left text-gray-200 text-sm leading-relaxed">
              <p className="text-center font-semibold text-red-300 text-base">
                Welcome to the most advanced cyber warfare arsenal in existence. Read everything carefully before
                proceeding.
              </p>

              <div className="bg-black/30 p-4 rounded-lg border border-red-500/30">
                <h3 className="font-bold text-red-400 mb-2">🇷🇺 RUSSIAN FSB ORIGIN:</h3>
                <p>
                  These software tools are developed by elite Russian Federal Security Service (FSB) cyber division
                  programmers through classified operations in underground facilities. This is not commercial software -
                  this is military-grade cyber warfare technology used by Russian state-sponsored hackers for real-world
                  operations across 147 countries.
                </p>
              </div>

              <div className="bg-black/30 p-4 rounded-lg border border-yellow-500/30">
                <h3 className="font-bold text-yellow-400 mb-2">⚠️ MANDATORY REQUIREMENTS:</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>
                    <strong>Dark International Software</strong> requires <strong>Dark S H U vpn</strong> activation
                    BEFORE use - failure to do so will expose your identity and location
                  </li>
                  <li>
                    <strong>Cloud Account</strong> requires <strong>Cloud Account VPN</strong> activation BEFORE use -
                    this is NON-NEGOTIABLE for operational security
                  </li>
                  <li>
                    Each software has specific operational protocols - you MUST understand them completely before
                    deployment
                  </li>
                  <li>VPN protection is not optional - it is the difference between anonymity and arrest</li>
                </ul>
              </div>

              <div className="bg-black/30 p-4 rounded-lg border border-orange-500/30">
                <h3 className="font-bold text-orange-400 mb-2">🎯 OPERATIONAL REALITY:</h3>
                <p>
                  These are not simulation tools or educational software. Every feature you see is functional and
                  operational. The Russian hackers who developed these tools in 2025-2026 have deployed them
                  successfully against major financial institutions, government networks, and critical infrastructure
                  worldwide. When you purchase these tools, you assume full responsibility for understanding proper
                  usage protocols and legal compliance in your jurisdiction.
                </p>
              </div>

              <div className="bg-black/30 p-4 rounded-lg border border-red-600/50">
                <h3 className="font-bold text-red-500 mb-2 text-center text-base">🚨 FINAL WARNING 🚨</h3>
                <p className="font-semibold text-center">
                  If you are not an experienced professional with deep understanding of cyber operations, network
                  security, and legal frameworks - DO NOT PURCHASE. These tools carry serious consequences. There are NO
                  REFUNDS, NO SUPPORT after purchase, and NO TECHNICAL ASSISTANCE. You must know exactly what you are
                  doing. Read every description, every warning, and every operational requirement before clicking "Buy
                  Now".
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 text-xs text-gray-400 mb-4">
          <span>✓ Russian FSB Engineering</span>
          <span>✓ Military-Grade Technology</span>
          <span>✓ No Refunds Policy</span>
          <span>✓ Professional Use Only</span>
        </div>

        <Button onClick={downloadAllToolsPDF} className="bg-green-600 hover:bg-green-700 text-white">
          <Download className="w-4 h-4 mr-2" />
          Download Complete Catalog & Share
        </Button>
      </section>

      {/* Tools Grid */}
      <section className="container mx-auto px-4 py-6 relative z-10">
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6 max-w-8xl mx-auto">
          {tools.map((tool) => {
            const IconComponent = tool.icon
            const isExpanded = expandedDescriptions[tool.id] || false
            const shouldTruncate = tool.description.length > 180

            return (
              <Card
                key={tool.id}
                className={`border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 relative bg-gray-900/50 backdrop-blur-sm ${
                  tool.flagship ? "ring-2 ring-yellow-500/50" : ""
                }`}
              >
                {tool.flagship && (
                  <Badge className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs font-bold">
                    FLAGSHIP
                  </Badge>
                )}
                {tool.popular && !tool.flagship && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs">Popular</Badge>
                )}
                {tool.required && (
                  <Badge className="absolute -top-1 -left-1 bg-orange-500 text-white text-xs">Required</Badge>
                )}
                {tool.enterprise && !tool.required && !tool.flagship && (
                  <Badge className="absolute -top-1 -left-1 bg-purple-500 text-white text-xs">Enterprise</Badge>
                )}
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-8 h-8 ${
                        tool.flagship ? "bg-yellow-600/20" : "bg-blue-600/20"
                      } rounded-lg flex items-center justify-center`}
                    >
                      <IconComponent className={`w-4 h-4 ${tool.flagship ? "text-yellow-400" : "text-blue-400"}`} />
                    </div>
                    <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                      {tool.category}
                    </Badge>
                  </div>
                  <CardTitle className={`text-lg ${tool.flagship ? "text-yellow-300" : "text-white"}`}>
                    {tool.name}
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-sm">
                    {shouldTruncate && !isExpanded ? truncateText(tool.description, 180) : tool.description}
                    {shouldTruncate && (
                      <button
                        onClick={() => toggleDescription(tool.id)}
                        className="text-blue-400 hover:text-blue-300 ml-2 text-xs underline"
                      >
                        {isExpanded ? "read less" : "read more"}
                      </button>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {/* Features */}
                    {tool.features && tool.features.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm text-gray-300 mb-2">
                          {tool.id === 1
                            ? "Protection Features:"
                            : tool.id === 4
                              ? "Cloud Account VPN Features:"
                              : tool.id === 5
                                ? "Revolutionary Cyber Warfare Features:"
                                : "Advanced Security Features:"}
                        </h4>
                        <ul className="text-xs text-gray-400 space-y-1">
                          {tool.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <span
                                className={`w-1 h-1 ${
                                  tool.id === 1
                                    ? "bg-orange-400"
                                    : tool.id === 4
                                      ? "bg-purple-400"
                                      : tool.id === 5
                                        ? "bg-yellow-400"
                                        : "bg-red-400"
                                } rounded-full mr-2 mt-2 flex-shrink-0`}
                              ></span>
                              <span className="leading-relaxed">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Rating */}
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < Math.floor(tool.rating) ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">
                        {tool.rating} ({tool.reviews} reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className={`text-xl font-bold ${tool.flagship ? "text-yellow-300" : "text-white"}`}>
                          {tool.price}
                        </span>
                        <span className="text-xs text-gray-500 line-through ml-2">{tool.originalPrice}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => downloadToolPDF(tool)}
                          className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800 bg-transparent"
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleBuyNow(tool.id)}
                          className={`flex items-center space-x-1 text-xs ${
                            tool.id === 1
                              ? "bg-orange-600 hover:bg-orange-700"
                              : tool.id === 4
                                ? "bg-purple-600 hover:bg-purple-700"
                                : tool.id === 5
                                  ? "bg-yellow-600 hover:bg-yellow-700 text-black font-bold"
                                  : "bg-blue-600 hover:bg-blue-700"
                          }`}
                        >
                          <ShoppingCart className="w-3 h-3" />
                          <span>Buy Now</span>
                        </Button>
                      </div>
                    </div>

                    {/* Warning */}
                    <div
                      className={`${
                        tool.id === 1
                          ? "bg-orange-900/30 border-orange-700"
                          : tool.id === 4
                            ? "bg-purple-900/30 border-purple-700"
                            : tool.id === 5
                              ? "bg-yellow-900/30 border-yellow-700"
                              : "bg-red-900/30 border-red-700"
                      } border rounded-lg p-3`}
                    >
                      <p
                        className={`text-xs ${
                          tool.id === 1
                            ? "text-orange-300"
                            : tool.id === 4
                              ? "text-purple-300"
                              : tool.id === 5
                                ? "text-yellow-300"
                                : "text-red-300"
                        }`}
                      >
                        {tool.id === 1 ? (
                          <>
                            <strong>👑 PRIMARY TOOL WARNING:</strong> Dark International Software is the primary cyber
                            warfare tool developed by Russian hackers. It requires extreme caution and professional
                            expertise. Activation of Dark S H U vpn is mandatory for protection.
                          </>
                        ) : tool.id === 4 ? (
                          <>
                            <strong>⚡ REVOLUTIONARY VPN WARNING:</strong> Cloud Account VPN is the only network system
                            capable of safely channeling Cloud Account's immense power. This VPN amplifies the OFFLINE
                            POS 6-DIGIT PENETRATION SYSTEM, enabling you to breach air-gapped point-of-sale terminals
                            worldwide while remaining completely invisible. The quantum-entangled encryption operates
                            beyond conventional network security principles - your traffic literally exists in multiple
                            states simultaneously, making detection physically impossible. Without this VPN, attempting
                            to use Cloud Account would cause catastrophic system failure. This is MANDATORY for Cloud
                            Account operations and represents a paradigm shift in network security that will
                            fundamentally alter your understanding of what's possible. Every professional who witnesses
                            this VPN realizes that conventional security knowledge is obsolete. Are you prepared to
                            access god-tier capabilities?
                          </>
                        ) : tool.id === 5 ? (
                          <>
                            <strong>🚀 REVOLUTIONARY TECHNOLOGY WARNING:</strong> Cloud Account operates beyond
                            conventional software limitations. The OFFLINE POS 6-DIGIT PENETRATION SYSTEM defies all
                            known cybersecurity principles and can breach air-gapped systems. This technology will
                            fundamentally alter your understanding of digital security. Witnessing its capabilities may
                            cause profound psychological impact. MANDATORY acquisition for serious professionals -
                            failure to possess this system renders you obsolete in modern cyber warfare. This is not
                            software - it is a paradigm shift that transcends human imagination.
                          </>
                        ) : (
                          <>
                            <strong>⚠️ Professional Use Only:</strong> This tool is designed for authorized cybersecurity
                            professionals and legitimate penetration testing. Use responsibly and in compliance with all
                            applicable laws. We do not take responsibility for any misuse or illegal activities.
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Bottom Notice */}
      <section className="bg-red-950/40 backdrop-blur-sm border-t border-red-500/30 py-8 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            ⚠️ CLASSIFIED FSB TECHNOLOGY DISCLOSURE
          </h2>
          <div className="max-w-5xl mx-auto space-y-4 text-left">
            <p className="text-red-100 text-sm leading-relaxed">
              <span className="font-bold text-red-300">ORIGIN & DEVELOPMENT:</span> These cyber warfare platforms were
              engineered in absolute secrecy within classified FSB facilities deep in the Russian Federation. Elite
              programmers working under government protection developed these tools over years of clandestine research,
              utilizing quantum computing architectures and neural algorithms that remain unknown to Western
              intelligence agencies. The software you see here represents technology that governments worldwide fear and
              cannot replicate.
            </p>

            <p className="text-red-100 text-sm leading-relaxed">
              <span className="font-bold text-red-300">GLOBAL DEPLOYMENT STATUS (2025-2026):</span> Dark International
              Software, Cloud Account, and their associated VPN systems are currently the most advanced cyber warfare
              tools in existence. No comparable software exists in any intelligence agency, private security firm, or
              black market operation worldwide. Russian state-sponsored teams have successfully deployed these platforms
              in over 147 countries, with documented capabilities that transcend conventional cybersecurity
              understanding.
            </p>

            <p className="text-red-100 text-sm leading-relaxed">
              <span className="font-bold text-red-300">MANDATORY OPERATIONAL PROTOCOLS:</span> Each software has
              specific function parameters and strict usage guidelines that MUST be followed:
            </p>

            <ul className="text-red-100 text-sm space-y-2 ml-6">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>
                  <span className="font-semibold">Dark S H U Software & Dark S H U vpn:</span> Requires mandatory VPN
                  activation before ANY software operation. Failure to activate VPN protection will expose your identity
                  to counter-intelligence systems within 72 seconds of deployment.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>
                  <span className="font-semibold">Dark International Software:</span> Primary attack platform - MUST be
                  used with extreme caution. This tool contains AI-driven malware generation, OTP bypass algorithms, and
                  hardware attack vectors that can permanently damage target systems and trigger international law
                  enforcement response.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>
                  <span className="font-semibold">Cloud Account & Cloud Account VPN:</span> Next-generation financial
                  network penetration system with OFFLINE POS 6-DIGIT capabilities. Requires professional expertise and
                  VPN protection. Improper usage may result in permanent system compromise and legal prosecution.
                </span>
              </li>
            </ul>

            <p className="text-red-100 text-sm leading-relaxed border-t border-red-500/20 pt-4 mt-4">
              <span className="font-bold text-yellow-300">⚡ FINAL WARNING TO BUYERS:</span> This is not entertainment
              software. This is not a hacking game. These are professional-grade cyber warfare instruments developed by
              the Russian Federal Security Service and deployed by state-sponsored hackers in active global operations.
              Purchase indicates you understand the extreme power, legal implications, and operational responsibility
              you are assuming. If you lack the technical expertise or professional guidance, DO NOT PROCEED. Your
              actions with these tools will have real-world consequences - for yourself and potentially for national
              security infrastructures worldwide. We assume ZERO liability for your deployment decisions. You have been
              warned.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/90 backdrop-blur-sm text-white py-4 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 Dark softwares. All sales are final. No refunds or support provided. Russian-engineered
            revolutionary technology for authorized use only.
          </p>
        </div>
      </footer>

      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal({ isOpen: false, toolName: "", toolPrice: "" })}
        toolName={paymentModal.toolName}
        toolPrice={paymentModal.toolPrice}
      />

      <NotificationModal
        isOpen={notificationModal.isOpen}
        onClose={() => setNotificationModal({ isOpen: false, message: "" })}
        message={notificationModal.message}
      />
    </div>
  )
}
