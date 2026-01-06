# Project Overview

## 프로젝트 정보
- **이름**: roomfit-landing (app-landing)
- **목적**: 피트니스/운동 앱(RoomFit/Wespion)의 랜딩 페이지
- **유형**: Next.js 정적 사이트 / 마케팅 랜딩 페이지

## 기술 스택
| 분류 | 기술 | 버전 |
|------|------|------|
| Framework | Next.js | 16.1.1 |
| UI Library | React | 18 |
| Language | TypeScript | 5 |
| Styling | Tailwind CSS | 3.4.3 |
| Animation | Framer Motion | 11.2.10 |
| Icons | Lucide React | 0.378.0 |

## 프로젝트 구조
```
src/
├── app/                    # Next.js App Router 페이지
│   ├── page.tsx           # 메인 랜딩 페이지
│   ├── business/          # 비즈니스(B2B) 페이지
│   ├── layout.tsx         # 루트 레이아웃
│   └── globals.css        # 글로벌 스타일
├── components/
│   ├── sections/          # 랜딩 페이지 섹션 컴포넌트
│   ├── business/          # 비즈니스 페이지 컴포넌트
│   ├── layout/            # Navbar, Footer
│   ├── demos/             # 데모/인터랙티브 컴포넌트
│   ├── animations/        # 애니메이션 컴포넌트
│   └── hooks/             # 커스텀 훅
└── data/                  # JSON 콘텐츠 데이터
    ├── content.json       # 메인 페이지 콘텐츠
    └── business-content.json # 비즈니스 페이지 콘텐츠
```

## 디자인 시스템
- **Primary Color**: #5252FF (보라색)
- **Secondary Color**: #BAFC27 (라임색)
- **Font**: Pretendard (한글 최적화)
- **다크모드**: 지원 (Tailwind dark: 클래스 사용)
