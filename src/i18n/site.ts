import type { ImageMetadata } from "astro";

interface ProjectHeroImage {
  fileName: string;
  image: ImageMetadata;
  imageAlt: string;
}

const projectHeroFiles = import.meta.glob<ImageMetadata>(
  "../assets/projects/*.{png,jpg,jpeg,webp,avif}",
  { eager: true, import: "default" },
);

const projectHero = (fileName: string, imageAlt: string): ProjectHeroImage => {
  const image = projectHeroFiles[`../assets/projects/${fileName}`];

  if (!image) {
    throw new Error(
      `[projectHeroImages] src/assets/projects/${fileName} 파일을 찾을 수 없습니다. ` +
      "site.ts의 fileName과 실제 파일명을 확인해 주세요.",
    );
  }

  return { fileName, image, imageAlt };
};

/**
 * 프로젝트 대표 이미지는 여기에서 한 번에 교체합니다.
 *
 * 1. 새 이미지를 `src/assets/projects/`에 추가합니다.
 * 2. 아래 projectHero의 첫 번째 값을 새 파일명으로 변경합니다.
 * 3. 이미지 내용이 달라지면 두 번째 값인 imageAlt도 함께 수정합니다.
 *
 * 이 설정은 Home 첫 화면의 대형 슬라이드와 프로젝트 상세 페이지에
 * 동시에 적용됩니다. 설정이 없는 프로젝트는 Markdown의 heroImage를
 * 자동으로 사용합니다.
 */
export const projectHeroImages = {
  "astral-days": projectHero(
    "astral-days-dawn.png",
    "夜明け前の海辺の駅で、二人の人物が同じ地平線を見つめている風景",
  ),
  "project-vx": projectHero(
    "project-vx-workflow.png",
    "開発者がコード、レベル設計、レビュー工程を重ねながらゲーム世界を構築しているスタジオ",
  ),
} satisfies Record<string, ProjectHeroImage>;

export const supportedLocales = ["ja", "ko"] as const;

export type SiteLocale = (typeof supportedLocales)[number];

export const defaultLocale: SiteLocale = "ja";
export const localeStorageKey = "yunarang:locale";

export const messages = {
  ja: {
    "site.wordmark": "YUNARANG",
    "site.name": "Yunarang Development Archive",
    "site.title-template": "{title} — Yunarang",
    "site.home-aria": "Yunarang home",
    "site.meta.default-title": "Yunarang — Game Developer & Personal Archive",
    "site.meta.default-description": "Unity、AI、ナラティブゲーム開発の過程と試行錯誤を記録する、個人開発アーカイブ。",
    "site.meta.default-image-alt": "Yunarang development archive",
    "site.rss-title": "Yunarang Development Archive RSS",
    "skip-link": "本文へ移動",
    "nav.label": "メインナビゲーション",
    "nav.mobile-label": "メニュー",
    "nav.home": "Home",
    "nav.blog": "Blog",
    "nav.projects": "Projects",
    "nav.wiki": "Wiki",
    "nav.archive": "Archive",
    "nav.about": "About",
    "locale.switch": "表示言語を変更",
    "locale.next": "한국어",
    "footer.tagline": "夜明けの薄明かりの中を進みながら、一行のコードがあなたの心に残りますように。",
    "footer.copyright": "© 2026 Yunarang. Built as a personal development archive.",
    "common.tags": "Tags",
    "project.open": "プロジェクトを見る",
    "home.meta.title": "Yunarang — Game Developer & Development Archive",
    "home.meta.description": "ゲーム、物語、AIを用いた開発の過程を記録する、ゆならんの個人ポートフォリオ兼開発アーカイブ。",
    "blog.eyebrow": "DEVELOPMENT ARCHIVE",
    "blog.title": "私の足跡が、誰かの道しるべに なりますように。",
    "blog.description": "ゲーム企画、設計、開発、学び。今まで過ごした全ての道を記録しています。",
    "blog.order": "LATEST → OLDEST",
    "blog.count": "RECORDS",
    "blog.filter.label": "FILTER BY CATEGORY",
    "blog.filter.controls": "カテゴリー選択",
    "blog.details": "Blog details",
    "blog.filter.all": "ALL",
    "blog.latest": "LATEST ENTRY",
    "blog.records": "ALL RECORDS",
    "blog.read": "記録を読む",
    "blog.empty": "このカテゴリーの記事はまだありません。",
    "blog.meta.title": "Blog — Yunarang",
    "blog.meta.description": "ゲーム開発、設計、実装、学びの過程を積み重ねていく個人開発アーカイブ。",
    "post.back": "Blog に戻る",
    "post.toc": "CONTENTS",
    "post.navigation": "記事ナビゲーション",
    "post.newer": "NEWER RECORD",
    "post.older": "OLDER RECORD",
    "post.related": "RELATED RECORDS",
    "post.related.copy": "同じプロジェクト、または近いテーマの記録です。",
    "post.meta.fallback-description": "ゲーム、物語、AIを用いた開発の過程を記録する個人開発アーカイブ。",
    "post.redirect.project": "このプロジェクト文書は専用プロジェクトページへ移動しました。",
    "post.redirect.post": "この記事は別のページへ移動しました。",
    "archive.eyebrow": "ARCHIVE TIMELINE",
    "archive.title": "記録がつなぐ、記憶の足跡",
    "archive.description": "これまで連なってきた記憶、その記憶を遡っていく。",
    "archive.order": "LATEST → OLDEST",
    "archive.count": "RECORDS",
    "archive.timeline.label": "投稿の時系列アーカイブ",
    "archive.details": "Archive details",
    "archive.latest": "LATEST RECORD",
    "archive.open": "記事を読む",
    "archive.meta.title": "Archive Timeline — Yunarang",
    "archive.meta.description": "現在から最初の記録まで、制作と開発の足跡を時系列で辿るアーカイブ。",
    "projects.eyebrow": "LONG TERM PROJECTS",
    "projects.title": "夢を形にする。",
    "projects.description": "想像を形に。夢を広げていく。",
    "projects.list": "Projects",
    "projects.meta.title": "Projects — Yunarang",
    "projects.meta.description": "ゲーム、物語、AI開発環境を通して、作ることを探究する進行中のプロジェクト。",
    "wiki.meta.title": "Project Wiki — Yunarang",
    "wiki.title-suffix": "Wiki",
    "wiki.project.meta-title": "{title} Wiki — Yunarang",
    "wiki.article.meta-title": "{article} — {project} Wiki",
    "wiki.notes-title": "{shortTitle} / Notes",
    "wiki.project-entries-label": "{title} wiki entries",
    "wiki.index.eyebrow": "PROJECT WIKI",
    "wiki.index.title": "新しい世界、その世界のルール。",
    "wiki.index.lead": "ストーリー、キャラクター、そして世界観をまとめた設定ノートです。",
    "wiki.library.eyebrow": "WIKI LIBRARY",
    "wiki.library.title": "Project / Libraries",
    "wiki.library.lead": "公開済みの設定と、これから育てていく制作ノート。",
    "wiki.back-to-project": "プロジェクトへ戻る",
    "wiki.navigation": "WIKI CONTENTS",
    "wiki.project-home": "PROJECT HOME",
    "wiki.read-entry": "項目を読む",
    "wiki.empty": "このプロジェクトのWikiは準備中です。",
    "wiki.entries": "ENTRIES",
    "project-page.status.active": "IN DEVELOPMENT",
    "project-page.role": "Genre",
    "project-page.tools": "TOOLS",
    "project-page.brief": "PROJECT BRIEF",
    "project-page.focus": "DESIGN PILLARS",
    "project-page.focus-title": "{shortTitle} / Focus",
    "project-page.records": "DEVELOPMENT LOGS",
    "project-page.records-title": "{shortTitle} / Records",
    "project-page.records.copy": "このプロジェクトに紐づく開発記録を、新しい順に表示しています。",
    "project-page.records.empty": "開発記録は準備中です。",
    "project-page.board.open": "GitHub Projects を開く",
    "project-page.wiki.open": "PROJECT WIKI",
    "common.read-title": "{title} を読む",
    "home.slider.label": "メインプロジェクト",
    "home.slider.roledescription": "カルーセル",
    "home.slider.selector": "プロジェクトを選択",
    "home.slider.show": "{title}を表示",
    "home.slider.shown": "{title}を表示しました",
    "home.depth.aria": "ページ深度",
    "home.depth.surface": "Surface",
    "home.depth.projects": "Projects",
    "home.depth.records": "Records",
    "home.depth.signals": "Signals",
    "home.depth.connection": "Connection",
    "home.projects.title": "Main Projects",
    "home.projects.role": "Genre",
    "home.projects.tools": "Tools",
    "home.projects.open": "プロジェクトページへ",
    "home.logs.title": "Recent Development Logs",
    "home.logs.description": "実装や設計、試行錯誤の過程を残した直近の開発記録。",
    "home.logs.all": "すべての開発記録を見る",
    "home.posts.title": "Recent Blog Posts",
    "home.posts.description": "開発の外側にある考察や、制作を支える小さな記録。",
    "home.posts.all": "ブログ一覧へ",
    "home.github.title": "GitHub Activity",
    "home.github.description": "公開リポジトリに残る、挑戦の足跡です。",
    "home.github.profile": "GitHub プロフィールへ",
    "home.github.board.eyebrow": "PROJECT BOARD",
    "home.github.board.title": "Astral Days! Development",
    "home.github.board.description": "『アスデイ』の公開開発ボード。進行中の制作は GitHub Projects で管理しています。",
    "home.github.board.open": "開発ボードを見る",
    "home.github.board.status": "PUBLIC BOARD",
    "home.github.event.repository": "repository",
    "home.github.event.push": "{branch}へpush",
    "home.github.event.pr.closed": "Pull Requestを更新",
    "home.github.event.pr.open": "Pull Requestを作成",
    "home.github.event.issue.closed": "Issueを完了",
    "home.github.event.issue.open": "Issueを更新",
    "home.github.event.create": "新しいブランチまたはリポジトリを作成",
    "home.github.event.release": "Releaseを公開",
    "home.contact.eyebrow": "Connection",
    "home.contact.title": "いつでも、あなたとつながれるように。",
    "home.contact.description": "ゲーム開発、技術、ポートフォリオに関するご連絡は、メールからどうぞ。",
    "home.contact.github": "GitHub",
    "home.contact.x": "X / Twitter",
    "home.contact.email": "Email",
    "not-found.eyebrow": "SIGNAL LOST",
    "not-found.title": "この星は、まだ記録されていません。",
    "not-found.description": "座標を見失いました。Home、Blog、Wikiから記録へ戻れます。",
    "not-found.navigation": "記録へ戻る",
    "not-found.meta.title": "Signal Lost — Yunarang",
  },
  ko: {
    "site.wordmark": "YUNARANG",
    "site.name": "Yunarang Development Archive",
    "site.title-template": "{title} — Yunarang",
    "site.home-aria": "Yunarang 홈",
    "site.meta.default-title": "Yunarang — 게임 개발자 & 개인 아카이브",
    "site.meta.default-description": "Unity, AI, 내러티브 게임 개발 과정과 시행착오를 기록하는 개인 개발 아카이브입니다.",
    "site.meta.default-image-alt": "Yunarang 개발 아카이브",
    "site.rss-title": "Yunarang 개발 아카이브 RSS",
    "skip-link": "본문으로 이동",
    "nav.label": "주요 탐색",
    "nav.mobile-label": "메뉴",
    "nav.home": "Home",
    "nav.blog": "Blog",
    "nav.projects": "Projects",
    "nav.wiki": "Wiki",
    "nav.archive": "Archive",
    "nav.about": "About",
    "locale.switch": "표시 언어 변경",
    "locale.next": "日本語",
    "footer.tagline": "동트기 전 새벽을 나아가며, 한 줄의 코드가 당신의 마음에 남도록.",
    "footer.copyright": "© 2026 Yunarang. 개인 개발 아카이브로 제작되었습니다.",
    "common.tags": "태그",
    "project.open": "프로젝트 보기",
    "home.meta.title": "Yunarang — 게임 개발자 & 개발 아카이브",
    "home.meta.description": "게임, 이야기, AI를 활용한 개발 과정을 기록하는 유나랑의 개인 포트폴리오 겸 개발 아카이브입니다.",
    "blog.eyebrow": "DEVELOPMENT ARCHIVE",
    "blog.title": "나의 발자취가, 누군가의 길이 되기를.",
    "blog.description": "지금까지 지나온 모든 발자취를 남깁니다.",
    "blog.order": "LATEST → OLDEST",
    "blog.count": "RECORDS",
    "blog.filter.label": "FILTER BY CATEGORY",
    "blog.filter.controls": "카테고리 선택",
    "blog.details": "블로그 정보",
    "blog.filter.all": "ALL",
    "blog.latest": "LATEST ENTRY",
    "blog.records": "ALL RECORDS",
    "blog.read": "기록 읽기",
    "blog.empty": "이 카테고리에는 아직 글이 없습니다.",
    "blog.meta.title": "블로그 — Yunarang",
    "blog.meta.description": "게임 개발, 설계, 구현, 배움의 과정을 차곡차곡 쌓아 가는 개인 개발 아카이브입니다.",
    "post.back": "Blog로 돌아가기",
    "post.toc": "CONTENTS",
    "post.navigation": "글 탐색",
    "post.newer": "NEWER RECORD",
    "post.older": "OLDER RECORD",
    "post.related": "RELATED RECORDS",
    "post.related.copy": "같은 프로젝트 또는 가까운 주제의 기록입니다.",
    "post.meta.fallback-description": "게임, 이야기, AI를 활용한 개발 과정을 기록하는 개인 개발 아카이브입니다.",
    "post.redirect.project": "이 프로젝트 문서는 전용 프로젝트 페이지로 이동했습니다.",
    "post.redirect.post": "이 게시물은 다른 페이지로 이동했습니다.",
    "archive.eyebrow": "ARCHIVE TIMELINE",
    "archive.title": "기록으로 이어진, 기억의 발자취",
    "archive.description": "지금까지 이어져 온 기억, 그 기억을 거슬러 오르다.",
    "archive.order": "LATEST → OLDEST",
    "archive.count": "RECORDS",
    "archive.timeline.label": "게시글 시간순 아카이브",
    "archive.details": "아카이브 정보",
    "archive.latest": "LATEST RECORD",
    "archive.open": "글 읽기",
    "archive.meta.title": "아카이브 타임라인 — Yunarang",
    "archive.meta.description": "현재에서 첫 기록까지, 제작과 개발의 흔적을 시간 순서대로 따라가는 아카이브입니다.",
    "projects.eyebrow": "LONG TERM PROJECTS",
    "projects.title": "꿈을 일구다.",
    "projects.description": "상상을 실현하다. 꿈을 펼쳐나가다.",
    "projects.list": "프로젝트 목록",
    "projects.meta.title": "프로젝트 — Yunarang",
    "projects.meta.description": "게임, 이야기, AI 개발 환경을 통해 만드는 일을 탐구하는 진행 중인 프로젝트입니다.",
    "wiki.meta.title": "프로젝트 위키 — Yunarang",
    "wiki.title-suffix": "Wiki",
    "wiki.project.meta-title": "{title} 위키 — Yunarang",
    "wiki.article.meta-title": "{article} — {project} 위키",
    "wiki.notes-title": "{shortTitle} / Notes",
    "wiki.project-entries-label": "{title} 위키 항목",
    "wiki.index.eyebrow": "PROJECT WIKI",
    "wiki.index.title": "새로운 세계, 그 세계의 규칙.",
    "wiki.index.lead": "스토리, 인물, 그리고 세계관을 정리한 설정 노트입니다.",
    "wiki.library.eyebrow": "WIKI LIBRARY",
    "wiki.library.title": "Project / Libraries",
    "wiki.library.lead": "공개된 설정과 앞으로 채워갈 제작 노트입니다.",
    "wiki.back-to-project": "프로젝트로 돌아가기",
    "wiki.navigation": "WIKI CONTENTS",
    "wiki.project-home": "PROJECT HOME",
    "wiki.read-entry": "항목 읽기",
    "wiki.empty": "이 프로젝트의 위키는 준비 중입니다.",
    "wiki.entries": "ENTRIES",
    "project-page.status.active": "IN DEVELOPMENT",
    "project-page.role": "GENRE",
    "project-page.tools": "TOOLS",
    "project-page.brief": "PROJECT BRIEF",
    "project-page.focus": "DESIGN PILLARS",
    "project-page.focus-title": "{shortTitle} / Focus",
    "project-page.records": "DEVELOPMENT LOGS",
    "project-page.records-title": "{shortTitle} / Records",
    "project-page.records.copy": "이 프로젝트와 연결된 개발 기록을 최신순으로 표시합니다.",
    "project-page.records.empty": "개발 기록을 준비하고 있습니다.",
    "project-page.board.open": "GitHub Projects 열기",
    "project-page.wiki.open": "PROJECT WIKI",
    "common.read-title": "{title} 읽기",
    "home.slider.label": "주요 프로젝트",
    "home.slider.roledescription": "캐러셀",
    "home.slider.selector": "프로젝트 선택",
    "home.slider.show": "{title} 표시",
    "home.slider.shown": "{title}을(를) 표시했습니다",
    "home.depth.aria": "페이지 깊이",
    "home.depth.surface": "Surface",
    "home.depth.projects": "Projects",
    "home.depth.records": "Records",
    "home.depth.signals": "Signals",
    "home.depth.connection": "Connection",
    "home.projects.title": "Main Projects",
    "home.projects.role": "Genre",
    "home.projects.tools": "Tools",
    "home.projects.open": "프로젝트 페이지로",
    "home.logs.title": "Recent Development Logs",
    "home.logs.description": "구현, 설계, 시행착오를 남긴 최신 개발 기록입니다.",
    "home.logs.all": "모든 개발 기록 보기",
    "home.posts.title": "Recent Blog Posts",
    "home.posts.description": "개발 바깥의 생각과 제작을 뒷받침하는 작은 기록입니다.",
    "home.posts.all": "블로그 목록으로",
    "home.github.title": "GitHub Activity",
    "home.github.description": "공개 레포지토리에 남은, 도전의 발자취입니다.",
    "home.github.profile": "GitHub 프로필로",
    "home.github.board.eyebrow": "PROJECT BOARD",
    "home.github.board.title": "Astral Days! Development",
    "home.github.board.description": "『아스데이』의 공개 개발 보드입니다. 진행 중인 제작 관리는 GitHub Projects에 기록합니다.",
    "home.github.board.open": "개발 보드 보기",
    "home.github.board.status": "PUBLIC BOARD",
    "home.github.event.repository": "repository",
    "home.github.event.push": "{branch}에 push",
    "home.github.event.pr.closed": "Pull Request 업데이트",
    "home.github.event.pr.open": "Pull Request 생성",
    "home.github.event.issue.closed": "Issue 완료",
    "home.github.event.issue.open": "Issue 업데이트",
    "home.github.event.create": "새 브랜치 또는 저장소 생성",
    "home.github.event.release": "Release 공개",
    "home.contact.eyebrow": "Connection",
    "home.contact.title": "언제든, 당신과 닿을 수 있도록.",
    "home.contact.description": "게임 개발, 기술, 포트폴리오에 관한 연락은 이메일로 보내 주세요.",
    "home.contact.github": "GitHub",
    "home.contact.x": "X / Twitter",
    "home.contact.email": "Email",
    "not-found.eyebrow": "SIGNAL LOST",
    "not-found.title": "이 별은 아직 기록되지 않았습니다.",
    "not-found.description": "좌표를 잃었습니다. Home, Blog, Wiki에서 기록으로 돌아갈 수 있습니다.",
    "not-found.navigation": "기록으로 돌아가기",
    "not-found.meta.title": "길을 잃은 별 — Yunarang",
  },
} as const;

export type MessageKey = keyof (typeof messages)[typeof defaultLocale];

export function getMessagePair(key: MessageKey) {
  return {
    ja: messages.ja[key],
    ko: messages.ko[key],
  };
}

export function formatMessagePair(key: MessageKey, values: Record<string, string | number>) {
  const format = (template: string) => Object.entries(values).reduce(
    (result, [name, value]) => result.replaceAll(`{${name}}`, String(value)),
    template,
  );

  return {
    ja: format(messages.ja[key]),
    ko: format(messages.ko[key]),
  };
}

/**
 * Page-level editable copy. All actual strings remain in the message tables
 * above; this structure gives Astro pages a discoverable, typed entry point
 * without duplicating content in individual page files.
 */
export const pageCopy = {
  site: {
    wordmark: getMessagePair("site.wordmark"),
    name: getMessagePair("site.name"),
    homeAria: getMessagePair("site.home-aria"),
    defaultTitle: getMessagePair("site.meta.default-title"),
    defaultDescription: getMessagePair("site.meta.default-description"),
    defaultImageAlt: getMessagePair("site.meta.default-image-alt"),
    rssTitle: getMessagePair("site.rss-title"),
  },
  home: {
    metaTitle: getMessagePair("home.meta.title"),
    metaDescription: getMessagePair("home.meta.description"),
    depthAria: getMessagePair("home.depth.aria"),
    depth: {
      surface: getMessagePair("home.depth.surface"),
      projects: getMessagePair("home.depth.projects"),
      records: getMessagePair("home.depth.records"),
      signals: getMessagePair("home.depth.signals"),
      connection: getMessagePair("home.depth.connection"),
    },
  },
  blog: {
    metaTitle: getMessagePair("blog.meta.title"),
    metaDescription: getMessagePair("blog.meta.description"),
  },
  archive: {
    metaTitle: getMessagePair("archive.meta.title"),
    metaDescription: getMessagePair("archive.meta.description"),
  },
  projects: {
    metaTitle: getMessagePair("projects.meta.title"),
    metaDescription: getMessagePair("projects.meta.description"),
  },
  post: {
    fallbackDescription: getMessagePair("post.meta.fallback-description"),
    redirectProject: getMessagePair("post.redirect.project"),
    redirectPost: getMessagePair("post.redirect.post"),
  },
  notFound: {
    metaTitle: getMessagePair("not-found.meta.title"),
    title: getMessagePair("not-found.title"),
    description: getMessagePair("not-found.description"),
    navigation: getMessagePair("not-found.navigation"),
  },
} as const;

export const githubActivityCopy = {
  push: (branch: string) => formatMessagePair("home.github.event.push", { branch }),
  pullRequest: (closed: boolean, number: number | string) => {
    const action = getMessagePair(closed ? "home.github.event.pr.closed" : "home.github.event.pr.open");
    return { ja: `${action.ja} #${number}`, ko: `${action.ko} #${number}` };
  },
  issue: (closed: boolean, number: number | string) => {
    const action = getMessagePair(closed ? "home.github.event.issue.closed" : "home.github.event.issue.open");
    return { ja: `${action.ja} #${number}`, ko: `${action.ko} #${number}` };
  },
  create: getMessagePair("home.github.event.create"),
  release: getMessagePair("home.github.event.release"),
  repository: getMessagePair("home.github.event.repository"),
} as const;

export const wikiCopy = {
  metaTitle: getMessagePair("wiki.meta.title"),
  titleSuffix: getMessagePair("wiki.title-suffix"),
  indexEyebrow: getMessagePair("wiki.index.eyebrow"),
  indexTitle: getMessagePair("wiki.index.title"),
  indexLead: getMessagePair("wiki.index.lead"),
  library: getMessagePair("wiki.library.eyebrow"),
  libraryTitle: getMessagePair("wiki.library.title"),
  libraryLead: getMessagePair("wiki.library.lead"),
  backToProject: getMessagePair("wiki.back-to-project"),
  navigation: getMessagePair("wiki.navigation"),
  projectHome: getMessagePair("wiki.project-home"),
  readEntry: getMessagePair("wiki.read-entry"),
  noEntries: getMessagePair("wiki.empty"),
} as const;

export function isSiteLocale(value: unknown): value is SiteLocale {
  return typeof value === "string" && (supportedLocales as readonly string[]).includes(value);
}
