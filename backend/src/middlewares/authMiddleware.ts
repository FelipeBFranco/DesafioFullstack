import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const { sub } = decoded as TokenPayload;

    req.userId = sub;

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido.' });
  }
}
