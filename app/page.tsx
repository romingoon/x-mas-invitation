'use client';

import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { HomeSection } from "@/components/sections/HomeSection";
import { SectionSkeleton } from "@/components/ui/SectionSkeleton";

// Dynamic imports for code splitting
const IntroSection = dynamic(
  () => import("@/components/sections/IntroSection").then(mod => ({ default: mod.IntroSection })),
  { loading: () => <SectionSkeleton /> }
);

const ChoirsSection = dynamic(
  () => import("@/components/sections/ChoirsSection").then(mod => ({ default: mod.ChoirsSection })),
  { loading: () => <SectionSkeleton /> }
);

const ProgramSection = dynamic(
  () => import("@/components/sections/ProgramSection").then(mod => ({ default: mod.ProgramSection })),
  { loading: () => <SectionSkeleton /> }
);

const LocationSection = dynamic(
  () => import("@/components/sections/LocationSection").then(mod => ({ default: mod.LocationSection })),
  { loading: () => <SectionSkeleton /> }
);

const ShareSection = dynamic(
  () => import("@/components/sections/ShareSection").then(mod => ({ default: mod.ShareSection })),
  { loading: () => <SectionSkeleton /> }
);

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentView = searchParams.get('view') || 'home';
  const containerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const isUrlUpdateFromScroll = useRef(false);

  const navigateTo = (view: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('view', view);
    router.replace(`/?${newParams.toString()}`);
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
              const newParams = new URLSearchParams(searchParams.toString());
              newParams.set('view', sectionId);
              router.replace(`/?${newParams.toString()}`, { scroll: false });
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
    <div ref={containerRef} className="h-[calc(100dvh-5rem)] overflow-y-scroll snap-y snap-proximity scroll-smooth no-scrollbar">
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
