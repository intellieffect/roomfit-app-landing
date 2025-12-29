import contentData from "./content.json";
import businessContentData from "./business-content.json";
import imagesData from "./images.json";
import type { SiteContent, SiteImages } from "./types";

export const content = contentData as SiteContent;
export const businessContent = businessContentData;
export const images = imagesData as SiteImages;

export function getScreenshot(key: keyof SiteImages["screenshots"]) {
  return images.screenshots[key];
}

export * from "./types";
