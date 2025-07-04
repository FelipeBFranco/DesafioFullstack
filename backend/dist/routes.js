"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const userController_1 = require("./controllers/userController");
const authController_1 = require("./controllers/authController");
const validateRequest_1 = require("./middlewares/validateRequest");
const authMiddleware_1 = require("./middlewares/authMiddleware");
const userSchemas_1 = require("./schemas/userSchemas");
const router = (0, express_1.Router)();
exports.router = router;
const userController = new userController_1.UserController();
const authController = new authController_1.AuthController();
router.post('/register', (0, validateRequest_1.validate)(userSchemas_1.createUserSchema), async (req, res) => {
    await userController.create(req, res);
});
router.post('/login', (0, validateRequest_1.validate)(userSchemas_1.loginUserSchema), async (req, res) => {
    await authController.authenticate(req, res);
});
router.get('/profile', authMiddleware_1.authMiddleware, async (req, res) => {
    await userController.getProfile(req, res);
});
