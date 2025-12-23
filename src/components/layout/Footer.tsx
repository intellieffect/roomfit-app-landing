import Image from "next/image";
import { content, images } from "@/data";

export default function Footer() {
  const { footer, site } = content;

  return (
    <footer className="py-12 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src={images.logo}
              alt={`${site.name} Logo`}
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="font-bold text-xl">{site.name}</span>
          </div>

          <div className="flex items-center gap-6 text-gray-400">
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

          <div className="text-gray-500 text-sm">
            &copy; {site.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}
