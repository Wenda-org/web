import { useTranslation } from 'react-i18next';
import { Settings as SettingsIcon, Globe, Palette, Key } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import '../i18n/config';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';

export function Settings() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem('i18nextLng', lng);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
        <div>
        <h1>{t('nav.settings')}</h1>
        <p className="text-muted-foreground mt-1">Configure application settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-xl">
          <CardHeader>
              <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-[#136F63]" />
              <CardTitle>{t('settings.sections.api.title')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-url">{t('settings.api.base_url')}</Label>
              <Input
                id="api-url"
                placeholder="https://api.wenda.ao"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-key">{t('settings.api.key')}</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="••••••••••••••••"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mapbox-token">Mapbox Access Token</Label>
              <Input
                id="mapbox-token"
                type="password"
                placeholder="••••••••••••••••"
                className="rounded-xl"
              />
            </div>
            <Button className="w-full bg-[#136F63] hover:bg-[#0F5A51] text-white rounded-xl">
              {t('settings.buttons.save_api')}
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader>
              <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#136F63]" />
              <CardTitle>{t('settings.sections.i18n.title')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>{t('settings.appearance.default_language')}</Label>
                <p className="text-muted-foreground">Set the default language for the app</p>
              </div>
                <select
                  className="px-4 py-2 rounded-xl bg-input-background border border-border"
                  value={i18n.language}
                  onChange={(e) => changeLanguage(e.target.value)}
                >
                <option value="en">English</option>
                <option value="pt">Português</option>
              </select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>{t('settings.appearance.auto_translation')}</Label>
                <p className="text-muted-foreground">Automatically translate content</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>{t('settings.appearance.show_language_switcher')}</Label>
                <p className="text-muted-foreground">Display language options to users</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader>
              <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-[#136F63]" />
              <CardTitle>{t('settings.appearance.theme')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>{t('settings.appearance.theme')}</Label>
                <p className="text-muted-foreground">Choose your preferred theme</p>
              </div>
                <select
                  className="px-4 py-2 rounded-xl bg-input-background border border-border"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as any)}
                >
                <option value="auto">Auto</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>{t('settings.appearance.compact_mode')}</Label>
                <p className="text-muted-foreground">Reduce spacing and padding</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>{t('settings.appearance.show_animations')}</Label>
                <p className="text-muted-foreground">Enable smooth transitions</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-[#136F63]" />
              <CardTitle>General Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="items-per-page">Items Per Page</Label>
              <Input
                id="items-per-page"
                type="number"
                defaultValue="20"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cache-duration">Cache Duration (minutes)</Label>
              <Input
                id="cache-duration"
                type="number"
                defaultValue="30"
                className="rounded-xl"
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Analytics</Label>
                <p className="text-muted-foreground">Track usage and performance</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Error Reporting</Label>
                <p className="text-muted-foreground">Send error reports to Sentry</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
