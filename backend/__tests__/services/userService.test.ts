import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UserService } from '../../src/services/userService';
import { UserRepository } from '../../src/repositories/userRepository';
import { hash } from 'bcrypt';

vi.mock('../../src/repositories/userRepository');

describe('UserService', () => {
  let userService: UserService;
  let userRepositoryMock: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepositoryMock = new UserRepository() as jest.Mocked<UserRepository>;
    userService = new UserService(userRepositoryMock);
    vi.clearAllMocks(); 
  });

  it('should create a new user successfully', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password_raw: 'password123',
    };

    const hashedPassword = await hash(userData.password_raw, 8);

    userRepositoryMock.findByEmail = vi.fn().mockResolvedValue(null);
    userRepositoryMock.create = vi.fn().mockResolvedValue({
      id: 'some-uuid',
      ...userData,
      password: hashedPassword,
    });

    const user = await userService.create(userData);

    expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(userRepositoryMock.create).toHaveBeenCalled();
    expect(user.email).toBe(userData.email);
    expect(user.id).toBeDefined();
  });

  it('should throw an error if email is already in use', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password_raw: 'password123',
    };

    userRepositoryMock.findByEmail = vi.fn().mockResolvedValue({
      id: 'some-uuid',
      ...userData,
      password: 'hashedPassword',
    });

    await expect(userService.create(userData)).rejects.toThrow(
      'Este e-mail já está em uso.'
    );
  });
});