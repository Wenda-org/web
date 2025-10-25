import { useTranslation } from 'react-i18next';
import { Users, MapPin, Heart, TrendingUp } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import '../i18n/config';
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

const userActivityData = [
  { date: 'Mon', users: 245 },
  { date: 'Tue', users: 289 },
  { date: 'Wed', users: 315 },
  { date: 'Thu', users: 298 },
  { date: 'Fri', users: 342 },
  { date: 'Sat', users: 421 },
  { date: 'Sun', users: 398 },
];

const destinationsByCategoryData = [
  { category: 'Beaches', count: 45 },
  { category: 'Nature', count: 32 },
  { category: 'Culture', count: 28 },
  { category: 'Adventure', count: 21 },
  { category: 'Restaurants', count: 67 },
  { category: 'Hotels', count: 54 },
];

const recentActivities = [
  {
    id: 1,
    type: 'destination_created',
    user: 'João Silva',
    description: 'Created new destination "Cabo Ledo Beach"',
    time: '5 minutes ago',
  },
  {
    id: 2,
    type: 'destination_updated',
    user: 'Maria Santos',
    description: 'Updated "Kalandula Falls" images',
    time: '23 minutes ago',
  },
  {
    id: 3,
    type: 'user_registered',
    user: 'System',
    description: '12 new users registered today',
    time: '1 hour ago',
  },
  {
    id: 4,
    type: 'recommendation_served',
    user: 'ML Engine',
    description: 'Served 1,247 recommendations in the last hour',
    time: '1 hour ago',
  },
];

export function Dashboard() {
  const { t, i18n } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1>{t('dashboard.title')}</h1>
        <p className="text-muted-foreground mt-1">{t('dashboard.welcome')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('dashboard.kpis.active_users')}
          value="1,247"
          icon={Users}
          trend={{ value: 12.5, isPositive: true }}
          subtitle={t('dashboard.subtitles.last_24_hours')}
        />
        <StatCard
          title={t('dashboard.kpis.destinations')}
          value="247"
          icon={MapPin}
          trend={{ value: 8.2, isPositive: true }}
          subtitle="Published"
        />
        <StatCard
          title={t('dashboard.kpis.favorites')}
          value="8,432"
          icon={Heart}
          trend={{ value: 5.1, isPositive: true }}
          subtitle="All time"
        />
        <StatCard
          title={t('dashboard.kpis.recommendations')}
          value="42.3k"
          icon={TrendingUp}
          trend={{ value: 3.2, isPositive: false }}
          subtitle="Last 7 days"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>{t('dashboard.charts.users_over_time')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" className="text-muted-foreground" />
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
                  dataKey="users"
                  stroke="#136F63"
                  strokeWidth={2}
                  dot={{ fill: '#136F63' }}
                  name={t('dashboard.kpis.active_users')}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>{t('dashboard.charts.destinations_by_category')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={destinationsByCategoryData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="category" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.75rem',
                  }}
                />
                <Legend />
                <Bar dataKey="count" fill="#136F63" radius={[8, 8, 0, 0]} name={t('dashboard.kpis.destinations')} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>{t('dashboard.recent_activity')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const nameMatch = activity.description.match(/"([^"]+)"/)?.[1];
              const numberMatch = activity.description.match(/[\d,]+/)?.[0];
              const countNum = numberMatch ? Number(numberMatch.replace(/,/g, '')) : undefined;
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                >
                  <div className="w-2 h-2 rounded-full bg-[#136F63] mt-2" />
                  <div className="flex-1">
                    <p>{t(`dashboard.activity.${activity.type}`, { name: nameMatch || '', count: countNum })}</p>
                    <p className="text-muted-foreground mt-1">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
