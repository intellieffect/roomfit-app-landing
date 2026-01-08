"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram } from "lucide-react";
import { mainContent, appContent, images } from "@/data";

export default function Footer() {
  const pathname = usePathname();
  const isAppPage = pathname === "/app";

  // Use mainContent for main page (has company details), appContent for app page
  const content = isAppPage ? appContent : mainContent;
  const { footer, site } = content;

  // Check if we have company info (only mainContent has it)
  const hasCompanyInfo = "company" in footer;
  const hasSocial = "social" in footer;

  return (
    <footer className="py-12 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8">
          {/* Logo and Site Name */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src={images.logo}
                alt={`${site.name} Logo`}
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="font-bold text-xl">{site.name}</span>
            </Link>
            {hasSocial && (
              <div className="flex items-center gap-4 mt-4">
                <a
                  href={(footer as typeof mainContent.footer).social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            )}
          </div>

          {/* Company Info - only show on main page */}
          {hasCompanyInfo && (
            <div className="lg:col-span-2">
              <h3 className="font-semibold mb-3 text-gray-300">회사 정보</h3>
              <div className="text-sm text-gray-400 space-y-1">
                <p>{(footer as typeof mainContent.footer).company.name}</p>
                <p>대표: {(footer as typeof mainContent.footer).company.ceo}</p>
                <p>{(footer as typeof mainContent.footer).company.address}</p>
                <p>
                  사업자등록번호: {(footer as typeof mainContent.footer).company.businessNumber}
                </p>
                <p>
                  통신판매업신고번호: {(footer as typeof mainContent.footer).company.salesNumber}
                </p>
              </div>
            </div>
          )}

          {/* Links */}
          <div className={hasCompanyInfo ? "lg:col-span-1" : "lg:col-span-3"}>
            <h3 className="font-semibold mb-3 text-gray-300">링크</h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              {footer.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          &copy; {site.copyright}
        </div>
      </div>
    </footer>
  );
}
