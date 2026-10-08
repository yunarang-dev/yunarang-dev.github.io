# Bilingual content authoring

The site keeps Japanese and Korean in **one source document**. The language
switcher changes the visible copy without changing the URL.

## About

Edit [`src/content/pages/about.md`](../src/content/pages/about.md). Every
displayed string is kept as a `ja` / `ko` pair in that one file.

```yaml
title:
  ja: "About — Yunarang"
  ko: "About — Yunarang"
```

Use standard ruby markup inside either value when needed.

```yaml
motto:
  ja: "<ruby>明日ノ日<rt>アスデイ</rt></ruby>に会いに行く。"
  ko: "빛나는 하루를 향해."
```

## Posts

Create one Markdown file in `src/content/posts/`. Its file name is only for
organization; `slug` controls the published URL so an existing shared
link can keep working.

```markdown
---
title:
  ja: "Project VX 開発記録 #18"
  ko: "Project VX 개발 기록 #18"
date: 2026-08-27
description:
  ja: "短い紹介文。"
  ko: "짧은 소개문입니다."
category:
  ja: "Project VX"
  ko: "Project VX"
tags:
  - ja: "Unity"
    ko: "Unity"
  - ja: "ゲーム開発"
    ko: "게임 개발"
slug: "VX-11"
---

:::locale ja

## 日本語本文

通常の Markdown をそのまま使えます。**強調**、リンク、画像、表、
コードブロック、脚注、`<ruby>漢字<rt>かんじ</rt></ruby>`も使えます。

:::

:::locale ko

## 한국어 본문

일반 Markdown을 그대로 사용합니다. **강조**, 링크, 이미지, 표, 코드 블록,
각주, `<ruby>漢字<rt>かんじ</rt></ruby>`도 사용할 수 있습니다.

:::
```

Rules for the locale markers:

- Write `:::locale ja` and `:::locale ko` at the left edge of the line.
- Keep one blank line before and after each marker.
- Close every language block with `:::`.
- Do not nest locale blocks.
- Keep both language blocks in the same order for every post: Japanese first,
  Korean second.

The `slug` is the stable public identifier. Keep it unchanged after publishing
so links that have already been shared continue to work.

Store post images in `public/images/posts/YYYY-MM-DD/` and reference them from
Markdown with an absolute site path such as `/images/posts/2026-08-28/1.png`.

## Embedded PDF

PDF files can be read inside a post without MDX or additional JavaScript.
Save the file at `public/pdf/example.pdf`, then use its public URL,
**without** the `public` prefix:

```markdown
:::pdf /pdf/example.pdf

:::pdf /pdf/example.pdf "企画書"

:::pdf "/pdf/my portfolio.pdf" "포트폴리오"
```

Keep each directive on its own line with blank lines before and after it.
The optional title is enclosed in double quotes. A quoted URL supports spaces
in file names. HTTP(S) URLs ending in `.pdf` also work, provided the remote
server permits embedding; hosting the file in `public/` is recommended.

Local PDF paths are automatically normalized to Unicode NFC, including
percent-encoded paths. This prevents decomposed Korean/Japanese file names
copied on macOS from producing mismatched URLs on GitHub Pages. External
HTTP(S) paths are left unchanged.

Put a directive inside each `:::locale` block if the document or its title
differs by language. The viewer follows the existing language switcher.
Do not add a closing `:::` for a PDF directive; that marker only closes a
language block.

The native PDF viewer depends on the visitor's browser. Some mobile browsers
may show only a preview or not display it inline. The always-visible `PDF ↗`
link opens the original file in a new tab as a fallback. Files placed in
`public/` are public downloads, not private attachments.
