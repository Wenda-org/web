import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Filter, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import '../i18n/config';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const mockMarkers = [
  { id: '1', name: 'Cabo Ledo Beach', lat: -9.5, lng: 13.1, category: 'Beaches' },
  { id: '2', name: 'Kalandula Falls', lat: -9.3, lng: 15.9, category: 'Nature' },
  { id: '3', name: 'Fortaleza de São Miguel', lat: -8.8, lng: 13.2, category: 'Culture' },
  { id: '4', name: 'Tundavala Gap', lat: -14.9, lng: 13.5, category: 'Adventure' },
  { id: '5', name: 'Miradouro da Lua', lat: -9.0, lng: 13.0, category: 'Nature' },
];

export function MapView() {
  const { t } = useTranslation();
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>{t('nav.map')}</h1>
          <p className="text-muted-foreground mt-1">{t('map.description')}</p>
        </div>
        <Button className="bg-[#136F63] hover:bg-[#0F5A51] text-white rounded-xl">
          <Plus className="w-5 h-5 mr-2" />
          {t('map.add')}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 rounded-xl overflow-hidden">
          <div className="h-[600px] bg-muted flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#E8F5F3] to-[#D1EBE7] opacity-50" />
              <div className="relative z-10 text-center">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-[#136F63]" />
              <h3>{t('map.preview.title')}</h3>
              <p className="text-muted-foreground mt-2">
                {t('map.preview.description')}
              </p>
            </div>
            {mockMarkers.map((marker) => (
              <div
                key={marker.id}
                className="absolute w-8 h-8 bg-[#136F63] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg"
                style={{
                  left: `${((marker.lng - 12) / 4) * 100 + 30}%`,
                  top: `${((marker.lat + 15) / 7) * 100 + 10}%`,
                }}
                onClick={() => setSelectedMarker(marker.id)}
              >
                <MapPin className="w-5 h-5 text-white" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{t('map.markers')}</CardTitle>
              <Button variant="ghost" size="icon" className="rounded-lg">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockMarkers.map((marker) => (
                <div
                  key={marker.id}
                  className={`p-3 rounded-xl border cursor-pointer transition-colors ${
                    selectedMarker === marker.id
                      ? 'border-[#136F63] bg-[#E8F5F3]'
                      : 'border-border hover:border-[#136F63]'
                  }`}
                  onClick={() => setSelectedMarker(marker.id)}
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#136F63] flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="truncate">{marker.name}</p>
                      <Badge variant="secondary" className="mt-1 rounded-lg">
                        {t(`destinations.categories.${marker.category.toLowerCase()}`)}
                      </Badge>
                      <p className="text-muted-foreground mt-1">
                        {marker.lat.toFixed(4)}, {marker.lng.toFixed(4)}
                      </p>
                    </div>
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
