import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { UserRepository } from '../repositories/userRepository';

export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;

      const userRepository = new UserRepository();
      const userService = new UserService(userRepository);

      const user = await userService.create({
        name,
        email,
        password_raw: password,
      });

      const { password: _, ...userWithoutPassword } = user;

      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('e-mail já está em uso')) {
          return res.status(409).json({ message: error.message });
        }
      }
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const userRepository = new UserRepository();
      const user = await userRepository.findById(req.userId);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      const { password: _, ...userWithoutPassword } = user;

      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }
}
