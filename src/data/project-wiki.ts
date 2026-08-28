export const wikiCopy = {
  indexEyebrow: {
    ja: 'PROJECT WIKI',
    ko: 'PROJECT WIKI',
  },
  indexLead: {
    ja: '物語、世界、システム。制作中のプロジェクトにある言葉と設計を、項目ごとに辿るためのノートです。',
    ko: '스토리, 세계관, 시스템. 제작 중인 프로젝트의 언어와 설계를 항목별로 따라갈 수 있도록 정리한 노트입니다.',
  },
  backToProject: {
    ja: 'プロジェクトへ戻る',
    ko: '프로젝트로 돌아가기',
  },
  library: {
    ja: 'WIKI LIBRARY',
    ko: 'WIKI LIBRARY',
  },
  libraryLead: {
    ja: '公開済みの設定と、これから育てていく制作ノート。',
    ko: '공개된 설정과 앞으로 채워갈 제작 노트입니다.',
  },
  navigation: {
    ja: 'WIKI CONTENTS',
    ko: 'WIKI CONTENTS',
  },
  projectHome: {
    ja: 'PROJECT HOME',
    ko: 'PROJECT HOME',
  },
  readEntry: {
    ja: '項目を読む',
    ko: '항목 읽기',
  },
  noEntries: {
    ja: 'このプロジェクトのWikiは準備中です。',
    ko: '이 프로젝트의 위키는 준비 중입니다.',
  },
} as const;

export const wikiCategoryLabel = {
  story: 'STORY',
  world: 'WORLD',
  characters: 'CHARACTERS',
  systems: 'SYSTEMS',
  development: 'DEVELOPMENT',
  reference: 'REFERENCE',
} as const;

export type WikiCategory = keyof typeof wikiCategoryLabel;
