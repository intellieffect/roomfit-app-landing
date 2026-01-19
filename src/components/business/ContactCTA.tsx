
import Link from "next/link";
import { Mail, Phone, User } from "lucide-react";
import { businessContent } from "@/data";

export default function ContactCTA() {
  const { contactCTA } = businessContent;

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 bg-gradient-to-br from-secondary to-secondary-600 text-gray-900 relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-white/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-primary/20 rounded-full blur-[128px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
          {contactCTA.title}
        </h2>

        <p className="text-base sm:text-lg lg:text-xl text-gray-800 mb-6 sm:mb-10 max-w-2xl mx-auto">
          {contactCTA.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12">
          <a
            href={`mailto:${contactCTA.contact.email}`}
            className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-gray-900 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl hover:bg-gray-800 transition-all hover:scale-105 text-sm sm:text-base"
          >
            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            {contactCTA.cta.primary}
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-white/80 text-gray-900 px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl hover:bg-white transition-all border border-gray-200 text-sm sm:text-base"
          >
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
            {contactCTA.cta.secondary}
          </Link>
        </div>

        {/* Contact info */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center">
          <a
            href={`mailto:${contactCTA.contact.email}`}
            className="flex items-center gap-2 text-gray-800 hover:text-gray-900 transition-colors text-sm sm:text-base"
          >
            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            {contactCTA.contact.email}
          </a>
          <a
            href={`tel:${contactCTA.contact.phone}`}
            className="flex items-center gap-2 text-gray-800 hover:text-gray-900 transition-colors text-sm sm:text-base"
          >
            <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
            {contactCTA.contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
