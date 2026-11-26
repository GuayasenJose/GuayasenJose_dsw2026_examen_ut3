import type { Request, Response } from 'express';
import { env } from '../config/env.js';

export function notFound(req: Request, res: Response): void {
  const isDepuration = env.DEPURACION;
  if(isDepuration === "1"){
    console.log('[notFound]', req.requestId, req.method, req.path);
  }

  res.status(404).json({
    error: 'NOT_FOUND',
    message: `Route not found: ${req.method} ${req.path}`,
  });
}
