import 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface TokenPayload extends JwtPayload {
  sub: string;
  userId: string;
}

declare global {
  namespace Express {
    export interface Request {
      userId?: string;
    }
  }
}
