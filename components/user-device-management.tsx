"use client"

import { useState, useEffect } from "react"
import { Users, Smartphone, Key, Fingerprint, Ban } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

export default function UserDeviceManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: "Sai Divya", role: "Owner", biometric: true },
    { id: 2, name: "Tritiksha", role: "Driver", biometric: false },
  ])

  const [devices, setDevices] = useState([
    { id: 1, name: "Samsung S24", type: "Phone", status: "Trusted" },
    { id: 2, name: "Samsung Tablet", type: "Tablet", status: "Trusted" },
    { id: 3, name: "Unknown Device", type: "Unknown", status: "Blocked" },
  ])

  const [userDialogOpen, setUserDialogOpen] = useState(false)
  const [deviceDialogOpen, setDeviceDialogOpen] = useState(false)

  // New user form state
  const [newUserName, setNewUserName] = useState("")
  const [newUserRole, setNewUserRole] = useState("Driver")
  const [newUserBiometric, setNewUserBiometric] = useState(false)

  // New device form state
  const [newDeviceName, setNewDeviceName] = useState("")
  const [newDeviceType, setNewDeviceType] = useState("Phone")
  const [newDeviceStatus, setNewDeviceStatus] = useState("Trusted")

  // Load users and devices from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUsers = localStorage.getItem("users")
      if (savedUsers) {
        setUsers(JSON.parse(savedUsers))
      }

      const savedDevices = localStorage.getItem("devices")
      if (savedDevices) {
        setDevices(JSON.parse(savedDevices))
      }
    }
  }, [])

  // Save users and devices to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("users", JSON.stringify(users))
      localStorage.setItem("devices", JSON.stringify(devices))
    }
  }, [users, devices])

  const handleAddUser = (e) => {
    e.preventDefault()

    const newUser = {
      id: Date.now(),
      name: newUserName,
      role: newUserRole,
      biometric: newUserBiometric,
    }

    setUsers((prev) => [...prev, newUser])

    // Reset form and close dialog
    setNewUserName("")
    setNewUserRole("Driver")
    setNewUserBiometric(false)
    setUserDialogOpen(false)

    toast({
      title: "User Added",
      description: `${newUserName} has been added as a ${newUserRole}`,
    })
  }

  const handleAddDevice = (e) => {
    e.preventDefault()

    const newDevice = {
      id: Date.now(),
      name: newDeviceName,
      type: newDeviceType,
      status: newDeviceStatus,
    }

    setDevices((prev) => [...prev, newDevice])

    // Reset form and close dialog
    setNewDeviceName("")
    setNewDeviceType("Phone")
    setNewDeviceStatus("Trusted")
    setDeviceDialogOpen(false)

    toast({
      title: "Device Added",
      description: `${newDeviceName} has been added to your devices`,
    })
  }

  const handleChangeDeviceStatus = (deviceId, newStatus) => {
    setDevices((prev) => prev.map((device) => (device.id === deviceId ? { ...device, status: newStatus } : device)))

    const device = devices.find((d) => d.id === deviceId)

    toast({
      title: "Device Status Changed",
      description: `${device.name} is now ${newStatus}`,
    })
  }

  return (
    <Card className="border-gray-800 bg-gray-900/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <Users className="mr-2 h-5 w-5 text-purple-500" />
          User & Device Management
        </CardTitle>
        <CardDescription>Manage access permissions and connected devices</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-purple-500" />
                <span className="text-sm">User Permissions</span>
              </div>
              <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>Add a new user and set their access permissions.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddUser}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="name" className="text-right text-sm">
                          Name
                        </label>
                        <input
                          id="name"
                          className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="User name"
                          value={newUserName}
                          onChange={(e) => setNewUserName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="role" className="text-right text-sm">
                          Role
                        </label>
                        <Select value={newUserRole} onValueChange={setNewUserRole}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Owner">Owner</SelectItem>
                            <SelectItem value="Driver">Driver</SelectItem>
                            <SelectItem value="Guest">Guest</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm">Biometric</label>
                        <div className="col-span-3 flex items-center space-x-2">
                          <Switch id="biometric" checked={newUserBiometric} onCheckedChange={setNewUserBiometric} />
                          <label htmlFor="biometric" className="text-sm">
                            Enable biometric authentication
                          </label>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add User</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-2">
              {users.map((user) => (
                <div key={user.id} className="flex justify-between items-center bg-gray-800/50 p-2 rounded-md">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-2">
                      <Users className="h-4 w-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="outline"
                      className={user.biometric ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}
                    >
                      {user.biometric ? "Biometric" : "PIN Only"}
                    </Badge>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Key className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Smartphone className="mr-2 h-4 w-4 text-blue-500" />
                <span className="text-sm">Connected Devices</span>
              </div>
              <Dialog open={deviceDialogOpen} onOpenChange={setDeviceDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    Add Device
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Device</DialogTitle>
                    <DialogDescription>Add a new device to your vehicle.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddDevice}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="device-name" className="text-right text-sm">
                          Name
                        </label>
                        <input
                          id="device-name"
                          className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Device name"
                          value={newDeviceName}
                          onChange={(e) => setNewDeviceName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="device-type" className="text-right text-sm">
                          Type
                        </label>
                        <Select value={newDeviceType} onValueChange={setNewDeviceType}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Phone">Phone</SelectItem>
                            <SelectItem value="Tablet">Tablet</SelectItem>
                            <SelectItem value="Laptop">Laptop</SelectItem>
                            <SelectItem value="Smartwatch">Smartwatch</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="device-status" className="text-right text-sm">
                          Status
                        </label>
                        <Select value={newDeviceStatus} onValueChange={setNewDeviceStatus}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Trusted">Trusted</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Blocked">Blocked</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add Device</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-2">
              {devices.map((device) => (
                <div key={device.id} className="flex justify-between items-center bg-gray-800/50 p-2 rounded-md">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-2">
                      <Smartphone className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{device.name}</p>
                      <p className="text-xs text-gray-400">{device.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="outline"
                      className={
                        device.status === "Trusted"
                          ? "bg-green-500/20 text-green-400"
                          : device.status === "Blocked"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-amber-500/20 text-amber-400"
                      }
                    >
                      {device.status}
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        const newStatus = device.status === "Trusted" ? "Blocked" : "Trusted"
                        handleChangeDeviceStatus(device.id, newStatus)
                      }}
                    >
                      {device.status === "Trusted" ? <Ban className="h-4 w-4" /> : <Key className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center py-2">
            <div className="flex items-center">
              <Key className="mr-2 h-4 w-4 text-amber-500" />
              <div>
                <p className="text-sm">Security Credentials</p>
                <p className="text-xs text-gray-400">Update passwords and authentication</p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              Change
            </Button>
          </div>

          <div className="flex justify-between items-center py-2">
            <div className="flex items-center">
              <Fingerprint className="mr-2 h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm">Biometric Authentication</p>
                <p className="text-xs text-gray-400">Fingerprint and facial recognition</p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              Configure
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

