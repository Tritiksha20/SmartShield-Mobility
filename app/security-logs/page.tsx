"use client"

import { useEffect, useState } from "react"
import { Shield, AlertTriangle, Clock, ArrowLeft, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function SecurityLogs() {
  const [logs, setLogs] = useState([])
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load logs from localStorage
      const savedLogs = localStorage.getItem("securityLogs")
      if (savedLogs) {
        setLogs(JSON.parse(savedLogs))
      } else {
        // Default logs if none exist
        const defaultLogs = [
          {
            id: 1,
            type: "Security Update",
            timestamp: new Date().toLocaleString(),
            details:
              "Security updates applied successfully. Updated components: Firewall, Intrusion Detection System, Encryption Module",
            severity: "Info",
          },
          {
            id: 2,
            type: "Intrusion Attempt",
            timestamp: new Date(Date.now() - 3600000).toLocaleString(),
            details: "Blocked unauthorized access attempt from IP 192.168.1.45",
            severity: "Warning",
          },
          {
            id: 3,
            type: "System Alert",
            timestamp: new Date(Date.now() - 86400000).toLocaleString(),
            details: "Unusual activity detected in CAN bus communication",
            severity: "Error",
          },
        ]
        setLogs(defaultLogs)
        localStorage.setItem("securityLogs", JSON.stringify(defaultLogs))
      }
    }
  }, [])

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Info":
        return "bg-blue-500/20 text-blue-400"
      case "Warning":
        return "bg-amber-500/20 text-amber-400"
      case "Error":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const filteredLogs =
    filter === "all" ? logs : logs.filter((log) => log.severity.toLowerCase() === filter.toLowerCase())

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Security Logs</h1>
        </div>

        <Card className="border-gray-800 bg-gray-900/50 mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Shield className="mr-2 h-5 w-5 text-amber-500" />
              Security Event History
            </CardTitle>
            <CardDescription>Review all security-related events and incidents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
                <span className="text-sm">{logs.length} Events Recorded</span>
              </div>
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <div key={log.id} className="bg-gray-800/50 p-3 rounded-md">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">{log.type}</div>
                      <Badge variant="outline" className={getSeverityColor(log.severity)}>
                        {log.severity}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-400 mb-2">{log.details}</div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {log.timestamp}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">No logs matching the selected filter</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

