# Master Documents (현재 콘텐츠)

> **용도**: 기획 → 콘텐츠 → 구현 워크플로우를 위한 통합 마스터 문서
> **상태**: Active (현재 사용 중)

## 구조

```
master/
├── _template.md          # 섹션 템플릿 (복사용)
├── _shared.md            # 공통 요소 (Nav, Footer, 브랜드)
├── main-landing.md       # 메인 페이지 (하드웨어) - 9개 섹션
├── app-landing.md        # 앱 페이지 (개인 사용자) - 8개 섹션
└── business-landing.md   # B2B 페이지 (PT샵/헬스장) - 10개 섹션
```

## 마스터 문서 형식 (All-in-One)

각 섹션은 4가지를 통합 관리:

1. **기획** - 목적, 전환 목표, 핵심 메시지
2. **콘텐츠** - 실제 카피, 문구
3. **이미지** - 파일 경로, alt 텍스트
4. **구현** - TSX 컴포넌트, JSON 키 매핑

## 워크플로우

```
마스터 문서 수정 → JSON 반영 → 컴포넌트 확인 → 빌드 테스트
```

## 관련 파일

- JSON 데이터: `src/data/main-content.json`, `app-content.json`, `business-content.json`
- 컴포넌트: `src/components/main/`, `app/`, `business/`
- 이미지: `public/roomfit/`
