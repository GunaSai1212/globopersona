import { AppLayout } from '@/components/layout/AppLayout';
import { KPICard } from '@/components/ui/kpi-card';
import { analyticsData } from '@/data/mockData';
import { 
  Eye, 
  MousePointer,
  TrendingUp,
  BarChart3,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function Analytics() {
  return (
    <AppLayout
      title="Analytics"
      description="Track your email campaign performance"
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KPICard
          title="Total Opens"
          value={analyticsData.totalOpens.toLocaleString()}
          icon={Eye}
          variant="primary"
          trend={{ value: 12.5, isPositive: true }}
        />
        <KPICard
          title="Total Clicks"
          value={analyticsData.totalClicks.toLocaleString()}
          icon={MousePointer}
          trend={{ value: 8.3, isPositive: true }}
        />
        <KPICard
          title="Open Rate"
          value={`${analyticsData.openRate}%`}
          icon={TrendingUp}
          variant="success"
          trend={{ value: 3.2, isPositive: true }}
        />
        <KPICard
          title="Click Rate"
          value={`${analyticsData.clickRate}%`}
          icon={BarChart3}
          variant="success"
          trend={{ value: 1.5, isPositive: true }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Opens Chart */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Weekly Opens
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar 
                  dataKey="opens" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Clicks Chart */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Weekly Clicks
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData.weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="clicks" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--success))', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="mt-6 rounded-xl border border-border bg-card p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Performance Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Best Performing Day</p>
            <p className="text-2xl font-bold text-foreground">Thursday</p>
            <p className="text-sm text-success">+15% higher open rate</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Peak Engagement Time</p>
            <p className="text-2xl font-bold text-foreground">10:00 AM</p>
            <p className="text-sm text-muted-foreground">Based on your audience</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Avg. Response Time</p>
            <p className="text-2xl font-bold text-foreground">2.4 hours</p>
            <p className="text-sm text-success">-12% faster than avg</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
