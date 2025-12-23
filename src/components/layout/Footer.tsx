import Image from "next/image";

export default function Footer() {
  const footerLinks = [
    { href: "#", label: "이용약관" },
    { href: "#", label: "개인정보처리방침" },
    { href: "#", label: "고객센터" },
  ];

  return (
    <footer className="py-12 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/images/app_icon.png"
              alt="Roomfit Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="font-bold text-xl">Roomfit</span>
          </div>

          <div className="flex items-center gap-6 text-gray-400">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="text-gray-500 text-sm">
            &copy; 2024 Roomfit. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
