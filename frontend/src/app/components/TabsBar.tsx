"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const tabs = [
  { label: "すべての猫", href: "/" },
  { label: "自分が投稿した猫", href: "/?filter=my_posts" },
  { label: "かわいいした猫", href: "/?filter=favorites" },
];

export default function TabsBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  const tabRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const indicatorRef = useRef<HTMLDivElement | null>(null);

  const getActiveTabHref = () => {
    if (pathname !== "/") return "";
    if (filter === "my_posts") return "/?filter=my_posts";
    if (filter === "favorites") return "/?filter=favorites";
    return "/";
  };

  const activeTabHref = getActiveTabHref();

  useEffect(() => {
    const el = tabRefs.current[activeTabHref];
    const indicator = indicatorRef.current;

    if (el && indicator) {
      indicator.style.width = `${el.offsetWidth}px`;
      indicator.style.left = `${el.offsetLeft}px`;
    }
  }, [activeTabHref]);

  return (
    <div className="w-full border-b bg-base-100">
                  <div className="flex justify-around overflow-x-auto relative">        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            ref={(el) => {
              tabRefs.current[tab.href] = el;
            }}
            className={`
              px-4
              whitespace-nowrap
              py-3 text-sm
              md:py-4 md:text-base md:tracking-wide
              transition-colors
              cursor-pointer
              ${
                activeTabHref === tab.href
                  ? "font-bold text-black"
                  : "text-gray-500 hover:text-gray-700"
              }
            `}
          >
            {tab.label}
          </Link>
        ))}

        <div
          ref={indicatorRef}
          className="absolute bottom-0 h-0.5 md:h-[3px] bg-black transition-all duration-300"
        />
      </div>
    </div>
  );
}
