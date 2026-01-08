import { chromium } from "@playwright/test";
import { spawn } from "child_process";
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

async function waitForAnimations(page: any) {
  // 페이지 로드 완료 대기
  await page.waitForLoadState("networkidle");

  // 초기 애니메이션 대기 (3초)
  await page.waitForTimeout(3000);

  // 전체 페이지 스크롤하여 모든 섹션 트리거
  await page.evaluate(async () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;

    // 천천히 스크롤하면서 각 섹션 애니메이션 트리거
    for (let y = 0; y < scrollHeight; y += viewportHeight * 0.5) {
      window.scrollTo(0, y);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // 맨 위로 돌아가기
    window.scrollTo(0, 0);
  });

  // 추가 애니메이션 완료 대기
  await page.waitForTimeout(2000);
}

async function captureScreenshots() {
  const outputDir = path.join(process.cwd(), "screenshots/before");

  // 출력 디렉토리 생성
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 개발 서버 시작
  console.log("Starting dev server...");
  const devServer = spawn("pnpm", ["dev"], {
    cwd: process.cwd(),
    stdio: "pipe",
  });

  // 서버 시작 대기
  await new Promise<void>((resolve) => {
    devServer.stdout?.on("data", (data) => {
      const output = data.toString();
      if (output.includes("Ready") || output.includes("started")) {
        console.log("Dev server ready");
        resolve();
      }
    });
  });

  // 추가 안정화 대기
  await new Promise(resolve => setTimeout(resolve, 3000));

  const browser = await chromium.launch({ headless: true });

  try {
    for (const viewport of viewports) {
      console.log(`\nCapturing at ${viewport.name}px...`);

      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: 2,
      });

      for (const pageInfo of pages) {
        const page = await context.newPage();
        const url = `http://localhost:3000${pageInfo.path}`;

        console.log(`  Loading ${pageInfo.name}...`);
        await page.goto(url, { waitUntil: "domcontentloaded" });

        // 애니메이션 완료 대기
        await waitForAnimations(page);

        // 전체 페이지 스크린샷
        const filename = `${pageInfo.name}-${viewport.name}.png`;
        await page.screenshot({
          path: path.join(outputDir, filename),
          fullPage: true,
        });

        console.log(`  Saved: ${filename}`);
        await page.close();
      }

      await context.close();
    }
  } finally {
    await browser.close();
    devServer.kill();
  }

  console.log("\n✅ Before screenshots captured!");
}

captureScreenshots().catch(console.error);
