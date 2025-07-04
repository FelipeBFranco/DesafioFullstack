import { User } from '@prisma/client';
import { UserRepository } from '../repositories/userRepository';
import { hash } from 'bcrypt';

interface CreateUserRequest {
  name: string;
  email: string;
  password_raw: string;
}

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create({
    name,
    email,
    password_raw,
  }: CreateUserRequest): Promise<User> {
    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new Error('Este e-mail já está em uso.');
    }

    const password_hash = await hash(password_raw, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: password_hash,
    });

    return user;
  }
}
