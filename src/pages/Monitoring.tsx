import { useTranslation } from 'react-i18next';
import { Activity, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import '../i18n/config';
import { Badge } from '../components/ui/badge';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const errorRateData = [
  { time: '00:00', rate: 0.5 },
  { time: '04:00', rate: 0.3 },
  { time: '08:00', rate: 1.2 },
  { time: '12:00', rate: 0.8 },
  { time: '16:00', rate: 0.4 },
  { time: '20:00', rate: 0.6 },
];

const requestsData = [
  { endpoint: '/api/destinations', count: 1247 },
  { endpoint: '/api/users', count: 892 },
  { endpoint: '/api/favorites', count: 634 },
  { endpoint: '/api/recommendations', count: 2134 },
  { endpoint: '/api/search', count: 1456 },
];

const recentErrors = [
  {
    id: '1',
    message: 'Database connection timeout',
    endpoint: '/api/destinations',
    time: '5 minutes ago',
    severity: 'high',
  },
  {
    id: '2',
    message: 'Rate limit exceeded',
    endpoint: '/api/search',
    time: '12 minutes ago',
    severity: 'medium',
  },
  {
    id: '3',
    message: 'Invalid authentication token',
    endpoint: '/api/users',
    time: '23 minutes ago',
    severity: 'low',
  },
];

export function Monitoring() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1>{t('nav.monitoring')}</h1>
        <p className="text-muted-foreground mt-1">System health and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Uptime"
          value="99.9%"
          icon={CheckCircle}
          subtitle="Last 30 days"
        />
        <StatCard
          title="Error Rate"
          value="0.6%"
          icon={AlertTriangle}
          trend={{ value: 0.2, isPositive: false }}
        />
        <StatCard
          title="Avg Response Time"
          value="124ms"
          icon={Activity}
          trend={{ value: 5.1, isPositive: true }}
        />
        <StatCard
          title="API Requests"
          value="6.4k"
          icon={TrendingUp}
          subtitle="Last hour"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Error Rate Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={errorRateData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="time" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.75rem',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#EF476F"
                  strokeWidth={2}
                  dot={{ fill: '#EF476F' }}
                  name="Error Rate (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Requests by Endpoint</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={requestsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis type="number" className="text-muted-foreground" />
                <YAxis type="category" dataKey="endpoint" className="text-muted-foreground" width={150} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.75rem',
                  }}
                />
                <Legend />
                <Bar dataKey="count" fill="#136F63" radius={[0, 8, 8, 0]} name="Requests" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>Recent Errors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentErrors.map((error) => (
              <div
                key={error.id}
                className="flex items-start gap-4 p-4 rounded-xl bg-muted"
              >
                <AlertTriangle
                  className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                    error.severity === 'high'
                      ? 'text-[#EF476F]'
                      : error.severity === 'medium'
                      ? 'text-[#FFD166]'
                      : 'text-muted-foreground'
                  }`}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p>{error.message}</p>
                    <Badge
                      variant="secondary"
                      className={`rounded-lg ${
                        error.severity === 'high'
                          ? 'bg-[#EF476F] text-white hover:bg-[#EF476F]/90'
                          : error.severity === 'medium'
                          ? 'bg-[#FFD166] text-[#050505] hover:bg-[#FFD166]/90'
                          : ''
                      }`}
                    >
                      {error.severity}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    {error.endpoint} • {error.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
