import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../custom.js';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).json({ message: 'Token não fornecido.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const { sub } = decoded as TokenPayload;

    req.userId = sub;

    next();
  } catch {
    res.status(401).json({ message: 'Token inválido.' });
  }
}
