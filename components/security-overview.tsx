"use client"

import { useState } from "react"
import { Shield, AlertTriangle, Clock, Lock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function SecurityOverview() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [threatLevel, setThreatLevel] = useState("Low")
  const [lastScan, setLastScan] = useState("2 hours ago")
  const [encryptionStatus, setEncryptionStatus] = useState("AES-256")

  const startScan = () => {
    setIsScanning(true)
    setScanProgress(0)

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsScanning(false)
          setLastScan("Just now")
          return 100
        }
        return prev + 5
      })
    }, 150)
  }

  return (
    <Card className="border-gray-800 bg-gray-900/50">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center">
            <Shield className="mr-2 h-5 w-5 text-amber-500" />
            Core Security Controls
          </CardTitle>
          <Badge
            variant="outline"
            className={`
            ${threatLevel === "Low" ? "bg-green-500/20 text-green-400" : ""}
            ${threatLevel === "Medium" ? "bg-yellow-500/20 text-yellow-400" : ""}
            ${threatLevel === "High" ? "bg-red-500/20 text-red-400" : ""}
          `}
          >
            {threatLevel} Threat Level
          </Badge>
        </div>
        <CardDescription>Monitor and manage core vehicle security functions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Shield className="mr-2 h-4 w-4 text-green-500" />
              <span>Vehicle Security Scan</span>
            </div>
            <Button
              size="sm"
              onClick={startScan}
              disabled={isScanning}
              className="bg-amber-500 hover:bg-amber-600 text-black"
            >
              {isScanning ? "Scanning..." : "Scan Now"}
            </Button>
          </div>

          {isScanning && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Scanning vehicle systems...</span>
                <span>{scanProgress}%</span>
              </div>
              <Progress value={scanProgress} className="h-2" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Threat Detection</p>
                <p className="text-xs text-gray-400">2 potential vulnerabilities found</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Clock className="h-4 w-4 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Last Full Scan</p>
                <p className="text-xs text-gray-400">{lastScan}</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Intrusion Alerts</p>
                <p className="text-xs text-gray-400">3 blocked attempts in last 24h</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Lock className="h-4 w-4 text-green-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Data Encryption</p>
                <p className="text-xs text-gray-400">{encryptionStatus} (Active)</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

