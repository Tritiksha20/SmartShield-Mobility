"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Settings,
  Bell,
  Shield,
  Lock,
  Eye,
  Smartphone,
  Fingerprint,
  Wifi,
  Database,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  // Security settings
  const [autoUpdates, setAutoUpdates] = useState(true)
  const [threatDetection, setThreatDetection] = useState(true)
  const [intrusionAlerts, setIntrusionAlerts] = useState(true)
  const [securityLevel, setSecurityLevel] = useState(["medium"])
  const [biometricAuth, setBiometricAuth] = useState(true)
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [encryptData, setEncryptData] = useState(true)
  const [secureBootEnabled, setSecureBootEnabled] = useState(true)

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [notifySecurityEvents, setNotifySecurityEvents] = useState(true)
  const [notifySystemUpdates, setNotifySystemUpdates] = useState(true)
  const [notifyLocationChanges, setNotifyLocationChanges] = useState(false)
  const [notifyUserActivity, setNotifyUserActivity] = useState(true)

  // Privacy settings
  const [locationTracking, setLocationTracking] = useState(true)
  const [dataSharing, setDataSharing] = useState(false)
  const [anonymizeData, setAnonymizeData] = useState(true)
  const [dataDeletionPeriod, setDataDeletionPeriod] = useState("90days")

  // Network settings
  const [autoConnectWifi, setAutoConnectWifi] = useState(true)
  const [trustedNetworks, setTrustedNetworks] = useState([
    { id: 1, name: "Home Network", trusted: true },
    { id: 2, name: "Office Network", trusted: true },
    { id: 3, name: "Public WiFi", trusted: false },
  ])
  const [vpnEnabled, setVpnEnabled] = useState(false)
  const [firewallLevel, setFirewallLevel] = useState([75])

  // Load settings from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("securitySettings")
      if (savedSettings) {
        const settings = JSON.parse(savedSettings)

        // Security settings
        if (settings.autoUpdates !== undefined) setAutoUpdates(settings.autoUpdates)
        if (settings.threatDetection !== undefined) setThreatDetection(settings.threatDetection)
        if (settings.intrusionAlerts !== undefined) setIntrusionAlerts(settings.intrusionAlerts)
        if (settings.securityLevel) setSecurityLevel([settings.securityLevel])
        if (settings.biometricAuth !== undefined) setBiometricAuth(settings.biometricAuth)
        if (settings.twoFactorAuth !== undefined) setTwoFactorAuth(settings.twoFactorAuth)
        if (settings.encryptData !== undefined) setEncryptData(settings.encryptData)
        if (settings.secureBootEnabled !== undefined) setSecureBootEnabled(settings.secureBootEnabled)

        // Notification settings
        if (settings.emailNotifications !== undefined) setEmailNotifications(settings.emailNotifications)
        if (settings.pushNotifications !== undefined) setPushNotifications(settings.pushNotifications)
        if (settings.smsNotifications !== undefined) setSmsNotifications(settings.smsNotifications)
        if (settings.notifySecurityEvents !== undefined) setNotifySecurityEvents(settings.notifySecurityEvents)
        if (settings.notifySystemUpdates !== undefined) setNotifySystemUpdates(settings.notifySystemUpdates)
        if (settings.notifyLocationChanges !== undefined) setNotifyLocationChanges(settings.notifyLocationChanges)
        if (settings.notifyUserActivity !== undefined) setNotifyUserActivity(settings.notifyUserActivity)

        // Privacy settings
        if (settings.locationTracking !== undefined) setLocationTracking(settings.locationTracking)
        if (settings.dataSharing !== undefined) setDataSharing(settings.dataSharing)
        if (settings.anonymizeData !== undefined) setAnonymizeData(settings.anonymizeData)
        if (settings.dataDeletionPeriod) setDataDeletionPeriod(settings.dataDeletionPeriod)

        // Network settings
        if (settings.autoConnectWifi !== undefined) setAutoConnectWifi(settings.autoConnectWifi)
        if (settings.trustedNetworks) setTrustedNetworks(settings.trustedNetworks)
        if (settings.vpnEnabled !== undefined) setVpnEnabled(settings.vpnEnabled)
        if (settings.firewallLevel) setFirewallLevel([settings.firewallLevel])
      }
    }
  }, [])

  // Save settings to localStorage when they change
  const saveSettings = () => {
    if (typeof window !== "undefined") {
      const settings = {
        // Security settings
        autoUpdates,
        threatDetection,
        intrusionAlerts,
        securityLevel: securityLevel[0],
        biometricAuth,
        twoFactorAuth,
        encryptData,
        secureBootEnabled,

        // Notification settings
        emailNotifications,
        pushNotifications,
        smsNotifications,
        notifySecurityEvents,
        notifySystemUpdates,
        notifyLocationChanges,
        notifyUserActivity,

        // Privacy settings
        locationTracking,
        dataSharing,
        anonymizeData,
        dataDeletionPeriod,

        // Network settings
        autoConnectWifi,
        trustedNetworks,
        vpnEnabled,
        firewallLevel: firewallLevel[0],
      }

      localStorage.setItem("securitySettings", JSON.stringify(settings))

      // Add to security logs
      const newLog = {
        id: Date.now(),
        type: "Settings Changed",
        timestamp: new Date().toLocaleString(),
        details: "Security settings have been updated",
        severity: "Info",
      }

      const existingLogs = JSON.parse(localStorage.getItem("securityLogs") || "[]")
      localStorage.setItem("securityLogs", JSON.stringify([newLog, ...existingLogs]))

      toast({
        title: "Settings Saved",
        description: "Your security settings have been updated successfully",
      })
    }
  }

  const toggleNetworkTrust = (id) => {
    setTrustedNetworks((prev) =>
      prev.map((network) => (network.id === id ? { ...network, trusted: !network.trusted } : network)),
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <Card className="border-gray-800 bg-gray-900/50 mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Settings className="mr-2 h-5 w-5 text-amber-500" />
              System Settings
            </CardTitle>
            <CardDescription>Configure your vehicle security system preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="security">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="network">Network</TabsTrigger>
              </TabsList>

              <TabsContent value="security" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-md">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 text-amber-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium">Automatic Security Updates</p>
                          <p className="text-xs text-gray-400">Install security patches automatically</p>
                        </div>
                      </div>
                      <Switch checked={autoUpdates} onCheckedChange={setAutoUpdates} />
                    </div>

                    <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-md">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 text-amber-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium">Threat Detection</p>
                          <p className="text-xs text-gray-400">Monitor for security threats</p>
                        </div>
                      </div>
                      <Switch checked={threatDetection} onCheckedChange={setThreatDetection} />
                    </div>

                    <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-md">
                      <div className="flex items-center">
                        <Bell className="h-4 w-4 text-amber-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium">Intrusion Alerts</p>
                          <p className="text-xs text-gray-400">Notify when unauthorized access is detected</p>
                        </div>
                      </div>
                      <Switch checked={intrusionAlerts} onCheckedChange={setIntrusionAlerts} />
                    </div>

                    <div className="bg-gray-800/50 p-3 rounded-md">
                      <div className="flex items-center mb-2">
                        <Shield className="h-4 w-4 text-amber-500 mr-2" />
                        <p className="text-sm font-medium">Security Level</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="security-low"
                            checked={securityLevel.includes("low")}
                            onCheckedChange={(checked) => {
                              if (checked) setSecurityLevel(["low"])
                            }}
                          />
                          <label htmlFor="security-low" className="text-sm">
                            Low - Basic protection
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="security-medium"
                            checked={securityLevel.includes("medium")}
                            onCheckedChange={(checked) => {
                              if (checked) setSecurityLevel(["medium"])
                            }}
                          />
                          <label htmlFor="security-medium" className="text-sm">
                            Medium - Standard protection
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="security-high"
                            checked={securityLevel.includes("high")}
                            onCheckedChange={(checked) => {
                              if (checked) setSecurityLevel(["high"])
                            }}
                          />
                          <label htmlFor="security-high" className="text-sm">
                            High - Maximum protection
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-md">
                      <div className="flex items-center">
                        <Fingerprint className="h-4 w-4 text-green-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium">Biometric Authentication</p>
                          <p className="text-xs text-gray-400">Use fingerprint or facial recognition</p>
                        </div>
                      </div>
                      <Switch checked={biometricAuth} onCheckedChange={setBiometricAuth} />
                    </div>

                    <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-md">
                      <div className="flex items-center">
                        <Smartphone className="h-4 w-4 text-blue-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium">Two-Factor Authentication</p>
                          <p className="text-xs text-gray-400">Require secondary verification</p>
                        </div>
                      </div>
                      <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
                    </div>

                    <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-md">
                      <div className="flex items-center">
                        <Lock className="h-4 w-4 text-purple-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium">Data Encryption</p>
                          <p className="text-xs text-gray-400">Encrypt all vehicle data</p>
                        </div>
                      </div>
                      <Switch checked={encryptData} onCheckedChange={setEncryptData} />
                    </div>

                    <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-md">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 text-red-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium">Secure Boot</p>
                          <p className="text-xs text-gray-400">Verify system integrity on startup</p>
                        </div>
                      </div>
                      <Switch checked={secureBootEnabled} onCheckedChange={setSecureBootEnabled} />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-md">
                      <div className="flex items-center">
                        <Bell className="h-4 w-4 text-amber-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium">Email Notifications</p>
                          <p className="text-xs text-gray-400">Receive alerts via email</p>
                        </div>
                      </div>
                      <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                    </div>

                    <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-md">
                      <div className="flex items-center">
                        <Bell className="h-4 w-4 text-amber-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium">Push Notifications</p>
                          <p className="text-xs text-gray-400">Receive alerts on your devices</p>
                        </div>
                      </div>
                      <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                    </div>

                    <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-md">
                      <div className="flex items-center">
                        <Bell className="h-4 w-4 text-amber-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium">SMS Notifications</p>
                          <p className="text-xs text-gray-400">Receive alerts via text message</p>
                        </div>
                      </div>
                      <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-800/50 p-3 rounded-md">
                      <p className="text-sm font-medium mb-2">Notification Types</p>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="notify-security"
                            checked={notifySecurityEvents}
                            onCheckedChange={setNotifySecurityEvents}
                          />
                          <label htmlFor="notify-security" className="text-sm">
                            Security Events
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="notify-updates"
                            checked={notifySystemUpdates}
                            onCheckedChange={setNotifySystemUpdates}
                          />
                          <label htmlFor="notify-updates" className="text-sm">
                            System Updates
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="notify-location"
                            checked={notifyLocationChanges}
                            onCheckedChange={setNotifyLocationChanges}
                          />
                          <label htmlFor="notify-location" className="text-sm">
                            Location Changes
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="notify-users"
                            checked={notifyUserActivity}
                            onCheckedChange={setNotifyUserActivity}
                          />
                          <label htmlFor="notify-users" className="text-sm">
                            User Activity
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-md">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-red-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium">Location Tracking</p>
                          <p className="text-xs text-gray-400">Track vehicle location</p>
                        </div>
                      </div>
                      <Switch checked={locationTracking} onCheckedChange={setLocationTracking} />
                    </div>

                    <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-md">
                      <div className="flex items-center">
                        <Database className="h-4 w-4 text-blue-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium">Data Sharing</p>
                          <p className="text-xs text-gray-400">Share anonymized data for improvements</p>
                        </div>
                      </div>
                      <Switch checked={dataSharing} onCheckedChange={setDataSharing} />
                    </div>

                    <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-md">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 text-purple-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium">Anonymize Data</p>
                          <p className="text-xs text-gray-400">Remove personally identifiable information</p>
                        </div>
                      </div>
                      <Switch checked={anonymizeData} onCheckedChange={setAnonymizeData} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-800/50 p-3 rounded-md">
                      <div className="flex items-center mb-2">
                        <Database className="h-4 w-4 text-blue-500 mr-2" />
                        <p className="text-sm font-medium">Data Retention Period</p>
                      </div>
                      <Select value={dataDeletionPeriod} onValueChange={setDataDeletionPeriod}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30days">30 Days</SelectItem>
                          <SelectItem value="90days">90 Days</SelectItem>
                          <SelectItem value="180days">180 Days</SelectItem>
                          <SelectItem value="1year">1 Year</SelectItem>
                          <SelectItem value="forever">Keep Indefinitely</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="network" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-md">
                      <div className="flex items-center">
                        <Wifi className="h-4 w-4 text-green-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium">Auto-Connect to WiFi</p>
                          <p className="text-xs text-gray-400">Connect to trusted networks automatically</p>
                        </div>
                      </div>
                      <Switch checked={autoConnectWifi} onCheckedChange={setAutoConnectWifi} />
                    </div>

                    <div className="bg-gray-800/50 p-3 rounded-md">
                      <div className="flex items-center mb-2">
                        <Wifi className="h-4 w-4 text-green-500 mr-2" />
                        <p className="text-sm font-medium">Trusted Networks</p>
                      </div>
                      <div className="space-y-2">
                        {trustedNetworks.map((network) => (
                          <div key={network.id} className="flex justify-between items-center">
                            <p className="text-sm">{network.name}</p>
                            <Switch checked={network.trusted} onCheckedChange={() => toggleNetworkTrust(network.id)} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-md">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 text-amber-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium">VPN Protection</p>
                          <p className="text-xs text-gray-400">Encrypt network traffic</p>
                        </div>
                      </div>
                      <Switch checked={vpnEnabled} onCheckedChange={setVpnEnabled} />
                    </div>

                    <div className="bg-gray-800/50 p-3 rounded-md">
                      <div className="flex items-center mb-2">
                        <Shield className="h-4 w-4 text-amber-500 mr-2" />
                        <p className="text-sm font-medium">Firewall Level</p>
                      </div>
                      <div className="py-4">
                        <Slider value={firewallLevel} onValueChange={setFirewallLevel} max={100} step={1} />
                        <div className="flex justify-between mt-1 text-xs text-gray-400">
                          <span>Basic</span>
                          <span>Standard</span>
                          <span>Strict</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end mt-6">
              <Button onClick={saveSettings} className="bg-amber-500 hover:bg-amber-600 text-black">
                Save Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

