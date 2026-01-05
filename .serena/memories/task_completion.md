# Task Completion Checklist

작업 완료 시 다음 사항을 확인하세요:

## 필수 확인
1. **린트 검사**
   ```bash
   npm run lint
   ```
   - ESLint 에러 없이 통과해야 함

2. **빌드 검증**
   ```bash
   npm run build
   ```
   - TypeScript 에러 없이 빌드되어야 함

3. **로컬 테스트**
   ```bash
   npm run dev
   ```
   - 브라우저에서 변경사항 확인
   - 반응형 디자인 확인 (모바일/태블릿/데스크톱)
   - 다크모드 확인

## 권장 확인
- [ ] 콘솔 에러 없음
- [ ] 접근성 (a11y) 문제 없음
- [ ] 이미지 최적화 (Next.js Image 컴포넌트 사용)
- [ ] 불필요한 console.log 제거

## 커밋 전
```bash
git status
git diff
```
- 변경사항이 의도한 대로인지 확인
