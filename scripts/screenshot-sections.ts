import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const SECTIONS = [
  { name: '01-navbar', selector: 'nav' },
  { name: '02-main-hero', selector: 'main > section:nth-of-type(1), main > div:nth-of-type(1)' },
  { name: '03-intro-stats', selector: '#stats, main > section:nth-of-type(2), main > div:nth-of-type(2)' },
  { name: '04-pain-points', selector: '#pain-points, main > section:nth-of-type(3), main > div:nth-of-type(3)' },
  { name: '05-hw-specs', selector: '#specs' },
  { name: '06-weight-modes', selector: '#modes' },
  { name: '07-exercise-showcase', selector: '#exercises, main > section:nth-of-type(6), main > div:nth-of-type(6)' },
  { name: '08-safety', selector: '#safety, main > section:nth-of-type(7), main > div:nth-of-type(7)' },
  { name: '09-app-enhancement', selector: '#app' },
  { name: '10-lifestyle', selector: '#lifestyle, main > section:nth-of-type(9), main > div:nth-of-type(9)' },
  { name: '11-social-proof', selector: '#reviews, main > section:nth-of-type(10), main > div:nth-of-type(10)' },
  { name: '12-main-cta', selector: '#purchase' },
  { name: '13-footer', selector: 'footer' },
];

async function takeScreenshots() {
  const outputDir = path.join(process.cwd(), 'screenshots', 'mobile-sections');

  // 출력 디렉토리 생성
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 }, // iPhone X 사이즈
    deviceScaleFactor: 2, // 고화질을 위한 2x 스케일
  });

  const page = await context.newPage();

  console.log('페이지 로딩 중...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // 페이지 로딩 대기
  await page.waitForTimeout(2000);

  // main 태그 내의 모든 직접 자식 요소들 찾기
  const mainChildren = await page.locator('main').locator('> *').all();
  console.log(`발견된 섹션 수: ${mainChildren.length}`);

  // 각 섹션 스크린샷 찍기
  for (let i = 0; i < mainChildren.length; i++) {
    const element = mainChildren[i];
    const tagName = await element.evaluate(el => el.tagName.toLowerCase());
    const id = await element.getAttribute('id');
    const className = await element.getAttribute('class');

    const sectionName = id || `section-${String(i + 1).padStart(2, '0')}-${tagName}`;
    const fileName = `${String(i + 1).padStart(2, '0')}-${sectionName}.png`;
    const filePath = path.join(outputDir, fileName);

    try {
      // 요소가 뷰포트에 보이도록 스크롤
      await element.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500); // 애니메이션 대기

      // 스크린샷 촬영
      await element.screenshot({
        path: filePath,
        animations: 'disabled',
      });

      console.log(`✅ ${fileName} 저장 완료`);
    } catch (error) {
      console.log(`❌ ${fileName} 촬영 실패: ${error}`);
    }
  }

  // Navbar 별도 촬영
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const navbar = page.locator('nav').first();
    await navbar.screenshot({
      path: path.join(outputDir, '00-navbar.png'),
      animations: 'disabled',
    });
    console.log('✅ 00-navbar.png 저장 완료');
  } catch (error) {
    console.log(`❌ navbar 촬영 실패: ${error}`);
  }

  // Footer 별도 촬영
  try {
    const footer = page.locator('footer').first();
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await footer.screenshot({
      path: path.join(outputDir, '99-footer.png'),
      animations: 'disabled',
    });
    console.log('✅ 99-footer.png 저장 완료');
  } catch (error) {
    console.log(`❌ footer 촬영 실패: ${error}`);
  }

  await browser.close();
  console.log(`\n스크린샷이 ${outputDir}에 저장되었습니다.`);
}

takeScreenshots().catch(console.error);
