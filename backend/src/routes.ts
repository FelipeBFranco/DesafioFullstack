import { Router } from 'express';
import { UserController } from './controllers/userController';
import { AuthController } from './controllers/authController';
import { validate } from './middlewares/validateRequest';
import { authMiddleware } from './middlewares/authMiddleware';
import { createUserSchema, loginUserSchema } from './schemas/userSchemas';

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

export { router };
