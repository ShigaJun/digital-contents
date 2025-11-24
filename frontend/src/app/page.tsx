"use client";
import { useState } from 'react';
import Header from "./components/Header";
import Map from "./components/Map"
import TabsBar from "./components/TabsBar";
import Timeline from "./components/Timeline";

export default function Home() {
  const [view, setView] = useState('split'); // 'split', 'map', 'timeline'

  return (
    <main className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 flex flex-col min-h-0">
        <div
          className={
            view === 'split' ? 'h-1/2' :
            view === 'map' ? 'flex-1' : 'hidden'
          }
        >
          <Map view={view} setView={setView} />
        </div>
        <div className={view === 'map' ? 'hidden' : ''}>
          <TabsBar />
        </div>
        <div
          className={
            view === 'split' ? 'flex-1 min-h-0' :
            view === 'timeline' ? 'flex-1 min-h-0' : 'hidden'
          }
        >
          <Timeline view={view} setView={setView} />
        </div>
      </div>
    </main>
  );
}
