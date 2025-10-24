import { useTranslation } from 'react-i18next';
import { Bell, Send, Calendar } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import '../i18n/config';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';

const notificationHistory = [
  {
    id: '1',
    title: 'New Beach Destination',
    message: 'Check out Cabo Ledo Beach - perfect for surfing!',
    sent: '2 hours ago',
    recipients: 1247,
    status: 'delivered',
  },
  {
    id: '2',
    title: 'Weekend Adventure',
    message: 'Plan your weekend trip to Kalandula Falls',
    sent: '1 day ago',
    recipients: 892,
    status: 'delivered',
  },
  {
    id: '3',
    title: 'Cultural Tour',
    message: 'Explore historic Fortaleza de São Miguel',
    sent: '3 days ago',
    recipients: 634,
    status: 'delivered',
  },
];

export function Notifications() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1>{t('nav.notifications')}</h1>
        <p className="text-muted-foreground mt-1">Send push notifications to users</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Sent"
          value="15.2k"
          icon={Bell}
          subtitle="All time"
        />
        <StatCard
          title="Delivered Today"
          value="1,247"
          icon={Send}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Scheduled"
          value="3"
          icon={Calendar}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Create Notification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter notification title"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Enter notification message"
                rows={4}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <select
                id="language"
                className="w-full px-4 py-3 rounded-xl bg-input-background border border-border"
              >
                <option value="en">English</option>
                <option value="pt">Português</option>
                <option value="both">Both</option>
              </select>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1 bg-[#136F63] hover:bg-[#0F5A51] text-white rounded-xl">
                <Send className="w-4 h-4 mr-2" />
                Send Now
              </Button>
              <Button variant="outline" className="flex-1 rounded-xl">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Notification History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notificationHistory.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 rounded-xl border border-border"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4>{notification.title}</h4>
                    <Badge className="bg-[#06D6A0] hover:bg-[#06D6A0]/90 rounded-lg">
                      {notification.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">{notification.message}</p>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>{notification.recipients.toLocaleString()} recipients</span>
                    <span>{notification.sent}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
