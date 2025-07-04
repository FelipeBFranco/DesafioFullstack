import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthService } from '../../src/services/authService';
import { UserRepository } from '../../src/repositories/userRepository';
import { hash } from 'bcrypt';

vi.mock('../../src/repositories/userRepository');

describe('AuthService', () => {
  let authService: AuthService;
  let userRepositoryMock: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepositoryMock = new UserRepository() as jest.Mocked<UserRepository>;
    authService = new AuthService(userRepositoryMock);
    vi.clearAllMocks();
    process.env.JWT_SECRET = 'supersecret';
  });

  it('should authenticate user and return a token', async () => {
    const password = 'password123';
    const hashedPassword = await hash(password, 8);
    const user = {
      id: 'user-id',
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
    };

    userRepositoryMock.findByEmail = vi.fn().mockResolvedValue(user);

    const result = await authService.authenticate({
      email: user.email,
      password_raw: password,
    });

    expect(result.token).toBeDefined();
    expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(user.email);
  });

  it('should throw an error for invalid credentials (user not found)', async () => {
    userRepositoryMock.findByEmail = vi.fn().mockResolvedValue(null);

    await expect(
      authService.authenticate({
        email: 'wrong@example.com',
        password_raw: 'password123',
      })
    ).rejects.toThrow('Credenciais inválidas.');
  });

  it('should throw an error for invalid credentials (wrong password)', async () => {
    const password = 'password123';
    const hashedPassword = await hash(password, 8);
    const user = {
      id: 'user-id',
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
    };

    userRepositoryMock.findByEmail = vi.fn().mockResolvedValue(user);

    await expect(
      authService.authenticate({
        email: user.email,
        password_raw: 'wrongpassword',
      })
    ).rejects.toThrow('Credenciais inválidas.');
  });
});