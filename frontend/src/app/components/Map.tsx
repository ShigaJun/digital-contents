"use client";

import { APIProvider, Map as GoogleMap, AdvancedMarker } from "@vis.gl/react-google-maps";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Post } from "@/types/post";

interface MapProps {
  view?: 'split' | 'map' | 'timeline';
  setView?: Dispatch<SetStateAction<'split' | 'map' | 'timeline'>>;
}

// 初期表示位置（今は日本大学文理学部）
const center = {
  lat: 35.662186020148546,
  lng: 139.63409803900635,
};

export default function Map({ view, setView }: MapProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const supabase = createClient();
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("post_id, latitude, longitude")
        .not("latitude", "is", null)
        .not("longitude", "is", null);

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data as Post[]);
      }
    };

    fetchPosts();
  }, []);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

  // マーカーのリストを事前に作成
  const markers = posts
    .filter(post => post.latitude && post.longitude)
    .map(post => (
      <AdvancedMarker
        key={post.post_id}
        position={{ lat: post.latitude!, lng: post.longitude! }}
      />
    ));

  if (!apiKey) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600 mb-2">
            Google Maps APIキーが設定されていません。
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <APIProvider apiKey={apiKey}>
        <GoogleMap
          defaultCenter={center}
          defaultZoom={15}
          mapId={mapId}
          gestureHandling={"greedy"}
          disableDefaultUI={false}
        >
          {markers}
        </GoogleMap>
      </APIProvider>
    </div>
  );
}