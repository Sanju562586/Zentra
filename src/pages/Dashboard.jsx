import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import MetricCard from "@/components/admin/MetricCard";
import LogsViewer from "@/components/admin/LogsViewer";
import KafkaViewer from "@/components/admin/KafkaViewer";
import TraceViewer from "@/components/admin/TraceViewer";
import ChaosTesting from "@/components/admin/ChaosTesting";
import TestRunner from "@/components/admin/TestRunner";
import RevenueChart from "@/components/admin/RevenueChart";
import ServiceHealth from "@/components/admin/ServiceHealth";
import { useMetrics } from "@/hooks/useMetrics";
import { useLogs } from "@/hooks/useLogs";
import { TrendingUp, Users, DollarSign, Activity, ShoppingCart, Terminal, TestTube } from "lucide-react";
import DashboardCard from "@/components/admin/DashboardCard";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { data: metrics, isLoading } = useMetrics();
  const { logs } = useLogs();

  const tests = [
    {
      name: "Happy Path Order",
      description: "Order → Payment → Inventory → Confirmation",
      failStepIndex: null,
    },
    {
      name: "Payment Failure",
      description: "Simulate payment service failure and rollback",
      failStepIndex: 1,
    },
    {
      name: "Inventory Unavailable",
      description: "Test out-of-stock scenario handling",
      failStepIndex: 2,
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
      case "metrics":
        return null; // Rendered persistently below

      case "logs":
        return null; // Rendered persistently below

      case "kafka":
        return (
          <DashboardCard title="Kafka Stream" icon={Terminal} description="Real-time event stream monitoring">
            <KafkaViewer />
          </DashboardCard>
        );

      case "traces":
        return (
          <DashboardCard title="Distributed Traces" icon={Activity} description="End-to-end request tracing and spans">
            <TraceViewer />
          </DashboardCard>
        );

      case "chaos":
        return <ChaosTesting />;

      case "tests":
        return (
          <DashboardCard title="System Tests" icon={TestTube} description="Automated integration and resiliency tests">
            <TestRunner tests={tests} />
          </DashboardCard>
        );

      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="max-w-7xl mx-auto h-full">
        {renderContent()}

        {/* Persistent Overview */}
        <div className={activeTab === "overview" ? "block space-y-6" : "hidden"}>
          <h2 className="text-2xl font-bold text-white mb-6">System Overview</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Orders Today"
              value={metrics?.ordersToday?.toLocaleString()}
              change={metrics?.changes?.orders}
              icon={<ShoppingCart className="w-6 h-6" />}
              loading={isLoading}
            />
            <MetricCard
              title="Success Rate"
              value={`${metrics?.successRate}%`}
              change={metrics?.changes?.success}
              icon={<Users className="w-6 h-6" />}
              loading={isLoading}
            />
            <div className="lg:col-span-2">
              <ServiceHealth />
            </div>
          </div>

          <LogsViewer logs={logs} />
        </div>

        {/* Persistent Metrics */}
        <div className={activeTab === "metrics" ? "block space-y-6" : "hidden"}>
          <h2 className="text-2xl font-bold text-white mb-6">Detailed Metrics</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Revenue"
              value={`$${metrics?.revenueToday?.toLocaleString()}`}
              change={metrics?.changes?.revenue}
              icon={<DollarSign className="w-6 h-6" />}
              loading={isLoading}
            />
            <MetricCard
              title="Avg Latency"
              value={`${metrics?.avgLatency}ms`}
              change={metrics?.changes?.latency}
              icon={<Activity className="w-6 h-6" />}
              loading={isLoading}
            />
            <MetricCard
              title="Active Users"
              value="1,234"
              change="+12%"
              icon={<Users className="w-6 h-6" />}
              loading={isLoading}
            />
            <MetricCard
              title="Error Rate"
              value={(100 - metrics?.successRate).toFixed(1) + "%"}
              change={metrics?.changes?.success ? -metrics.changes.success : 0}
              icon={<Activity className="w-6 h-6" />}
              loading={isLoading}
            />
          </div>

          <DashboardCard title="Revenue Trend">
            <div className="p-6">
              <RevenueChart data={metrics?.history} />
            </div>
          </DashboardCard>
        </div>

        {/* Persistent Logs Viewer */}
        <div className={activeTab === "logs" ? "block h-full" : "hidden"}>
          <LogsViewer logs={logs} fullHeight={true} />
        </div>
      </div>
    </AdminLayout>
  );
}