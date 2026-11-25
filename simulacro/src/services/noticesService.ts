import { randomUUID } from 'node:crypto';

export interface Notice {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface NoticeChanges {
  title?: string;
  description?: string;
}

const Notices: Notice[] = [
  {
    id: '11111111-1111-4111-8111-11111111114343233',
    title: 'Explosion',
    description: '',
    createdAt: '2026-09-01T08:00:00.000Z',
  },
  {
    id: '22222222-2222-4222-8222-222222222222',
    title: 'Normas de vida',
    description: '',
    createdAt: '2026-09-01T08:00:00.000Z',
  },
];

export function list(page: number, limit: number) {
  const start = (page - 1) * limit;

  return {
    data: Notices.slice(start, start + limit),
    pagination: {
      page,
      limit,
      total: Notices.length,
    },
  };
}

// Obtener documento por ID
export function getById(id: string): Notice | undefined {
  return Notices.find((notice) => notice.id === id);
}

// Crear documento
export function create(title: string, description: string): Notice {
  const notice: Notice = {
    id: randomUUID(),
    title,
    description,
    createdAt: new Date().toISOString(),
  };

  Notices.push(notice);

  return notice;
}

// Modificar documento
export function update(
  id: string,
  changes: NoticeChanges,
): Notice | undefined {
  const notice = getById(id);

  if (!notice) {
    return undefined;
  }

  if (changes.title !== undefined) {
    notice.title = changes.title;
  }

  if (changes.description !== undefined) {
    notice.description = changes.description;
  }

  return notice;
}