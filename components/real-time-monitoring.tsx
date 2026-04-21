"use client"

import { useEffect, useState } from "react"
import { Activity, Cpu, Shield, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Mock data for network traffic
const generateNetworkData = () => {
  return Array.from({ length: 10 }, (_, i) => ({
    time: new Date(Date.now() - i * 60000).toLocaleTimeString(),
    value: Math.floor(Math.random() * 100),
  })).reverse()
}

export default function RealTimeMonitoring() {
  const [cpuUsage, setCpuUsage] = useState(42)
  const [memoryUsage, setMemoryUsage] = useState(68)
  const [networkTraffic, setNetworkTraffic] = useState(generateNetworkData())
  const [connectedDevices, setConnectedDevices] = useState([
    { id: 1, name: "Samsung S24", status: "Connected", time: "08:45 AM" },
    { id: 2, name: "Samsung Tablet", status: "Connected", time: "09:30 AM" },
  ])

  // Load connected devices from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDevices = localStorage.getItem("connectedDevices")
      if (savedDevices) {
        setConnectedDevices(JSON.parse(savedDevices))
      }
    }
  }, [])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 30) + 30)
      setMemoryUsage(Math.floor(Math.random() * 20) + 60)

      setNetworkTraffic((prev) => {
        const newData = [...prev]
        newData.shift()
        newData.push({
          time: new Date().toLocaleTimeString(),
          value: Math.floor(Math.random() * 100),
        })
        return newData
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border-gray-800 bg-gray-900/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <Activity className="mr-2 h-5 w-5 text-blue-500" />
          Real-Time Monitoring
        </CardTitle>
        <CardDescription>Monitor live system metrics and network activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Activity className="mr-2 h-4 w-4 text-blue-500" />
                <span className="text-sm">Network Traffic</span>
              </div>
              <Badge variant="outline" className="bg-blue-500/20 text-blue-400">
                Live
              </Badge>
            </div>

            <div className="h-20 flex items-end space-x-1">
              {networkTraffic.map((item, index) => (
                <div
                  key={index}
                  className="flex-1 bg-blue-500/30 hover:bg-blue-500/50 transition-colors rounded-sm"
                  style={{ height: `${item.value}%` }}
                  title={`${item.time}: ${item.value}%`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <Cpu className="mr-2 h-4 w-4 text-green-500" />
                  <span>CPU Usage</span>
                </div>
                <span>{cpuUsage}%</span>
              </div>
              <Progress value={cpuUsage} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <Shield className="mr-2 h-4 w-4 text-amber-500" />
                  <span>Memory Usage</span>
                </div>
                <span>{memoryUsage}%</span>
              </div>
              <Progress value={memoryUsage} className="h-2" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4 text-purple-500" />
              <span className="text-sm">Connected Devices</span>
            </div>

            <div className="space-y-2">
              {connectedDevices.map((device) => (
                <div key={device.id} className="flex justify-between items-center bg-gray-800/50 p-2 rounded-md">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                    <span className="text-sm">{device.name}</span>
                  </div>
                  <div className="text-xs text-gray-400">Since {device.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

