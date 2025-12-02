'use client';

import { HomeSection } from "@/components/sections/HomeSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { ProgramSection } from "@/components/sections/ProgramSection";
import { ChoirsSection } from "@/components/sections/ChoirsSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { ShareSection } from "@/components/sections/ShareSection";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentView = searchParams.get('view') || 'home';
  const containerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const isUrlUpdateFromScroll = useRef(false);

  const navigateTo = (view: string) => {
    router.replace(`/?view=${view}`);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      isProgrammaticScroll.current = true;
      element.scrollIntoView({ behavior: 'smooth' });

      // Reset flag after animation
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 1000);
    }
  };

  // URL query param이 변경되면 해당 섹션으로 스크롤
  useEffect(() => {
    // 스크롤로 인한 URL 변경이면 스크롤 동작 수행하지 않음
    if (isUrlUpdateFromScroll.current) {
      isUrlUpdateFromScroll.current = false;
      return;
    }

    const sectionId = currentView === 'home' ? 'home' : currentView;
    const element = document.getElementById(sectionId);

    if (element && containerRef.current) {
      const rect = element.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      // 이미 화면에 보이는 경우 스크롤하지 않음 (오차 범위 10px)
      const isAlreadyInView = Math.abs(rect.top - containerRect.top) < 10;

      if (!isAlreadyInView) {
        scrollToSection(sectionId);
      }
    }
  }, [currentView]);

  // 스크롤 감지 및 URL 업데이트
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            // 현재 뷰와 다를 경우에만 URL 업데이트 (replace로 히스토리 쌓지 않음)
            if (currentView !== sectionId) {
              isUrlUpdateFromScroll.current = true;
              router.replace(`/?view=${sectionId}`, { scroll: false });
            }
          }
        });
      },
      {
        root: container,
        threshold: 0.55 // 55% 이상 보이면 해당 섹션으로 간주
      }
    );

    const sections = container.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [router, currentView]);

  return (
    <div ref={containerRef} className="h-[calc(100vh-9rem)] overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
      <section id="home" className="h-full snap-start w-full overflow-hidden">
        <HomeSection onNavigate={navigateTo} />
      </section>

      <section id="intro" className="h-full snap-start w-full overflow-hidden">
        <IntroSection />
      </section>

      <section id="choirs" className="h-full snap-start w-full overflow-hidden">
        <ChoirsSection />
      </section>

      <section id="program" className="h-full snap-start w-full overflow-hidden">
        <ProgramSection />
      </section>

      <section id="location" className="h-full snap-start w-full overflow-hidden">
        <LocationSection />
      </section>

      <section id="share" className="h-full snap-start w-full overflow-hidden">
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
