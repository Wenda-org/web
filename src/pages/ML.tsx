import { useTranslation } from 'react-i18next';
import { Brain, Play, TrendingUp, Target } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import '../i18n/config';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';

const mockJobs = [
  {
    id: '1',
    name: 'User Preference Model',
    status: 'completed',
    progress: 100,
    accuracy: 0.89,
    lastRun: '2 hours ago',
  },
  {
    id: '2',
    name: 'Collaborative Filtering',
    status: 'running',
    progress: 65,
    accuracy: null,
    lastRun: 'Running now',
  },
  {
    id: '3',
    name: 'Content-Based Filtering',
    status: 'completed',
    progress: 100,
    accuracy: 0.82,
    lastRun: '1 day ago',
  },
];

const mockRecommendations = [
  { userId: 'user_123', destination: 'Cabo Ledo Beach', confidence: 0.92 },
  { userId: 'user_456', destination: 'Kalandula Falls', confidence: 0.88 },
  { userId: 'user_789', destination: 'Tundavala Gap', confidence: 0.85 },
];

export function ML() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>{t('nav.ml')}</h1>
          <p className="text-muted-foreground mt-1">{t('ml.description')}</p>
        </div>
        <Button className="bg-[#136F63] hover:bg-[#0F5A51] text-white rounded-xl">
          <Play className="w-5 h-5 mr-2" />
          {t('ml.buttons.retrain')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title={t('ml.kpis.model_accuracy')}
          value="89.2%"
          icon={Target}
          trend={{ value: 2.3, isPositive: true }}
        />
        <StatCard
          title={t('ml.kpis.recommendations_served')}
          value="42.3k"
          icon={TrendingUp}
          subtitle={t('dashboard.subtitles.last_7_days')}
        />
        <StatCard
          title={t('ml.kpis.active_models')}
          value="3"
          icon={Brain}
        />
      </div>

      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>{t('ml.training_jobs')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockJobs.map((job) => (
              <div key={job.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Brain className="w-5 h-5 text-[#136F63]" />
                    <div>
                      <p>{job.name}</p>
                      <p className="text-muted-foreground">{job.lastRun}</p>
                    </div>
                  </div>
                    <Badge
                    className={`rounded-lg ${
                      job.status === 'completed'
                        ? 'bg-[#06D6A0] hover:bg-[#06D6A0]/90'
                        : 'bg-[#FFD166] text-[#050505] hover:bg-[#FFD166]/90'
                    }`}
                  >
                    {t(`ml.status.${job.status}`) || job.status}
                  </Badge>
                </div>
                <Progress value={job.progress} className="h-2" />
                {job.accuracy && (
                  <p className="text-muted-foreground">
                    Accuracy: {(job.accuracy * 100).toFixed(1)}%
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>{t('ml.sample_recommendations')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockRecommendations.map((rec, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl bg-muted"
              >
                <div>
                  <p>{rec.destination}</p>
                  <p className="text-muted-foreground">User: {rec.userId}</p>
                </div>
                  <Badge className="bg-[#136F63] hover:bg-[#136F63]/90 rounded-lg">
                  {t('ml.confidence_label', { percent: Math.round(rec.confidence * 100) })}
                  </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
