# Yunarang Developer Archive

Astro와 TypeScript로 만든 개인 포트폴리오, 개발 블로그, 프로젝트 위키입니다.
일본어를 기본 언어로 사용하며 한국어 콘텐츠를 같은 Markdown 문서에서 함께 관리합니다.

## Local development

```sh
npm install
npm run dev
```

기본 개발 서버는 `http://localhost:4321/`에서 열립니다.

```sh
npm run check
npm run build
npm run preview
```

## Content

- 포스트: `src/content/posts/`
- 프로젝트 소개: `src/content/projects/`
- 프로젝트 위키: `src/content/wiki/`
- 일반 페이지 데이터: `src/content/pages/`
- 포스트 미디어: `public/images/posts/YYYY-MM-DD/`
- 프로젝트 이미지: `public/images/projects/`

새 포스트의 작성 형식과 한일 병기 규칙은
[`docs/bilingual-content.md`](docs/bilingual-content.md)를 참고합니다.

## Deployment

`main` 브랜치에 반영된 변경은 GitHub Actions가 정적 Astro 사이트로 빌드하여
GitHub Pages에 배포합니다. 빌드 결과물인 `dist/`는 저장소에 커밋하지 않습니다.
