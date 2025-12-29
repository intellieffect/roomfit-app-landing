"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Building2 } from "lucide-react";
import { content, images } from "@/data";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { nav, site } = content;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-[#0a0a0f]/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={images.logo}
                alt={`${site.name} Logo`}
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                {site.name}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
            <Link
              href={nav.businessLink.href}
              className="flex items-center gap-2 px-4 py-2 border-2 border-secondary text-secondary rounded-full font-medium hover:bg-secondary hover:text-gray-900 transition-colors"
            >
              <Building2 className="w-4 h-4" />
              {nav.businessLink.label}
            </Link>
            <a
              href="#download"
              className="bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-primary-600 transition-colors"
            >
              {nav.cta}
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-900 dark:text-white" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0a0a0f] border-t border-gray-100 dark:border-gray-800">
          <div className="px-4 py-4 space-y-3">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-gray-600 dark:text-gray-300 hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              href={nav.businessLink.href}
              className="flex items-center gap-2 text-secondary py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Building2 className="w-4 h-4" />
              {nav.businessLink.label}
            </Link>
            <a
              href="#download"
              className="block bg-primary text-white px-5 py-3 rounded-full font-medium text-center hover:bg-primary-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {nav.cta}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
