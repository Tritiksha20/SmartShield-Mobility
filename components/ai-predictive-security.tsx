"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import { useState, useEffect, useRef } from "react"
import { Brain, BarChart3, MapPin, Lock, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateVehicleLocation } from "@/lib/vehicle-security"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface AISecurityProps {
  className?: string
}

export default function AIPredictiveSecurity({ className }: AISecurityProps) {
  const [securityScore, setSecurityScore] = useState(78)
  const [threatPredictions, setThreatPredictions] = useState([
    { id: 1, type: "Unauthorized Access", probability: 15, severity: "Medium" },
    { id: 2, type: "Data Interception", probability: 8, severity: "High" },
    { id: 3, type: "Malware Injection", probability: 5, severity: "Critical" },
  ])

  const [vehicleLocation, setVehicleLocation] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    lastUpdated: new Date().toLocaleTimeString(),
    status: "Secure",
  })

  const [locationHistory, setLocationHistory] = useState([])
  const [showLocationHistory, setShowLocationHistory] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markerRef = useRef(null)
  const historyMarkersRef = useRef([])

  // Initialize map on component mount
  useEffect(() => {
    // Load Leaflet library dynamically
    const loadLeaflet = async () => {
      if (typeof window === "undefined") return

      // Add Leaflet CSS
      const linkEl = document.createElement("link")
      linkEl.rel = "stylesheet"
      linkEl.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      document.head.appendChild(linkEl)

      // Wait for CSS to load
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Load Leaflet JS
      const script = document.createElement("script")
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      script.async = true

      script.onload = () => {
        if (mapRef.current && !mapInstanceRef.current) {
          // Initialize map
          const L = window.L
          const map = L.map(mapRef.current).setView([vehicleLocation.latitude, vehicleLocation.longitude], 13)

          // Use satellite imagery instead of standard map
          L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
            attribution:
              "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
          }).addTo(map)

          // Add marker for vehicle location
          const marker = L.marker([vehicleLocation.latitude, vehicleLocation.longitude]).addTo(map)
          marker.bindPopup("Your vehicle is here").openPopup()

          mapInstanceRef.current = map
          markerRef.current = marker

          // Load location history from localStorage
          if (typeof window !== "undefined") {
            const savedHistory = localStorage.getItem("locationHistory")
            if (savedHistory) {
              const history = JSON.parse(savedHistory)
              setLocationHistory(history)

              // Add history markers if showing history
              if (showLocationHistory) {
                addHistoryMarkersToMap(history, L, map)
              }
            }
          }
        }
      }

      document.body.appendChild(script)
    }

    loadLeaflet()

    return () => {
      // Clean up map instance when component unmounts
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Function to add history markers to the map
  const addHistoryMarkersToMap = (history, L, map) => {
    // Clear existing history markers
    historyMarkersRef.current.forEach((marker) => {
      if (map) map.removeLayer(marker)
    })
    historyMarkersRef.current = []

    // Add new history markers
    history.forEach((loc, index) => {
      // Use a different icon for history points
      const historyIcon = L.divIcon({
        html: `<div style="background-color: rgba(255, 165, 0, 0.6); width: 10px; height: 10px; border-radius: 50%; border: 1px solid #fff;"></div>`,
        className: "history-marker",
        iconSize: [10, 10],
      })

      const marker = L.marker([loc.latitude, loc.longitude], { icon: historyIcon }).addTo(map)
      marker.bindPopup(`Location at ${loc.timestamp}`)
      historyMarkersRef.current.push(marker)
    })

    // Draw path line if there are at least 2 points
    if (history.length >= 2) {
      const pathLine = L.polyline(
        history.map((loc) => [loc.latitude, loc.longitude]),
        { color: "orange", weight: 3, opacity: 0.7 },
      ).addTo(map)
      historyMarkersRef.current.push(pathLine)
    }
  }

  // Update marker position when vehicle location changes
  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current && typeof window !== "undefined") {
      const L = window.L
      markerRef.current.setLatLng([vehicleLocation.latitude, vehicleLocation.longitude])
      mapInstanceRef.current.panTo([vehicleLocation.latitude, vehicleLocation.longitude])
    }
  }, [vehicleLocation])

  // Toggle location history display
  useEffect(() => {
    if (mapInstanceRef.current && typeof window !== "undefined") {
      const L = window.L

      if (showLocationHistory && locationHistory.length > 0) {
        addHistoryMarkersToMap(locationHistory, L, mapInstanceRef.current)
      } else {
        // Clear history markers
        historyMarkersRef.current.forEach((marker) => {
          if (mapInstanceRef.current) mapInstanceRef.current.removeLayer(marker)
        })
        historyMarkersRef.current = []
      }
    }
  }, [showLocationHistory, locationHistory])

  // Simulate AI analysis updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSecurityScore((prev) => {
        const change = Math.floor(Math.random() * 5) - 2 // -2 to +2
        return Math.max(0, Math.min(100, prev + change))
      })

      // Occasionally update threat predictions
      if (Math.random() > 0.7) {
        setThreatPredictions((prev) => {
          const newPredictions = [...prev]
          const randomIndex = Math.floor(Math.random() * newPredictions.length)
          newPredictions[randomIndex] = {
            ...newPredictions[randomIndex],
            probability: Math.max(
              1,
              Math.min(30, newPredictions[randomIndex].probability + (Math.random() > 0.5 ? 2 : -2)),
            ),
          }
          return newPredictions
        })
      }

      // Update vehicle location with more realistic data
      const newLocation = generateVehicleLocation()
      const newLocationWithTimestamp = {
        latitude: newLocation.latitude,
        longitude: newLocation.longitude,
        timestamp: new Date().toLocaleString(),
        status: "Secure",
      }

      setVehicleLocation({
        ...newLocationWithTimestamp,
        lastUpdated: new Date().toLocaleTimeString(),
      })

      // Add to location history (keep last 50 locations)
      if (typeof window !== "undefined") {
        setLocationHistory((prev) => {
          const updatedHistory = [newLocationWithTimestamp, ...prev].slice(0, 50)
          localStorage.setItem("locationHistory", JSON.stringify(updatedHistory))
          return updatedHistory
        })
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-amber-500"
    return "text-red-500"
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low":
        return "bg-blue-500/20 text-blue-400"
      case "Medium":
        return "bg-amber-500/20 text-amber-400"
      case "High":
        return "bg-orange-500/20 text-orange-400"
      case "Critical":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const toggleLockdown = () => {
    setIsLocked(!isLocked)

    if (typeof window !== "undefined") {
      // Add to security logs
      const newLog = {
        id: Date.now(),
        type: "Vehicle Lockdown",
        timestamp: new Date().toLocaleString(),
        details: `Vehicle lockdown ${!isLocked ? "activated" : "deactivated"}`,
        severity: !isLocked ? "Warning" : "Info",
      }

      const existingLogs = JSON.parse(localStorage.getItem("securityLogs") || "[]")
      localStorage.setItem("securityLogs", JSON.stringify([newLog, ...existingLogs]))
    }
  }

  return (
    <Card className={`border-gray-800 bg-gray-900/50 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <Brain className="mr-2 h-5 w-5 text-indigo-500" />
          AI & Predictive Security
        </CardTitle>
        <CardDescription>Advanced AI-powered security analysis and predictions</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="analysis">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="analysis">Threat Analysis</TabsTrigger>
            <TabsTrigger value="tracking">GPS Tracking</TabsTrigger>
            <TabsTrigger value="lockdown">Vehicle Lockdown</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 bg-gray-800/50 rounded-lg p-4 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold mb-2 flex items-center">
                  <span className={getScoreColor(securityScore)}>{securityScore}</span>
                  <span className="text-lg ml-1">/100</span>
                </div>
                <div className="text-sm text-gray-400 mb-2">Security Score</div>
                <Progress value={securityScore} className="h-2 w-full max-w-[200px]" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center">
                  <BarChart3 className="mr-2 h-4 w-4 text-indigo-500" />
                  <span className="text-sm">AI Threat Predictions</span>
                </div>

                <div className="space-y-2">
                  {threatPredictions.map((threat) => (
                    <div key={threat.id} className="flex justify-between items-center bg-gray-800/50 p-2 rounded-md">
                      <div>
                        <p className="text-sm">{threat.type}</p>
                        <div className="flex items-center">
                          <Progress value={threat.probability} className="h-1 w-20 mr-2" />
                          <span className="text-xs text-gray-400">{threat.probability}%</span>
                        </div>
                      </div>
                      <Badge variant="outline" className={getSeverityColor(threat.severity)}>
                        {threat.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 p-3 rounded-md">
                <div className="text-sm font-medium mb-1">Anomaly Detection</div>
                <div className="text-xs text-gray-400">AI monitoring for unusual patterns</div>
                <Badge variant="outline" className="mt-2 bg-green-500/20 text-green-400">
                  Active
                </Badge>
              </div>

              <div className="bg-gray-800/50 p-3 rounded-md">
                <div className="text-sm font-medium mb-1">Behavioral Analysis</div>
                <div className="text-xs text-gray-400">Learning normal usage patterns</div>
                <Badge variant="outline" className="mt-2 bg-blue-500/20 text-blue-400">
                  Learning
                </Badge>
              </div>

              <div className="bg-gray-800/50 p-3 rounded-md">
                <div className="text-sm font-medium mb-1">Threat Intelligence</div>
                <div className="text-xs text-gray-400">External threat data integration</div>
                <Badge variant="outline" className="mt-2 bg-green-500/20 text-green-400">
                  Updated
                </Badge>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tracking">
            <div className="space-y-4">
              <div className="aspect-video bg-gray-800 rounded-lg relative overflow-hidden">
                {/* Real map implementation */}
                <div
                  ref={mapRef}
                  className="absolute inset-0 w-full h-full z-10"
                  style={{ background: "#242424" }}
                ></div>

                {/* Fallback content if map fails to load */}
                <div className="absolute inset-0 flex items-center justify-center z-0">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-red-500 mx-auto mb-2" />
                    <div className="text-sm">Vehicle Location</div>
                    <div className="text-xs text-gray-400">
                      Lat: {vehicleLocation.latitude.toFixed(4)}, Long: {vehicleLocation.longitude.toFixed(4)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 p-3 rounded-md">
                  <div className="text-sm font-medium mb-1">Last Updated</div>
                  <div className="text-xs text-gray-400">{vehicleLocation.lastUpdated}</div>
                </div>

                <div className="bg-gray-800/50 p-3 rounded-md">
                  <div className="text-sm font-medium mb-1">Status</div>
                  <Badge variant="outline" className="bg-green-500/20 text-green-400">
                    {vehicleLocation.status}
                  </Badge>
                </div>

                <div className="bg-gray-800/50 p-3 rounded-md">
                  <div className="text-sm font-medium mb-1">Geofencing</div>
                  <div className="text-xs text-gray-400">Set location boundaries</div>
                  <Button size="sm" variant="outline" className="mt-2">
                    Configure
                  </Button>
                </div>
              </div>

              <div className="bg-gray-800/50 p-3 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium mb-1">Location History</div>
                    <div className="text-xs text-gray-400">Track vehicle movement over time</div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant={showLocationHistory ? "default" : "outline"}
                      onClick={() => setShowLocationHistory(!showLocationHistory)}
                      className={showLocationHistory ? "bg-amber-500 hover:bg-amber-600 text-black" : ""}
                    >
                      {showLocationHistory ? "Hide Path" : "Show Path"}
                    </Button>
                    <Dialog>
                      <Button size="sm" variant="outline" asChild>
                        <DialogTrigger>View History</DialogTrigger>
                      </Button>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Location History</DialogTitle>
                          <DialogDescription>Recent locations of your vehicle</DialogDescription>
                        </DialogHeader>
                        <div className="max-h-[400px] overflow-y-auto">
                          {locationHistory.length > 0 ? (
                            <div className="space-y-2">
                              {locationHistory.map((location, index) => (
                                <div key={index} className="flex items-center bg-gray-800/50 p-2 rounded-md">
                                  <Clock className="h-4 w-4 text-amber-500 mr-2" />
                                  <div className="flex-1">
                                    <div className="text-sm">
                                      Lat: {location.latitude.toFixed(4)}, Long: {location.longitude.toFixed(4)}
                                    </div>
                                    <div className="text-xs text-gray-400">{location.timestamp}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-gray-400">No location history available</div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="lockdown">
            <div className="space-y-4">
              <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                <Lock className={`h-12 w-12 mx-auto mb-2 ${isLocked ? "text-red-500" : "text-gray-400"}`} />
                <div className="text-lg font-medium mb-1">
                  {isLocked ? "Vehicle Lockdown Active" : "Vehicle Operating Normally"}
                </div>
                <div className="text-sm text-gray-400 mb-4">
                  {isLocked
                    ? "Critical systems are restricted for security reasons"
                    : "All vehicle systems are functioning normally"}
                </div>
                <Button
                  size="lg"
                  variant={isLocked ? "destructive" : "outline"}
                  className={isLocked ? "" : "bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white"}
                  onClick={toggleLockdown}
                >
                  {isLocked ? "Disable Lockdown" : "Activate Lockdown"}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-3 rounded-md">
                  <div className="text-sm font-medium mb-1">Lockdown Features</div>
                  <ul className="text-xs text-gray-400 space-y-1 list-disc pl-4">
                    <li>Disable engine start</li>
                    <li>Restrict network connectivity</li>
                    <li>Limit vehicle speed</li>
                    <li>Disable non-essential systems</li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 p-3 rounded-md">
                  <div className="text-sm font-medium mb-1">Emergency Contacts</div>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li className="flex justify-between">
                      <span>Security Team</span>
                      <Button size="sm" variant="ghost" className="h-5 text-xs">
                        Call
                      </Button>
                    </li>
                    <li className="flex justify-between">
                      <span>Vehicle Manufacturer</span>
                      <Button size="sm" variant="ghost" className="h-5 text-xs">
                        Call
                      </Button>
                    </li>
                    <li className="flex justify-between">
                      <span>Emergency Services</span>
                      <Button size="sm" variant="ghost" className="h-5 text-xs">
                        Call
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-800/50 p-3 rounded-md">
                <div className="text-sm font-medium mb-1">Lockdown History</div>
                {isLocked ? (
                  <div className="text-xs text-red-400">Vehicle currently in lockdown mode</div>
                ) : (
                  <div className="text-xs text-gray-400">No recent lockdowns recorded</div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

