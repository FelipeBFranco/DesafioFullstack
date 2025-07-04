import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import { router } from '../../src/routes';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UserRepository } from '../../src/repositories/userRepository';

vi.mock('../../src/repositories/userRepository');

const app = express();
app.use(express.json());
app.use('/api', router);

describe('User and Auth Routes', () => {

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  beforeAll(() => {
    process.env.JWT_SECRET = 'test-secret';
  });

  describe('POST /api/register', () => {
    it('should create a user and return 201', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      vi.spyOn(UserRepository.prototype, 'findByEmail').mockResolvedValue(null);
      vi.spyOn(UserRepository.prototype, 'create').mockResolvedValue({
        id: 'user-id-123',
        name: userData.name,
        email: userData.email,
        password: 'hashed-password'
      });
      
      const res = await request(app).post('/api/register').send(userData);
      
      expect(res.status).toBe(201);
      expect(res.body.email).toBe(userData.email);
    });

    it('should return 409 if email already exists', async () => {
        const userData = {
            name: 'Existing User',
            email: 'existing@example.com',
            password: 'password123',
        };
    
        vi.spyOn(UserRepository.prototype, 'findByEmail').mockResolvedValue({
          id: 'existing-id',
          ...userData,
          password: 'hashed-password'
        });

        const res = await request(app).post('/api/register').send(userData);

        expect(res.status).toBe(409);
      });
  });

  describe('POST /api/login', () => {
    it('should login a user and return a token', async () => {
        const password = 'password123';
        const hashedPassword = await hash(password, 8);
        const user = {
          id: 'login-user-id',
          name: 'Login User',
          email: 'login@example.com',
          password: hashedPassword,
        };

        vi.spyOn(UserRepository.prototype, 'findByEmail').mockResolvedValue(user);

        const res = await request(app).post('/api/login').send({
            email: user.email,
            password: password
        });

        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
    });
  });

  describe('GET /api/profile', () => {
    it('should return user profile with a valid token', async () => {
        const user = {
            id: 'profile-user-id',
            name: 'Profile User',
            email: 'profile@example.com',
            password: 'hashed-password',
        };
        
        const token = sign({}, process.env.JWT_SECRET!, { subject: user.id });

        vi.spyOn(UserRepository.prototype, 'findById').mockResolvedValue(user);

        const res = await request(app)
            .get('/api/profile')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.id).toBe(user.id);
    });
  });
});