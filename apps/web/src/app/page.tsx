import EnterpriseLayout from '@/components/EnterpriseLayout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import MonitoringColumns from '@/components/MonitoringColumns'

export default function Home() {
  return (
    <ProtectedRoute>
      <EnterpriseLayout>
        <MonitoringColumns />
      </EnterpriseLayout>
    </ProtectedRoute>
  )
}