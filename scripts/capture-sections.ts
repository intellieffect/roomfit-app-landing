/**
 * 각 섹션별 스크린샷 캡쳐 스크립트
 */

import { chromium } from '@playwright/test';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3002';

const SECTION_NAMES = [
  '01-MainHero',
  '02-IntroStats',
  '03-PainPoints',
  '04-HWSpecs',
  '05-WeightModes',
  '06-ExerciseShowcase',
  '07-Safety',
  '08-AppEnhancement',
  '09-Lifestyle',
  '10-SocialProof',
  '11-MainCTA',
  '12-Footer',
];

async function main() {
  const viewport = { width: 375, height: 812 };
  const outputDir = join(process.cwd(), 'screenshots', 'sections');
  await mkdir(outputDir, { recursive: true });

  console.log(`\n섹션별 스크린샷 캡쳐 시작 (${viewport.width}px)...\n`);

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.setViewportSize(viewport);
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // main 내의 모든 직접 자식 요소 가져오기
  const childElements = await page.$$('main > *');
  console.log(`발견된 요소: ${childElements.length}개\n`);

  for (let i = 0; i < childElements.length && i < SECTION_NAMES.length; i++) {
    const element = childElements[i];
    const sectionName = SECTION_NAMES[i];

    try {
      // 요소로 스크롤
      await element.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);

      // 요소 캡쳐
      await element.screenshot({ path: join(outputDir, `${sectionName}.png`) });
      console.log(`  ✓ ${sectionName} 캡쳐 완료`);
    } catch (error) {
      console.log(`  ✗ ${sectionName} 캡쳐 실패:`, error);
    }
  }

  await browser.close();
  console.log(`\n완료! 스크린샷 저장 위치: screenshots/sections/`);
}

main().catch(console.error);
