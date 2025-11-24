"use client";

import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

interface MapProps {
  view: 'split' | 'map' | 'timeline';
  setView: Dispatch<SetStateAction<'split' | 'map' | 'timeline'>>;
}

export default function Map({ view, setView }: MapProps) {
    return (
        <div className="relative w-full h-full bg-gray-200 flex items-center justify-center text-gray-600">
            <div className="text-center">
                <p className="text-xl font-semibold">Map Mock</p>
                <p className="text-sm opacity-70">ここにGoogle Mapが入るよ</p>
            </div>
            {view !== 'timeline' && (
              <button
                onClick={() => setView(view === 'split' ? 'map' : 'split')}
                className="absolute bottom-4 right-4 bg-white/70 backdrop-blur-sm p-2 rounded-md shadow-lg hover:bg-white cursor-pointer"
              >
                <Image
                  src={view === 'split' ? '/fullscreen_icon.png' : '/fullscreen_close_icon.png'}
                  alt="Toggle Fullscreen"
                  width={24}
                  height={24}
                />
              </button>
            )}
        </div>
    );
}
