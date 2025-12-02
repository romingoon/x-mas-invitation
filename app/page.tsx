'use client';

import { HomeSection } from "@/components/sections/HomeSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { ProgramSection } from "@/components/sections/ProgramSection";
import { ChoirsSection } from "@/components/sections/ChoirsSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { ShareSection } from "@/components/sections/ShareSection";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentView = searchParams.get('view') || 'home';

  const navigateTo = (view: string) => {
    router.push(`/?view=${view}`);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // URL query param이 변경되면 해당 섹션으로 스크롤
  useEffect(() => {
    const sectionId = currentView === 'home' ? 'home' : currentView;
    scrollToSection(sectionId);
  }, [currentView]);

  return (
    <div className="h-[calc(100vh-9rem)] overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
      <section id="home" className="h-full snap-start w-full">
        <HomeSection onNavigate={navigateTo} />
      </section>

      <section id="intro" className="h-full snap-start w-full bg-white">
        <IntroSection />
      </section>

      <section id="choirs" className="h-full snap-start w-full bg-stone-50">
        <ChoirsSection />
      </section>

      <section id="program" className="h-full snap-start w-full bg-white">
        <ProgramSection />
      </section>

      <section id="location" className="h-full snap-start w-full bg-white">
        <LocationSection />
      </section>

      <section id="share" className="h-full snap-start w-full bg-white">
        <ShareSection />
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
