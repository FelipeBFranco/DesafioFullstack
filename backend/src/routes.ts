import { Router } from 'express';
import { UserController } from './controllers/userController.js';
import { AuthController } from './controllers/authController.js';
import { validate } from './middlewares/validateRequest.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import { createUserSchema, loginUserSchema } from './schemas/userSchemas.js';

const router = Router();

const userController = new UserController();
const authController = new AuthController();

router.post('/register', validate(createUserSchema), async (req, res) => {
  await userController.create(req, res);
});
router.post('/login', validate(loginUserSchema), async (req, res) => {
  await authController.authenticate(req, res);
});

router.get('/profile', authMiddleware, async (req, res) => {
  await userController.getProfile(req, res);
});

router.get('/me', authMiddleware, async (req, res) => {
  await userController.getProfile(req, res);
});

export { router };
