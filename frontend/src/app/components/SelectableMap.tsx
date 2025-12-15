"use client";

import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  MapMouseEvent,
} from "@vis.gl/react-google-maps";

type LatLng = {
  lat: number;
  lng: number;
};

interface SelectableMapProps {
  value: LatLng | null;
  onChange: (latLng: LatLng) => void;
}

// 初期表示位置（今は日本大学文理学部）
const center = {
  lat: 35.662186020148546,
  lng: 139.63409803900635,
};

export default function SelectableMap({
  value,
  onChange,
}: SelectableMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

  if (!apiKey) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-red-600 font-bold">
          Google Maps APIキーが設定されていません
        </div>
      </div>
    );
  }

  const handleClick = (e: MapMouseEvent) => {
    if (!e.detail.latLng) return;

    onChange({
      lat: e.detail.latLng.lat,
      lng: e.detail.latLng.lng,
    });
  };

  return (
    <div className="relative w-full h-full">
      <APIProvider apiKey={apiKey}>
        <GoogleMap
          defaultCenter={center}
          defaultZoom={15}
          mapId={mapId}
          gestureHandling="greedy"
          onClick={handleClick}
          streetViewControl={false}
          mapTypeControl={false}
          fullscreenControl={false}
          clickableIcons={false}
        >

          {value && <AdvancedMarker position={value} />}
        </GoogleMap>
      </APIProvider>
    </div>
  );
}
