"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Building2, Smartphone, Home, MessageSquare } from "lucide-react";
import { mainContent, appContent } from "@/data";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Use appropriate content based on current path
  const isAppPage = pathname === "/app";
  const isBusinessPage = pathname === "/business";
  const isSubPage = isAppPage || isBusinessPage;
  const content = isAppPage ? appContent : mainContent;
  const { nav } = content;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section and remove hash from URL
  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      
      if (pathname === "/") {
        // 메인 페이지: 요소 찾아서 스크롤, 없으면 해시로 폴백
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.replaceState(null, "", window.location.pathname);
        } else {
          // 요소가 아직 렌더링되지 않은 경우 폴백
          window.location.hash = href;
        }
      } else {
        // 서브 페이지: 메인으로 이동 후 해시 적용
        router.push(`/${href}`);
      }
    }
  }, [pathname, router]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-void/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/images/Wespionlogo.png"
                alt="WESPION"
                width={140}
                height={32}
                className="h-7 w-auto"
              />
            </Link>
          </div>

          <div className="flex items-center gap-4 xl:gap-6">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-gray-300 hover:text-primary transition-colors whitespace-nowrap text-sm xl:text-base"
              >
                {link.label}
              </a>
            ))}
            <div className="w-px h-6 bg-gray-700" />

            {/* Main Page Link - show on app/business pages */}
            {isSubPage && (
              <Link
                href="/"
                className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-primary transition-colors font-medium whitespace-nowrap text-sm xl:text-base"
              >
                <Home className="w-4 h-4" />
                메인
              </Link>
            )}

            {/* App Link - only show on main page */}
            {!isAppPage && "appLink" in nav && (
              <Link
                href={nav.appLink.href}
                className="flex items-center gap-2 px-3 py-2 text-primary hover:text-primary-600 transition-colors font-medium whitespace-nowrap text-sm xl:text-base"
              >
                <Smartphone className="w-4 h-4" />
                {nav.appLink.label}
              </Link>
            )}

            {/* Community Link */}
            {"communityLink" in nav && (
              <a
                href="https://shop.roomfit.kr/community"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-primary transition-colors font-medium whitespace-nowrap text-sm xl:text-base"
              >
                <MessageSquare className="w-4 h-4" />
                {nav.communityLink.label}
              </a>
            )}

            {/* Business Link - don't show on business page */}
            {!isBusinessPage && (
              <Link
                href={nav.businessLink.href}
                className="flex items-center gap-2 px-3 py-2 border-2 border-secondary text-secondary rounded-full font-medium hover:bg-secondary hover:text-gray-900 transition-colors whitespace-nowrap text-sm xl:text-base"
              >
                <Building2 className="w-4 h-4" />
                {nav.businessLink.label}
              </Link>
            )}
            {isAppPage ? (
              <a
                href="#download"
                onClick={(e) => scrollToSection(e, "#download")}
                className="bg-primary text-white px-4 py-2 rounded-full font-medium hover:bg-primary-600 transition-colors whitespace-nowrap text-sm xl:text-base"
              >
                {nav.cta}
              </a>
            ) : (
              <div className="flex items-center gap-2">
                {"ctaSecondary" in nav && (
                  <a
                    href={(nav.ctaSecondary as { href: string; text: string }).href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-primary text-primary px-4 py-2 rounded-full font-medium hover:bg-primary hover:text-white transition-colors whitespace-nowrap text-sm xl:text-base"
                  >
                    {(nav.ctaSecondary as { href: string; text: string }).text}
                  </a>
                )}
                <a
                  href="https://roomfit.kr/funding/?idx=11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-white px-4 py-2 rounded-full font-medium hover:bg-primary-600 transition-colors whitespace-nowrap text-sm xl:text-base"
                >
                  {nav.cta}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation - 2-row layout */}
        <div className="lg:hidden">
          {/* Row 1: Logo (center) + CTA button (right) */}
          <div className="flex items-center justify-center h-14 relative">
            <Link href="/">
              <Image
                src="/images/Wespionlogo.png"
                alt="WESPION"
                width={120}
                height={28}
                className="h-6 w-auto"
              />
            </Link>
            <a
              href="https://roomfit.kr/funding/?idx=11"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-0 bg-primary text-white px-3 py-1.5 rounded-full font-medium text-xs whitespace-nowrap"
            >
              {nav.cta}
            </a>
          </div>

          {/* Row 2: Menu items (horizontal, scrollable on small screens) */}
          <div className="flex items-center justify-center gap-1 pb-2 text-sm overflow-x-auto">
            {/* Community Link */}
            {"communityLink" in nav && (
              <>
                <a
                  href="https://shop.roomfit.kr/community"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary transition-colors px-2 py-1 whitespace-nowrap"
                >
                  {nav.communityLink.label}
                </a>
                <span className="text-gray-600">|</span>
              </>
            )}

            {/* App Link */}
            {!isAppPage && "appLink" in nav && (
              <>
                <Link
                  href={nav.appLink.href}
                  className="text-gray-300 hover:text-primary transition-colors px-2 py-1 whitespace-nowrap"
                >
                  {nav.appLink.label}
                </Link>
                <span className="text-gray-600">|</span>
              </>
            )}

            {/* 체험 신청 */}
            {"ctaSecondary" in nav && (
              <>
                <a
                  href={(nav.ctaSecondary as { href: string; text: string }).href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary transition-colors px-2 py-1 whitespace-nowrap"
                >
                  체험 신청
                </a>
                <span className="text-gray-600">|</span>
              </>
            )}

            {/* Business Link */}
            {!isBusinessPage && (
              <>
                <Link
                  href={nav.businessLink.href}
                  className="text-gray-300 hover:text-primary transition-colors px-2 py-1 whitespace-nowrap"
                >
                  {nav.businessLink.label}
                </Link>
                <span className="text-gray-600">|</span>
              </>
            )}

            {/* 마이페이지 */}
            <a
              href="https://shop.roomfit.kr/shop_mypage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-primary transition-colors px-2 py-1 whitespace-nowrap"
            >
              마이페이지
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
