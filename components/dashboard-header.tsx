"use client"

import { useState, useEffect } from "react"
import { Bell, Shield, Menu, X, Car, User, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function DashboardHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Intrusion Attempt Detected", time: "5 minutes ago" },
    { id: 2, title: "Security Update Available", time: "1 hour ago" },
    { id: 3, title: "New Device Connected", time: "Yesterday" },
  ])

  // Load notifications from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedNotifications = localStorage.getItem("notifications")
      if (savedNotifications) {
        setNotifications(JSON.parse(savedNotifications))
      }
    }
  }, [])

  const markAsRead = (id: number) => {
    const updatedNotifications = notifications.filter((notification) => notification.id !== id)
    setNotifications(updatedNotifications)
    if (typeof window !== "undefined") {
      localStorage.setItem("notifications", JSON.stringify(updatedNotifications))
    }
  }

  return (
    <header className="border-b border-gray-800 bg-black">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-amber-500" />
            <span className="text-xl font-bold">SmartShield Mobility</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-amber-500 font-medium">
              Dashboard
            </Link>
            <Link href="/security-logs" className="text-gray-400 hover:text-white transition-colors">
              Security Logs
            </Link>
            <Link href="/settings" className="text-gray-400 hover:text-white transition-colors">
              Settings
            </Link>
            <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
              Help
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-500">
                      {notifications.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="cursor-pointer flex justify-between items-center"
                    >
                      <div className="flex flex-col space-y-1">
                        <span className="font-medium">{notification.title}</span>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <div className="p-4 text-center text-sm text-gray-500">No new notifications</div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>C</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">Chessi</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Car className="mr-2 h-4 w-4" />
                  <span>My Vehicles</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <Link href="/settings">Security Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-500">Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 flex flex-col space-y-4">
            <Link href="/" className="text-amber-500 font-medium">
              Dashboard
            </Link>
            <Link href="/security-logs" className="text-gray-400 hover:text-white transition-colors">
              Security Logs
            </Link>
            <Link href="/settings" className="text-gray-400 hover:text-white transition-colors">
              Settings
            </Link>
            <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
              Help
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

