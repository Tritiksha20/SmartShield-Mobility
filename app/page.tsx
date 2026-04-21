import { Suspense } from "react"
import DashboardHeader from "@/components/dashboard-header"
import SecurityOverview from "@/components/security-overview"
import RealTimeMonitoring from "@/components/real-time-monitoring"
import ResponsePrevention from "@/components/response-prevention"
import UserDeviceManagement from "@/components/user-device-management"
import AIPredictiveSecurity from "@/components/ai-predictive-security"
import LoadingDashboard from "@/components/loading-dashboard"

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-black text-white">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-6">
        <Suspense fallback={<LoadingDashboard />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SecurityOverview />
            <RealTimeMonitoring />
            <ResponsePrevention />
            <UserDeviceManagement />
            <AIPredictiveSecurity className="md:col-span-2" />
          </div>
        </Suspense>
      </div>
    </main>
  )
}

