"use client"

import { useEffect, useState } from "react"

export function CodeBackground() {
  const [codeColumns, setCodeColumns] = useState<
    Array<{ text: string; delay: number; duration: number; color: string }>
  >([])

  const hackingCodeSnippets = [
    "ACCESS GRANTED: ROOT@SYSTEM",
    "FIREWALL BYPASSED...",
    "DECRYPTING: SHA-256 HASH",
    "INJECTING PAYLOAD...",
    "BACKDOOR INSTALLED",
    "SCANNING PORTS: 1-65535",
    "BRUTE FORCE ATTACK: 89%",
    "KEYLOGGER ACTIVE",
    "PACKET SNIFFING...",
    "SQL INJECTION SUCCESS",
    "PRIVILEGE ESCALATION",
    "ZERO-DAY EXPLOIT LOADED",
    "RANSOMWARE DEPLOYED",
    "NETWORK COMPROMISED",
    "ADMIN PASSWORD: ********",
    "TROJAN HORSE EXECUTING",
    "DDOS ATTACK INITIATED",
    "CRYPTOCURRENCY MINER ON",
    "VPN TUNNEL ESTABLISHED",
    "ROOTKIT INSTALLATION",
    "MEMORY DUMP COMPLETE",
    "KERNEL EXPLOIT ACTIVE",
    "REVERSE SHELL CONNECTED",
    "PHISHING CAMPAIGN LIVE",
    "MALWARE PROPAGATING...",
    "SYSTEM TAKEOVER: 100%",
    "ENCRYPTION BROKEN",
    "DATABASE EXFILTRATED",
    "CREDENTIALS HARVESTED",
    "BOTNET COMMAND SENT",
  ]

  const colors = [
    "#ff4444",
    "#ff6b6b",
    "#ff0000",
    "#cc0000",
    "#ff3333",
    "#ff5555",
    "#e60000",
    "#ff1111",
    "#dd0000",
    "#ff9999",
  ]

  useEffect(() => {
    const generateCodeColumns = () => {
      const columns = []
      for (let i = 0; i < 40; i++) {
        columns.push({
          text: hackingCodeSnippets[Math.floor(Math.random() * hackingCodeSnippets.length)],
          delay: Math.random() * 5,
          duration: 8 + Math.random() * 6,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
      setCodeColumns(columns)
    }

    generateCodeColumns()
    const interval = setInterval(generateCodeColumns, 12000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="code-background">
      {codeColumns.map((column, index) => (
        <div
          key={index}
          className="falling-code-column"
          style={{
            left: `${(index * 2.5) % 100}%`,
            animationDelay: `${column.delay}s`,
            animationDuration: `${column.duration}s`,
            color: column.color,
          }}
        >
          {column.text}
        </div>
      ))}
    </div>
  )
}
