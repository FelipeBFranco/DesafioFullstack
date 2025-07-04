import { Router } from 'express';
import { UserController } from './controllers/userController.js';
import { AuthController } from './controllers/authController.js';
import { validate } from './middlewares/validateRequest.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import { createUserSchema, loginUserSchema } from './schemas/userSchemas.js';

const router = Router();

const userController = new UserController();
const authController = new AuthController();

router.post('/register', validate(createUserSchema), (req, res) =>
  userController.create(req, res)
);
router.post('/login', validate(loginUserSchema), (req, res) =>
  authController.authenticate(req, res)
);

router.get('/profile', authMiddleware, (req, res) =>
  userController.getProfile(req, res)
);

export { router };
