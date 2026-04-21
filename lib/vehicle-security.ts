// Mock data and functions for vehicle security system

// Types
export interface SecurityThreat {
  id: string
  type: string
  severity: "Low" | "Medium" | "High" | "Critical"
  timestamp: string
  source: string
  details: string
  status: "Active" | "Mitigated" | "Investigating"
}

export interface NetworkActivity {
  id: string
  timestamp: string
  source: string
  destination: string
  protocol: string
  status: "Allowed" | "Blocked"
  bytes: number
}

export interface ConnectedDevice {
  id: string
  name: string
  type: string
  macAddress: string
  ipAddress: string
  lastConnected: string
  status: "Connected" | "Disconnected" | "Blocked"
}

export interface User {
  id: string
  name: string
  role: "Owner" | "Driver" | "Guest"
  permissions: string[]
  authMethod: "PIN" | "Biometric" | "Both"
  lastAccess: string
}

export interface VehicleLocation {
  latitude: number
  longitude: number
  timestamp: string
  speed: number
  heading: number
  accuracy: number
}

// Mock data generators
export function generateThreats(count = 5): SecurityThreat[] {
  const threatTypes = [
    "Unauthorized Access Attempt",
    "Suspicious Network Traffic",
    "Malware Detection",
    "Firmware Tampering",
    "GPS Spoofing",
    "CAN Bus Injection",
    "Bluetooth Vulnerability",
  ]

  const severities: Array<"Low" | "Medium" | "High" | "Critical"> = ["Low", "Medium", "High", "Critical"]
  const sources = ["Network", "CAN Bus", "Bluetooth", "WiFi", "USB Port", "OBD-II Port"]
  const statuses: Array<"Active" | "Mitigated" | "Investigating"> = ["Active", "Mitigated", "Investigating"]

  return Array.from({ length: count }, (_, i) => ({
    id: `threat-${i + 1}`,
    type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString(),
    source: sources[Math.floor(Math.random() * sources.length)],
    details: "Detailed information about the security threat would appear here.",
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }))
}

export function generateNetworkActivity(count = 20): NetworkActivity[] {
  const protocols = ["TCP", "UDP", "HTTP", "HTTPS", "MQTT"]
  const statuses: Array<"Allowed" | "Blocked"> = ["Allowed", "Blocked"]

  return Array.from({ length: count }, (_, i) => ({
    id: `activity-${i + 1}`,
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 3600000)).toISOString(),
    source: `192.168.1.${Math.floor(Math.random() * 255)}`,
    destination: `203.0.113.${Math.floor(Math.random() * 255)}`,
    protocol: protocols[Math.floor(Math.random() * protocols.length)],
    status: Math.random() > 0.2 ? "Allowed" : "Blocked",
    bytes: Math.floor(Math.random() * 10000),
  }))
}

export function generateConnectedDevices(count = 3): ConnectedDevice[] {
  const deviceTypes = ["Smartphone", "Tablet", "Laptop", "Smartwatch", "OBD Scanner"]
  const statuses: Array<"Connected" | "Disconnected" | "Blocked"> = ["Connected", "Disconnected", "Blocked"]

  return Array.from({ length: count }, (_, i) => ({
    id: `device-${i + 1}`,
    name: `Device ${i + 1}`,
    type: deviceTypes[Math.floor(Math.random() * deviceTypes.length)],
    macAddress: Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 256)
        .toString(16)
        .padStart(2, "0"),
    ).join(":"),
    ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
    lastConnected: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }))
}

export function generateUsers(count = 2): User[] {
  const roles: Array<"Owner" | "Driver" | "Guest"> = ["Owner", "Driver", "Guest"]
  const authMethods: Array<"PIN" | "Biometric" | "Both"> = ["PIN", "Biometric", "Both"]

  return Array.from({ length: count }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `User ${i + 1}`,
    role: i === 0 ? "Owner" : roles[Math.floor(Math.random() * roles.length)],
    permissions: ["access_vehicle", "start_engine", i === 0 ? "admin_settings" : ""].filter(Boolean),
    authMethod: authMethods[Math.floor(Math.random() * authMethods.length)],
    lastAccess: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString(),
  }))
}

export function generateVehicleLocation(): VehicleLocation {
  // Generate a random location near San Francisco
  const baseLatitude = 37.7749
  const baseLongitude = -122.4194

  return {
    latitude: baseLatitude + (Math.random() * 0.1 - 0.05),
    longitude: baseLongitude + (Math.random() * 0.1 - 0.05),
    timestamp: new Date().toISOString(),
    speed: Math.floor(Math.random() * 120),
    heading: Math.floor(Math.random() * 360),
    accuracy: Math.floor(Math.random() * 10) + 1,
  }
}

// Security functions
export function scanVehicle(): Promise<{
  threats: SecurityThreat[]
  vulnerabilities: number
  securityScore: number
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        threats: generateThreats(Math.floor(Math.random() * 3)),
        vulnerabilities: Math.floor(Math.random() * 5),
        securityScore: Math.floor(Math.random() * 30) + 70,
      })
    }, 2000)
  })
}

export function applySecurityUpdates(): Promise<{
  success: boolean
  updatedComponents: string[]
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        updatedComponents: ["Firewall", "Intrusion Detection System", "Encryption Module", "Authentication System"],
      })
    }, 3000)
  })
}

export function toggleVehicleLockdown(enable: boolean): Promise<{
  success: boolean
  status: string
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        status: enable ? "Vehicle lockdown activated" : "Vehicle lockdown deactivated",
      })
    }, 1500)
  })
}

export function encryptData(data: string): string {
  // This is a mock function - in a real system, this would use proper encryption
  return `ENCRYPTED:${btoa(data)}`
}

export function decryptData(encryptedData: string): string {
  // This is a mock function - in a real system, this would use proper decryption
  if (encryptedData.startsWith("ENCRYPTED:")) {
    return atob(encryptedData.substring(10))
  }
  return encryptedData
}

export function authenticateUser(
  userId: string,
  authMethod: "PIN" | "Biometric",
  credential: string,
): Promise<{
  success: boolean
  token?: string
  error?: string
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock authentication - always succeeds for demo purposes
      resolve({
        success: true,
        token: "mock-auth-token-" + Math.random().toString(36).substring(2),
      })
    }, 1000)
  })
}

