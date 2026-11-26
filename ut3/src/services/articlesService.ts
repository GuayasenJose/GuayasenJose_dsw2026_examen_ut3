// Services layer: business logic and data. Plain TypeScript — it never
// imports Express nor touches req/res/next, so it can be tested without HTTP.

import { randomUUID } from 'node:crypto';

export interface Article {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface ArticleChanges {
  title?: string;
  description?: string;
}

// The in-memory array now lives here, not in the routes.
const articles: Article[] = [
  {
    id: '11111111-1111-4111-8111-111111111111',
    title: 'Guía pública del centro',
    description: 'Sin descripcion',
    createdAt: '2026-09-01T08:00:00.000Z',
  },
  {
    id: '22222222-2222-4222-8222-222222222222',
    title: 'Normas de convivencia',
    description: 'hola buenas',
    createdAt: '2026-09-01T08:00:00.000Z',
  },
];

export function list(page: number, limit: number, sinDescripcion: number) {
  const start = (page - 1) * limit ;
  const filteredDocuments = articles.filter( 
      (article) => article.description === 'Sin descripcion', 
    ); 
  return {
    data: articles.slice( page, start + limit,  ),
    pagination: { page, limit, total: articles.length, sinDescripcion: filteredDocuments },
  };
}

export function getById(id: string): Article | undefined {
  return articles.find((article) => article.id === id);
}

export function create(title: string, description: string): Article {
  const article: Article = {
    id: randomUUID(),
    title,
    description,
    createdAt: new Date().toISOString(),
  };
  articles.push(article);
  return article;
}

export function update(id: string, changes: ArticleChanges): Article | undefined {
  const article = getById(id);
  if (!article) {
    return undefined;
  }
  if (changes.title !== undefined) {
    article.title = changes.title;
  }
  if (changes.description !== undefined) {
    article.description = changes.description;
  }
  return article;
}
