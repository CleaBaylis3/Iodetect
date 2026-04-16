"use client";

import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import { useEffect } from "react";

import type { Reading, IodineStatus } from "@/types/reading";

type MapViewProps = {
  readings: Reading[];
};

function getMarkerColor(status: IodineStatus): string {
  switch (status) {
    case "LOW":
      return "#ef4444";
    case "NORMAL":
      return "#facc15";
    case "HIGH":
      return "#22c55e";
    default:
      return "#3b82f6";
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

function createClusterCustomIcon(cluster: L.MarkerCluster) {
  const count = cluster.getChildCount();

  return L.divIcon({
    html: `
      <div style="
        width: 42px;
        height: 42px;
        border-radius: 9999px;
        background: #2563eb;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 700;
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(37,99,235,0.35);
      ">
        ${count}
      </div>
    `,
    className: "",
    iconSize: [42, 42],
    iconAnchor: [21, 21],
  });
}

function FitBounds({ readings }: { readings: Reading[] }) {
  const map = useMap();

  useEffect(() => {
    if (readings.length === 0) return;

    const bounds = L.latLngBounds(
      readings.map((reading) => [reading.location.lat, reading.location.lon])
    );

    map.fitBounds(bounds, {
      padding: [40, 40],
      maxZoom: 4,
    });
  }, [map, readings]);

  return null;
}

export default function MapView({ readings }: MapViewProps) {
  return (
    <div className="h-[460px] w-full overflow-hidden rounded-[24px]">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds readings={readings} />

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {readings.map((reading) => (
            <Marker
              key={reading.id}
              position={[reading.location.lat, reading.location.lon]}
              icon={createColoredIcon(reading.status)}
            >
              <Popup>
                <div className="space-y-1">
                  <div>
                    <strong>
                      {reading.location.city}, {reading.location.country}
                    </strong>
                  </div>
                  <div>Iodine: {reading.iodine_ug_L} µg/L</div>
                  <div>Status: {reading.status}</div>
                  <div>
                    Time: {new Date(reading.timestamp).toLocaleString()}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}