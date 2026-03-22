"use client";

import dynamic from "next/dynamic";
import type { Reading } from "@/types/reading";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] rounded-lg bg-gray-50 animate-pulse" />
  ),
});

type MapSectionProps = {
  readings: Reading[];
};

export default function MapSection({ readings }: MapSectionProps) {
  return <MapView readings={readings} />;
}