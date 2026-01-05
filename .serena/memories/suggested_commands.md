# Suggested Commands

## 개발 명령어

### 프로젝트 실행
```bash
# 개발 서버 시작 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start
```

### 코드 품질
```bash
# ESLint 실행
npm run lint
```

## 시스템 유틸 명령어 (macOS/Darwin)

### 파일 탐색
```bash
# 디렉토리 목록
ls -la

# 파일 찾기
find . -name "*.tsx" -type f

# 파일 내용 검색
grep -r "pattern" src/
```

### Git
```bash
# 상태 확인
git status

# 커밋
git add . && git commit -m "message"

# 푸시
git push origin main
```

## 자주 사용하는 경로
- 메인 페이지: `src/app/page.tsx`
- 비즈니스 페이지: `src/app/business/page.tsx`
- 섹션 컴포넌트: `src/components/sections/`
- 콘텐츠 데이터: `src/data/content.json`
