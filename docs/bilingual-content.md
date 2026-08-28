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
