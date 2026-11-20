# Yunarang Developer Archive

Astro와 TypeScript로 만든 개인 포트폴리오, 개발 블로그, 프로젝트 위키입니다.
일본어를 기본 언어로 사용하며 한국어 콘텐츠를 같은 Markdown 문서에서 함께 관리합니다.

## Local development

프로젝트 폴더에서 최초 1회 의존성을 설치합니다. Node.js 24는 배포 환경과 같습니다.

```sh
npm ci
```

이후 로컬 미리보기가 필요할 때 서버를 실행합니다.

```sh
npm run dev
```

브라우저에서 [블로그 목록](http://localhost:4321/blog/)을 열고,
`src/content/posts/`의 Markdown 글을 수정해 저장한 다음 확인합니다.
새 글이나 수정한 글이 보이지 않으면 페이지를 새로고침하세요. 글의 `slug`는
개별 주소 `/posts/<slug>/`를 결정합니다. `draft: true`인 글은 로컬을 포함해
목록과 개별 페이지에서 제외됩니다. 로컬 미리보기는 GitHub Pages에 배포하지 않습니다.

서버 종료 및 상태 확인:

```sh
npx astro dev stop
npx astro dev status
```

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
- PDF 문서: `public/pdf/` (예: `public/pdf/portfolio.pdf` → `:::pdf /pdf/portfolio.pdf`)

새 포스트의 작성 형식과 한일 병기 규칙은
[`docs/bilingual-content.md`](docs/bilingual-content.md)를 참고합니다.

## Deployment

`main` 브랜치에 반영된 변경은 GitHub Actions가 정적 Astro 사이트로 빌드하여
GitHub Pages에 배포합니다. 빌드 결과물인 `dist/`는 저장소에 커밋하지 않습니다.

## Font

Astral Days Nocturne is based on Noto Serif CJK JP and is distributed under the SIL Open Font License 1.1.
This Font Software is licensed under the SIL Open Font License,
Version 1.1.

This license is copied below, and is also available with a FAQ at:
http://scripts.sil.org/OFL

-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font
creation efforts of academic and linguistic communities, and to
provide a free and open framework in which fonts may be shared and
improved in partnership with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded,
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply to
any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software
components as distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to,
deleting, or substituting -- in part or in whole -- any of the
components of the Original Version, by changing formats or by porting
the Font Software to a new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed,
modify, redistribute, and sell modified and unmodified copies of the
Font Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components, in
Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the
corresponding Copyright Holder. This restriction only applies to the
primary font name as presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created using
the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.
