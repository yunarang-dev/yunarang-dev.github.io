export interface PostRedirect {
  slug: string;
  title: string;
  date: string;
  redirectTo: string;
}

/**
 * Published post URLs whose content now lives on another canonical page.
 * Keep these entries so previously shared links continue to resolve.
 */
export const postRedirects: PostRedirect[] = [
  {
    slug: 'AD-00',
    title: '[AD] 00. The Project 『アスデイ：Astral Days!』',
    date: '2026-01-14 00:55:49 +0900',
    redirectTo: '/projects/astral-days/',
  },
  {
    slug: 'VX-00',
    title: '[VX] 00. 『Project VX』　起動！',
    date: '2026-08-18 23:11:08 +0900',
    redirectTo: '/projects/project-vx/',
  },
  {
    slug: 'KR-01',
    title: '[AD-01] 01. 평범했던 어느 날, 내게 꿈이 생겨났다.',
    date: '2026-02-06 00:10:26 +0900',
    redirectTo: '/posts/AD-01/',
  },
  {
    slug: 'KR-02',
    title: '[AD-00] 02. The Project 『아스데이: Astral Days!』',
    date: '2026-03-06 16:39:49 +0900',
    redirectTo: '/projects/astral-days/',
  },
];
