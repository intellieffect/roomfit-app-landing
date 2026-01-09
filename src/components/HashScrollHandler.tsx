"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const SCROLL_STORAGE_KEY = "roomfit_scroll_positions";

function getScrollPositions(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const stored = sessionStorage.getItem(SCROLL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveScrollPosition(path: string, position: number) {
  if (typeof window === "undefined") return;
  try {
    const positions = getScrollPositions();
    positions[path] = position;
    sessionStorage.setItem(SCROLL_STORAGE_KEY, JSON.stringify(positions));
  } catch {
    // sessionStorage 사용 불가 시 무시
  }
}

function getSavedScrollPosition(path: string): number | null {
  const positions = getScrollPositions();
  return positions[path] ?? null;
}

export default function HashScrollHandler() {
  const pathname = usePathname();
  const prevPathRef = useRef<string | null>(null);
  const isRestoringRef = useRef(false);

  // 페이지 떠날 때 스크롤 위치 저장
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveScrollPosition(pathname, window.scrollY);
    };

    // 스크롤 이벤트로 실시간 저장 (throttled)
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      if (isRestoringRef.current) return;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        saveScrollPosition(pathname, window.scrollY);
      }, 100);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      // 다른 페이지로 이동 시 현재 위치 저장
      saveScrollPosition(pathname, window.scrollY);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [pathname]);

  // 페이지 진입 시 스크롤 위치 복원 또는 해시 처리
  useEffect(() => {
    const hash = window.location.hash;

    // 해시가 있으면 해당 섹션으로 스크롤
    if (hash) {
      const timeoutId = setTimeout(() => {
        const targetId = hash.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setTimeout(() => {
            window.history.replaceState(null, "", pathname);
          }, 100);
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    }

    // 이전 페이지에서 돌아온 경우 스크롤 위치 복원
    const savedPosition = getSavedScrollPosition(pathname);
    if (savedPosition !== null && savedPosition > 0) {
      isRestoringRef.current = true;
      // DOM 렌더링 후 스크롤 복원
      const timeoutId = setTimeout(() => {
        window.scrollTo(0, savedPosition);
        // 복원 후 약간의 지연을 두고 플래그 해제
        setTimeout(() => {
          isRestoringRef.current = false;
        }, 100);
      }, 50);

      return () => clearTimeout(timeoutId);
    }

    prevPathRef.current = pathname;
  }, [pathname]);

  return null;
}
