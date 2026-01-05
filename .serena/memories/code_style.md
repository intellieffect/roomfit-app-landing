# Code Style & Conventions

## TypeScript
- **Strict 모드** 활성화
- 경로 별칭: `@/*` → `./src/*`
- 타입 정의는 별도 `types.ts` 파일 또는 인라인

## React/Next.js
- **App Router** 사용 (pages 디렉토리 아님)
- 클라이언트 컴포넌트: 파일 상단에 `"use client"` 디렉티브
- 컴포넌트: `export default function ComponentName()` 형식
- 데이터는 JSON 파일에서 import하여 사용

## 스타일링
- **Tailwind CSS** 유틸리티 클래스 사용
- 커스텀 CSS는 `globals.css`에서 정의
- 반응형: `sm:`, `md:`, `lg:` 프리픽스
- 다크모드: `dark:` 프리픽스

## 컴포넌트 구조
```tsx
"use client";

import { ... } from "...";
import { content } from "@/data";

export default function ComponentName() {
  // hooks
  // handlers
  
  return (
    <section className="...">
      {/* JSX */}
    </section>
  );
}
```

## 네이밍 컨벤션
- 컴포넌트: PascalCase (`Hero.tsx`, `PhoneMockup.tsx`)
- 훅: camelCase with `use` prefix (`useScrollAnimation.ts`)
- 데이터 파일: kebab-case (`content.json`, `business-content.json`)

## 아이콘
- `lucide-react` 라이브러리 사용
- 예: `import { ChevronDown, Download } from "lucide-react"`

## 애니메이션
- `framer-motion` 라이브러리 사용
- Tailwind 커스텀 애니메이션: `animate-fade-up`, `animate-float`
