"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Menu, X, Building2, Smartphone, Home, MessageSquare } from "lucide-react";
import { mainContent, appContent } from "@/data";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Use appropriate content based on current path
  const isAppPage = pathname === "/app";
  const isBusinessPage = pathname === "/business";
  const isCommunityPage = pathname?.startsWith("/community");
  const isSubPage = isAppPage || isBusinessPage || isCommunityPage;
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
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        // Remove hash from URL after scroll
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-void/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/roomfit/logo.svg"
                alt="ROOMFIT"
                width={120}
                height={28}
                className="h-6 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
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

            {/* Community Link - don't show on community page */}
            {!isCommunityPage && "communityLink" in nav && (
              <Link
                href={nav.communityLink.href}
                className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-primary transition-colors font-medium whitespace-nowrap text-sm xl:text-base"
              >
                <MessageSquare className="w-4 h-4" />
                {nav.communityLink.label}
              </Link>
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
            <a
              href={isAppPage ? "#download" : "#purchase"}
              onClick={(e) => scrollToSection(e, isAppPage ? "#download" : "#purchase")}
              className="bg-primary text-white px-4 py-2 rounded-full font-medium hover:bg-primary-600 transition-colors whitespace-nowrap text-sm xl:text-base"
            >
              {nav.cta}
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-3"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0a0f] border-t border-gray-800">
          <div className="px-5 py-5 space-y-3">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-gray-300 hover:text-primary transition-colors py-2"
                onClick={(e) => {
                  scrollToSection(e, link.href);
                  setMobileMenuOpen(false);
                }}
              >
                {link.label}
              </a>
            ))}

            {/* Main Page Link - show on app/business pages */}
            {isSubPage && (
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-300 hover:text-primary py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="w-4 h-4" />
                메인
              </Link>
            )}

            {/* App Link - only show on main page */}
            {!isAppPage && "appLink" in nav && (
              <Link
                href={nav.appLink.href}
                className="flex items-center gap-2 text-primary py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Smartphone className="w-4 h-4" />
                {nav.appLink.label}
              </Link>
            )}

            {/* Community Link - don't show on community page */}
            {!isCommunityPage && "communityLink" in nav && (
              <Link
                href={nav.communityLink.href}
                className="flex items-center gap-2 text-gray-300 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MessageSquare className="w-4 h-4" />
                {nav.communityLink.label}
              </Link>
            )}

            {/* Business Link - don't show on business page */}
            {!isBusinessPage && (
              <Link
                href={nav.businessLink.href}
                className="flex items-center gap-2 text-secondary py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Building2 className="w-4 h-4" />
                {nav.businessLink.label}
              </Link>
            )}
            <a
              href={isAppPage ? "#download" : "#purchase"}
              className="block bg-primary text-white px-5 py-3 rounded-full font-medium text-center hover:bg-primary-600 transition-colors"
              onClick={(e) => {
                scrollToSection(e, isAppPage ? "#download" : "#purchase");
                setMobileMenuOpen(false);
              }}
            >
              {nav.cta}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
