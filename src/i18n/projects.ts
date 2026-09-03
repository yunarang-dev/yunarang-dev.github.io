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
      summary: 'Virtual Developer Transformation――その可能性を試す。',
    },
    ko: {
      title: 'Project VX',
      summary: 'Virtual Developer Transformation―― 그 가능성을 시험하다.',
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
