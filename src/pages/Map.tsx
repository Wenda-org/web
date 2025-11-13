import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Filter, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import "../i18n/config";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useMarkers } from "../hooks/useMarkers";
import type { Marker as MapMarker } from "../api.types";

// react-leaflet
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTheme } from "../contexts/ThemeContext";

const mockMarkers = [
  {
    id: "1",
    name: "Cabo Ledo Beach",
    lat: -9.5,
    lng: 13.1,
    category: "Beaches",
  },
  {
    id: "2",
    name: "Kalandula Falls",
    lat: -9.3,
    lng: 15.9,
    category: "Nature",
  },
  {
    id: "3",
    name: "Fortaleza de São Miguel",
    lat: -8.8,
    lng: 13.2,
    category: "Culture",
  },
  {
    id: "4",
    name: "Tundavala Gap",
    lat: -14.9,
    lng: 13.5,
    category: "Adventure",
  },
  {
    id: "5",
    name: "Miradouro da Lua",
    lat: -9.0,
    lng: 13.0,
    category: "Nature",
  },
];

export function MapView() {
  const { t } = useTranslation();
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [map, setMap] = useState<import("leaflet").Map | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const {
    markers,
    loading: markersLoading,
    refetch: refetchMarkers,
  } = useMarkers();
  const { theme, effectiveTheme } = useTheme();

  // center the map on Luanda (moderate zoom)
  const center: [number, number] = [-8.8383, 13.2344];
  const zoom = 12;

  // create a simple SVG pin icon for markers so they look nicer than default
  const createIcon = (color = "#136F63") => {
    const svg = `
      <svg width="28" height="36" viewBox="0 0 24 34" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C7.03 0 3 4.03 3 9c0 6 9 20 9 20s9-14 9-20c0-4.97-4.03-9-9-9z" fill="${color}" />
        <circle cx="12" cy="9" r="3" fill="#ffffff" />
      </svg>
    `;

    return L.divIcon({
      html: svg,
      className: "custom-pin-icon",
      iconSize: [28, 36],
      iconAnchor: [14, 34],
      popupAnchor: [0, -34],
    });
  };

  // category -> color map
  const categoryColors: Record<string, string> = {
    beaches: "#1E90FF",
    nature: "#228B22",
    culture: "#FF8C00",
    adventure: "#8B008B",
  };

  // MapTiler config
  // NOTE: The API key was provided by you in the chat. For production, use
  // environment variables and keep secrets out of source code.
  const MAPTILER_KEY = "7rqYE9PeuSorkZMuwyJU";

  const MAPTILER_STYLES: Record<string, string> = {
    streets: "streets",
    satellite: "satellite",
    topo: "topo",
  };

  const buildTileUrl = (styleId: string) =>
    `https://api.maptiler.com/maps/${styleId}/256/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`;

  // helper to focus a marker: set view and open a popup programmatically
  const focusMarker = (marker: (typeof mockMarkers)[number]) => {
    if (!map) return;
    const latlng: [number, number] = [marker.lat, marker.lng];
    map.setView(latlng, 14, { animate: true });
    const content = `<div><strong>${
      marker.name
    }</strong><div style="font-size:12px;color:#6b7280">${marker.lat.toFixed(
      4
    )}, ${marker.lng.toFixed(4)}</div></div>`;
    // Use the statically imported Leaflet instance (L)
    L.popup({ maxWidth: 300 })
      .setLatLng(latlng)
      .setContent(content)
      .openOn(map);
    setSelectedMarker(marker.id);
  };

  // Haversine distance (meters)
  const distanceMeters = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const toRad = (v: number) => (v * Math.PI) / 180;
    const R = 6371000;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const locateUser = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(coords);
        if (map) map.setView([coords.lat, coords.lng], 13, { animate: true });
      },
      (err) => console.warn("Geolocation error", err),
      { enableHighAccuracy: true, maximumAge: 60000 }
    );
  };

  // small component used inside MapContainer to get map instance via hook
  function MapEffect({ onMap }: { onMap: (m: import("leaflet").Map) => void }) {
    const map = useMap();
    useEffect(() => {
      onMap(map);
    }, [map]);
    return null;
  }

  // quick validation: check whether markers are inside Angola bounding box (approx)
  const ANGOLA_BOUNDS = {
    latMin: -18.0,
    latMax: -4.0,
    lngMin: 11.0,
    lngMax: 24.0,
  };
  const outOfBounds = mockMarkers.filter(
    (m) =>
      m.lat < ANGOLA_BOUNDS.latMin ||
      m.lat > ANGOLA_BOUNDS.latMax ||
      m.lng < ANGOLA_BOUNDS.lngMin ||
      m.lng > ANGOLA_BOUNDS.lngMax
  );

  // choose a default style depending on theme (simple heuristic)
  const defaultStyle =
    (effectiveTheme || theme) === "dark"
      ? MAPTILER_STYLES.topo
      : MAPTILER_STYLES.streets;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>{t("nav.map")}</h1>
          <p className="text-muted-foreground mt-1">{t("map.description")}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="bg-[#136F63] hover:bg-[#0F5A51] text-white rounded-xl"
            onClick={() => locateUser()}
          >
            <MapPin className="w-5 h-5 mr-2" />
            {t("map.locate") || "Locate me"}
          </Button>
          <Button className="bg-[#136F63] hover:bg-[#0F5A51] text-white rounded-xl">
            <Plus className="w-5 h-5 mr-2" />
            {t("map.add")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 rounded-xl overflow-hidden p-0 relative h-[600px]">
          <MapContainer
            center={center}
            zoom={zoom}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <MapEffect onMap={setMap} />
            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="Streets">
                <TileLayer
                  attribution="&copy; MapTiler &copy; OpenStreetMap contributors"
                  url={buildTileUrl(MAPTILER_STYLES.streets)}
                />
              </LayersControl.BaseLayer>

              <LayersControl.BaseLayer name="Satellite">
                <TileLayer
                  attribution="&copy; MapTiler &copy; OpenStreetMap contributors"
                  url={buildTileUrl(MAPTILER_STYLES.satellite)}
                />
              </LayersControl.BaseLayer>

              <LayersControl.BaseLayer name="Topographic">
                <TileLayer
                  attribution="&copy; MapTiler &copy; OpenStreetMap contributors"
                  url={buildTileUrl(MAPTILER_STYLES.topo)}
                />
              </LayersControl.BaseLayer>

              <LayerGroup>
                {(markers && markers.length > 0 ? markers : mockMarkers).map(
                  (marker: MapMarker | (typeof mockMarkers)[number]) => (
                    <Marker
                      key={marker.id}
                      position={[marker.lat, marker.lng]}
                      icon={createIcon(
                        categoryColors[
                          ((marker as any).category || "").toLowerCase()
                        ] || "#136F63"
                      )}
                      eventHandlers={{
                        click: () => setSelectedMarker(marker.id),
                      }}
                    >
                      <Popup>
                        <div>
                          <strong>
                            {(marker as any).title ?? (marker as any).name}
                          </strong>
                          <div className="text-sm text-muted-foreground">
                            {marker.lat.toFixed(4)}, {marker.lng.toFixed(4)}
                          </div>
                          {userLocation && (
                            <div className="text-sm text-muted-foreground mt-1">
                              Distance:{" "}
                              {(
                                distanceMeters(
                                  userLocation.lat,
                                  userLocation.lng,
                                  marker.lat,
                                  marker.lng
                                ) / 1000
                              ).toFixed(2)}{" "}
                              km
                            </div>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  )
                )}

                {userLocation && (
                  <Marker
                    position={[userLocation.lat, userLocation.lng]}
                    icon={createIcon("#1f7ed0")}
                  >
                    <Popup>You are here</Popup>
                  </Marker>
                )}
              </LayerGroup>
            </LayersControl>
          </MapContainer>
        </Card>

        <Card className="rounded-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{t("map.markers")}</CardTitle>
              <Button variant="ghost" size="icon" className="rounded-lg">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {outOfBounds.length > 0 && (
              <div className="mb-4 p-3 rounded-md bg-yellow-50 border border-yellow-200 text-sm text-yellow-800">
                Alguns marcadores parecem estar fora dos limites aproximados de
                Angola. Verifique as coordenadas:
                <ul className="mt-2 list-disc list-inside">
                  {outOfBounds.map((m) => (
                    <li key={m.id}>
                      {m.name}: {m.lat}, {m.lng}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="space-y-3">
              {mockMarkers.map((marker) => (
                <div
                  key={marker.id}
                  className={`p-3 rounded-xl border cursor-pointer transition-colors ${
                    selectedMarker === marker.id
                      ? "border-[#136F63] bg-[#E8F5F3]"
                      : "border-border hover:border-[#136F63]"
                  }`}
                  onClick={() => focusMarker(marker)}
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#136F63] flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="truncate">{marker.name}</p>
                      <Badge variant="secondary" className="mt-1 rounded-lg">
                        {t(
                          `destinations.categories.${marker.category.toLowerCase()}`
                        )}
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
