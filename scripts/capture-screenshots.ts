/**
 * 모바일 반응형 레이아웃 검증을 위한 스크린샷 캡쳐 스크립트
 *
 * 사용법:
 *   npx tsx scripts/capture-screenshots.ts before
 *   npx tsx scripts/capture-screenshots.ts after
 */

import { chromium, type Page } from '@playwright/test';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3002';

const VIEWPORTS = [
  { name: '320', width: 320, height: 568 },   // iPhone SE
  { name: '375', width: 375, height: 667 },   // iPhone 12/13
  { name: '768', width: 768, height: 1024 },  // iPad
  { name: '1024', width: 1024, height: 768 }, // Desktop
];

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'business', path: '/business' },
];

async function captureFullPage(page: Page, outputPath: string) {
  await page.screenshot({
    path: outputPath,
    fullPage: true,
  });
  console.log(`  Captured: ${outputPath}`);
}

async function main() {
  const mode = process.argv[2];

  if (!mode || !['before', 'after'].includes(mode)) {
    console.error('Usage: npx tsx scripts/capture-screenshots.ts <before|after>');
    process.exit(1);
  }

  const outputDir = join(process.cwd(), 'screenshots', mode);
  await mkdir(outputDir, { recursive: true });

  console.log(`\nCapturing ${mode} screenshots...\n`);

  const browser = await chromium.launch();
  const context = await browser.newContext();

  for (const pageInfo of PAGES) {
    console.log(`Page: ${pageInfo.name}`);

    for (const viewport of VIEWPORTS) {
      const page = await context.newPage();
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      try {
        await page.goto(`${BASE_URL}${pageInfo.path}`, {
          waitUntil: 'networkidle',
          timeout: 30000
        });

        // 애니메이션 완료 대기
        await page.waitForTimeout(1000);

        const filename = `${pageInfo.name}-${viewport.name}.png`;
        await captureFullPage(page, join(outputDir, filename));
      } catch (error) {
        console.error(`  Error capturing ${pageInfo.name} at ${viewport.name}px:`, error);
      }

      await page.close();
    }
  }

  await browser.close();
  console.log(`\nDone! Screenshots saved to: screenshots/${mode}/`);
}

main().catch(console.error);
