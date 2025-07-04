import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken'; // Importa o objeto padrão
import { UserRepository } from '../repositories/userRepository.js';

interface AuthRequest {
  email: string;
  password_raw: string;
}

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async authenticate({ email, password_raw }: AuthRequest) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Credenciais inválidas.');
    }

    const isPasswordCorrect = await compare(password_raw, user.password);
    if (!isPasswordCorrect) {
      throw new Error('Credenciais inválidas.');
    }

    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        subject: user.id,
        expiresIn: '1d',
      }
    );

    return { token, user };
  }
}
