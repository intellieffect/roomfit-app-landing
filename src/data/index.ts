import mainContentData from "./main-content.json";
import appContentData from "./app-content.json";
import businessContentData from "./business-content.json";
import imagesData from "./images.json";
import faqContentData from "./faq-content.json";
import type { MainContent, SiteContent, SiteImages, FAQContent } from "./types";

export const mainContent = mainContentData as MainContent;
export const appContent = appContentData as SiteContent;
export const businessContent = businessContentData;
export const images = imagesData as SiteImages;
export const faqContent = faqContentData as FAQContent;

// Legacy alias for backward compatibility
export const content = appContentData as SiteContent;

export function getScreenshot(key: keyof SiteImages["screenshots"]) {
  return images.screenshots[key];
}

export * from "./types";
export {
  testimonials,
  getTestimonialsByCategory,
  getPopularTestimonials,
  getRecentTestimonials,
  getRandomTestimonials,
  testimonialStats,
  type Testimonial as DetailedTestimonial,
} from "./testimonials";
