import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Circle
} from "@react-google-maps/api";
import axios from "axios";
import ZoneModal from "./ZoneModal";

const googleMapsApiKey = "AIzaSyB0YI03pJ9OXO2tyGHxLvc_6OG_3kBeguo";

const containerStyle = {
  position: "absolute" as const,
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
};

type RiskZone = {
  id: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  status: string;
  createdAt: string;
};

const getRiskColor = (status: string) => {
  switch (status.toUpperCase()) {
    case "LOW":
      return "#00FF00";
    case "MEDIUM":
      return "#FFD700";
    case "HIGH":
      return "#FF0000";
    default:
      return "#ff6363";
  }
};

const areZonesOverlapping = (a: RiskZone, b: RiskZone, radius = 200) => {
  const R = 6371e3;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const φ1 = toRad(a.latitude);
  const φ2 = toRad(b.latitude);
  const Δφ = toRad(b.latitude - a.latitude);
  const Δλ = toRad(b.longitude - a.longitude);

  const aVal =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(aVal), Math.sqrt(1 - aVal));

  const distance = R * c;
  return distance <= radius * 2;
};

const CountryMap: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [riskZones, setRiskZones] = useState<RiskZone[]>([]);
  const [activeZone, setActiveZone] = useState<RiskZone | null>(null);
  const [relatedZones, setRelatedZones] = useState<RiskZone[]>([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setCurrentPosition({ lat: -11.2027, lng: 17.8739 });
        }
      );
    }

    axios.get<RiskZone[]>("http://localhost:5000/api/report")
      .then((res) => {
        setRiskZones(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar zonas de risco:", err);
      });
  }, []);

  const handleZoneClick = (zone: RiskZone) => {
    const overlapping = riskZones.filter(z => z.id !== zone.id && areZonesOverlapping(zone, z));
    setActiveZone(zone);
    setRelatedZones(overlapping);
  };

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      {currentPosition && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={14}
        >
          <Circle
            center={currentPosition}
            radius={20}
            options={{
              fillColor: "#4285F4",
              fillOpacity: 1,
              strokeWeight: 0,
            }}
          />

          {riskZones.map((zone) => (
            <Circle
              key={zone.id}
              center={{ lat: zone.latitude, lng: zone.longitude }}
              radius={200}
              options={{
                strokeColor: getRiskColor(zone.status),
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: getRiskColor(zone.status),
                fillOpacity: 0.35,
              }}
              onClick={() => handleZoneClick(zone)}
            />
          ))}

          {activeZone && (
            <ZoneModal
              key={activeZone.id}
              zone={activeZone}
              relatedZones={relatedZones}
              onClose={() => {
                setActiveZone(null);
                setRelatedZones([]);
              }}
              onSelectRelated={(zone) => handleZoneClick(zone)}
            />
          )}
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default CountryMap;
