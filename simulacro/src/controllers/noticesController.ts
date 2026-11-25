
import type { Request, Response, NextFunction } from 'express';
import * as noticesService from '../services/noticesService.js';
import { AppError } from '../errors/AppError.js';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError.js';

// Listar documentos
export function list(req: Request, res: Response, next: NextFunction): void {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 20);

    res.json(noticesService.list(page, limit));
  } catch (err) {
    next(err);
  }
}

// Obtener documento por ID
export function getById(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  try {
    const notice = noticesService.getById(String(req.params.noticeId));

    if (!notice) {
      throw new ResourceNotFoundError(
        404,
        `Notice with id '${req.params.noticeId}' not found`,
        'RESOURCE_NOT_FOUND',
        String(req.params.noticeId)
      );
    }

    res.json({ data: notice });
  } catch (err) {
    next(err);
  }
}

// Crear documento
export function create(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  try {
    const { title, description } = req.body;

    if (!title || typeof title !== 'string') {
      throw new AppError(400, 'Missing required field: title', 'BAD_REQUEST');
    }

    const notice = noticesService.create(
      title.trim(),
      typeof description === 'string' ? description.trim() : '',
    );

    res.status(201).json({ data: notice });
  } catch (err) {
    next(err);
  }
}

// Modificar documento
export function update(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  try {
    const { title, description } = req.body;

    if (title !== undefined) {
     if (typeof title !== 'string') {
      throw new AppError(400, 'Invalid title', 'BAD_REQUEST');
    }

    if (title.trim() === '') {
      throw new AppError(400, 'Invalid title', 'Title must be a non-empty string');
    }
  }

     
    if (description !== undefined && typeof description !== 'string') {
      throw new AppError(400, 'Invalid description', 'BAD_REQUEST');
    }

    const notice = noticesService.update(
      String(req.params.noticeId),
      {
        title: typeof title === 'string' ? title.trim() : undefined,
        description:
          typeof description === 'string' ? description.trim() : undefined,
      },
    );

    if (!notice) {
      throw new ResourceNotFoundError(
        404,
        `Notice with id '${req.params.noticeId}' not found`,
        'RESOURCE_NOT_FOUND',
        String(req.params.noticeId)
      );
    }

    res.json({ data: notice });
  } catch (err) {
    next(err);
  }
}
