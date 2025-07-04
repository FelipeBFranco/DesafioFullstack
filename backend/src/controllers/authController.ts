import { Request, Response } from 'express';
import { AuthService } from '../services/authService.js';
import { UserRepository } from '../repositories/userRepository.js';

export class AuthController {
  async authenticate(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const userRepository = new UserRepository();
      const authService = new AuthService(userRepository);

      const { token, user } = await authService.authenticate({
        email,
        password_raw: password,
      });

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
      });

      res.status(200).json(user);
    } catch {
      res.status(401).json({ message: 'Credenciais inválidas.' });
    }
  }
}
