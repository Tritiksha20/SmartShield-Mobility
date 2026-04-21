"use client"

import { useState, useEffect } from "react"
import { Ban, RefreshCw, ShieldAlert, FileWarning } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { applySecurityUpdates } from "@/lib/vehicle-security"

export default function ResponsePrevention() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateProgress, setUpdateProgress] = useState(0)
  const [safeModeEnabled, setSafeModeEnabled] = useState(false)
  const [blockedIPs, setBlockedIPs] = useState([
    { ip: "192.168.1.45", time: "10:23 AM", threat: "Port Scanning" },
    { ip: "45.33.21.88", time: "Yesterday", threat: "Brute Force" },
  ])
  const [securityLogs, setSecurityLogs] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [incidentType, setIncidentType] = useState("Unauthorized Access")
  const [incidentDescription, setIncidentDescription] = useState("")

  // Load blocked IPs and security logs from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedBlockedIPs = localStorage.getItem("blockedIPs")
      if (savedBlockedIPs) {
        setBlockedIPs(JSON.parse(savedBlockedIPs))
      }

      const savedLogs = localStorage.getItem("securityLogs")
      if (savedLogs) {
        setSecurityLogs(JSON.parse(savedLogs))
      }
    }
  }, [])

  // Save blocked IPs and security logs to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("blockedIPs", JSON.stringify(blockedIPs))
      localStorage.setItem("securityLogs", JSON.stringify(securityLogs))
    }
  }, [blockedIPs, securityLogs])

  const startUpdate = async () => {
    setIsUpdating(true)
    setUpdateProgress(0)

    const interval = setInterval(() => {
      setUpdateProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 150)

    try {
      const result = await applySecurityUpdates()

      // Add to security logs
      const newLog = {
        id: Date.now(),
        type: "Security Update",
        timestamp: new Date().toLocaleString(),
        details: `Security updates applied successfully. Updated components: ${result.updatedComponents.join(", ")}`,
        severity: "Info",
      }

      setSecurityLogs((prev) => [newLog, ...prev])

      // Wait for progress to complete
      setTimeout(() => {
        setIsUpdating(false)
      }, 3000)
    } catch (error) {
      // Add error to security logs
      const newLog = {
        id: Date.now(),
        type: "Security Update Failed",
        timestamp: new Date().toLocaleString(),
        details: `Failed to apply security updates: ${error.message}`,
        severity: "Error",
      }

      setSecurityLogs((prev) => [newLog, ...prev])
      setIsUpdating(false)
    }
  }

  const handleUnblockIP = (ip) => {
    setBlockedIPs((prev) => prev.filter((item) => item.ip !== ip))

    // Add to security logs
    const newLog = {
      id: Date.now(),
      type: "IP Unblocked",
      timestamp: new Date().toLocaleString(),
      details: `IP address ${ip} has been unblocked`,
      severity: "Warning",
    }

    setSecurityLogs((prev) => [newLog, ...prev])
  }

  const handleSubmitIncident = (e) => {
    e.preventDefault()

    // Add to security logs
    const newLog = {
      id: Date.now(),
      type: "Incident Report",
      timestamp: new Date().toLocaleString(),
      details: `Incident reported: ${incidentType} - ${incidentDescription}`,
      severity: "Warning",
    }

    setSecurityLogs((prev) => [newLog, ...prev])

    // Reset form and close dialog
    setIncidentDescription("")
    setDialogOpen(false)
  }

  return (
    <Card className="border-gray-800 bg-gray-900/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <ShieldAlert className="mr-2 h-5 w-5 text-red-500" />
          Response & Prevention
        </CardTitle>
        <CardDescription>Manage security incidents and preventive measures</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Ban className="mr-2 h-4 w-4 text-red-500" />
                <span className="text-sm">Blocked Access Attempts</span>
              </div>
              <Badge variant="outline" className="bg-red-500/20 text-red-400">
                {blockedIPs.length} Blocked
              </Badge>
            </div>

            <div className="space-y-2 max-h-32 overflow-y-auto">
              {blockedIPs.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-800/50 p-2 rounded-md">
                  <div className="flex items-center">
                    <span className="text-sm font-mono">{item.ip}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-400 mr-2">{item.threat}</span>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-6 text-xs"
                      onClick={() => handleUnblockIP(item.ip)}
                    >
                      Unblock
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <RefreshCw className="mr-2 h-4 w-4 text-green-500" />
              <span className="text-sm">Security Updates</span>
            </div>
            <Button
              size="sm"
              onClick={startUpdate}
              disabled={isUpdating}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isUpdating ? "Updating..." : "Apply Updates"}
            </Button>
          </div>

          {isUpdating && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Installing security patches...</span>
                <span>{updateProgress}%</span>
              </div>
              <Progress value={updateProgress} className="h-2" />
            </div>
          )}

          <div className="flex justify-between items-center py-2">
            <div className="flex items-center">
              <ShieldAlert className="mr-2 h-4 w-4 text-amber-500" />
              <div>
                <p className="text-sm">Safe Mode</p>
                <p className="text-xs text-gray-400">Restricts vehicle functions during attacks</p>
              </div>
            </div>
            <Switch
              checked={safeModeEnabled}
              onCheckedChange={(checked) => {
                setSafeModeEnabled(checked)

                // Add to security logs
                const newLog = {
                  id: Date.now(),
                  type: "Safe Mode",
                  timestamp: new Date().toLocaleString(),
                  details: `Safe Mode has been ${checked ? "enabled" : "disabled"}`,
                  severity: checked ? "Warning" : "Info",
                }

                setSecurityLogs((prev) => [newLog, ...prev])
              }}
              className="data-[state=checked]:bg-amber-500"
            />
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <FileWarning className="mr-2 h-4 w-4" />
                Report Security Incident
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Report Security Incident</DialogTitle>
                <DialogDescription>
                  Submit details about a security incident to our cybersecurity team for analysis.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmitIncident}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="incident-type" className="text-right text-sm">
                      Type
                    </label>
                    <select
                      id="incident-type"
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={incidentType}
                      onChange={(e) => setIncidentType(e.target.value)}
                    >
                      <option>Unauthorized Access</option>
                      <option>Data Breach</option>
                      <option>Malware</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="description" className="text-right text-sm">
                      Description
                    </label>
                    <textarea
                      id="description"
                      className="col-span-3 flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Describe what happened..."
                      value={incidentDescription}
                      onChange={(e) => setIncidentDescription(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Submit Report</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}

