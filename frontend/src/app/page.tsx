import Header from "./components/Header";
import Map from "./components/Map"
import TabsBar from "./components/TabsBar";
import Timeline from "./components/Timeline";

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 flex flex-col min-h-0">
        <div className="h-1/3">
          <Map />
        </div>
        <div>
          <TabsBar />
        </div>
        <div className="flex-1 min-h-0">
          <Timeline />
        </div>
      </div>
    </main>
  );
}
