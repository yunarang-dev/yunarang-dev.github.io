export const wikiCategoryLabel = {
  story: 'STORY',
  world: 'WORLD',
  characters: 'CHARACTERS',
  systems: 'SYSTEMS',
  development: 'DEVELOPMENT',
  reference: 'REFERENCE',
} as const;

export type WikiCategory = keyof typeof wikiCategoryLabel;
