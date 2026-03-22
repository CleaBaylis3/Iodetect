"use client";

import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";

import type { Reading, IodineStatus } from "@/types/reading";

type MapViewProps = {
  readings: Reading[];
};

function getMarkerColor(status: IodineStatus): string {
  switch (status) {
    case "LOW":
      return "gold";
    case "NORMAL":
      return "green";
    case "HIGH":
      return "red";
    default:
      return "blue";
  }
}

function createColoredIcon(status: IodineStatus) {
  const color = getMarkerColor(status);

  return L.divIcon({
    html: `
      <div style="
        width: 16px;
        height: 16px;
        border-radius: 9999px;
        background: ${color};
        border: 2px solid white;
        box-shadow: 0 0 6px rgba(0,0,0,0.25);
      "></div>
    `,
    className: "",
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -8],
  });
}

export default function MapView({ readings }: MapViewProps) {
  return (
    <div className="h-[420px] w-full overflow-hidden rounded-lg">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup chunkedLoading>
          {readings.map((reading) => (
            <Marker
              key={reading.id}
              position={[reading.location.lat, reading.location.lon]}
              icon={createColoredIcon(reading.status)}
            >
              <Popup>
                <div className="space-y-1">
                  <div><strong>{reading.location.city}, {reading.location.country}</strong></div>
                  <div>Iodine: {reading.iodine_ug_L} µg/L</div>
                  <div>Status: {reading.status}</div>
                  <div>Time: {new Date(reading.timestamp).toLocaleString()}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}