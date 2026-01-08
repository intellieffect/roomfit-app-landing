import { chromium } from "@playwright/test";
import path from "path";
import fs from "fs";

const viewports = [
  { name: "320", width: 320, height: 568 },
  { name: "375", width: 375, height: 812 },
  { name: "768", width: 768, height: 1024 },
];

const pages = [
  { name: "home", path: "/" },
  { name: "business", path: "/business" },
];

async function capture() {
  const outputDir = path.join(process.cwd(), "screenshots/before");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });

  for (const viewport of viewports) {
    console.log(`Capturing ${viewport.name}px...`);

    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 2,
    });

    for (const pageInfo of pages) {
      const page = await context.newPage();

      console.log(`  Loading ${pageInfo.name}...`);
      await page.goto(`http://localhost:3000${pageInfo.path}`);

      // 네트워크 안정화 대기
      await page.waitForLoadState("networkidle");

      // 애니메이션 대기 (3초)
      await page.waitForTimeout(3000);

      // 전체 스크롤하여 애니메이션 트리거
      await page.evaluate(async () => {
        const height = document.documentElement.scrollHeight;
        for (let y = 0; y < height; y += 300) {
          window.scrollTo(0, y);
          await new Promise(r => setTimeout(r, 300));
        }
        window.scrollTo(0, 0);
      });

      // 최종 대기
      await page.waitForTimeout(2000);

      // 스크린샷
      await page.screenshot({
        path: path.join(outputDir, `${pageInfo.name}-${viewport.name}.png`),
        fullPage: true,
      });

      console.log(`  Saved: ${pageInfo.name}-${viewport.name}.png`);
      await page.close();
    }

    await context.close();
  }

  await browser.close();
  console.log("Done!");
}

capture().catch(console.error);
