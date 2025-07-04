"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const authService_1 = require("../services/authService");
const userRepository_1 = require("../repositories/userRepository");
class AuthController {
    async authenticate(req, res) {
        try {
            const { email, password } = req.body;
            const userRepository = new userRepository_1.UserRepository();
            const authService = new authService_1.AuthService(userRepository);
            const { token, user } = await authService.authenticate({
                email,
                password_raw: password,
            });
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000,
                path: '/',
            });
            res.status(200).json(user);
        }
        catch {
            res.status(401).json({ message: 'Credenciais inválidas.' });
        }
    }
}
exports.AuthController = AuthController;
