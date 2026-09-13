export interface ProjectCopy {
  title: string;
  summary: string;
}

export interface LocalizedProjectCopy {
  ja: ProjectCopy;
  ko: ProjectCopy;
}

/**
 * Single source of truth for title and summary copy in both site languages.
 * Project Markdown contains language-neutral metadata and its body only.
 */
export const projectCopy: Record<string, LocalizedProjectCopy> = {
  'astral-days': {
    ja: {
      title: 'アスデイ：Astral Days!',
      summary: 'この夜が明けても、輝くハルへ。',
    },
    ko: {
      title: '아스데이: Astral Days!',
      summary: '이 새벽이 끝나더라도,  빛나는 하루를 향해.',
    },
  },
  'project-vx': {
    ja: {
      title: 'Project VX',
      summary: '人の魂を込める。 AIの技術を加える。',
    },
    ko: {
      title: 'Project VX',
      summary: '사람의 혼을 담다. AI의 기술을 더하다.',
    },
  },
  'lumi': {
    ja: {
      title: 'LUMI',
      summary: 'モデルやランタイムを越えて、ひとつの知性と開発の流れをつなぐ。',
    },
    ko: {
      title: 'LUMI',
      summary: '모델과 런타임을 넘어, 하나의 지능과 개발 흐름을 이어가다.',
    },
  },
};

export function getProjectCopy(projectId: string): LocalizedProjectCopy {
  const copy = projectCopy[projectId];
  if (!copy) {
    throw new Error(`Missing localized project copy for "${projectId}" in src/i18n/projects.ts`);
  }
  return copy;
}
