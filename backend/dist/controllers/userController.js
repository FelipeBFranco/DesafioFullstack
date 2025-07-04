"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../services/userService");
const userRepository_1 = require("../repositories/userRepository");
class UserController {
    async create(req, res) {
        try {
            const { name, email, password: userPassword } = req.body;
            const userRepository = new userRepository_1.UserRepository();
            const userService = new userService_1.UserService(userRepository);
            const user = await userService.create({
                name,
                email,
                password_raw: userPassword,
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: _password, ...userWithoutPassword } = user;
            res.status(201).json(userWithoutPassword);
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('e-mail já está em uso')) {
                    res.status(409).json({ message: error.message });
                    return;
                }
            }
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
    async getProfile(req, res) {
        try {
            const userRepository = new userRepository_1.UserRepository();
            if (!req.userId) {
                res.status(401).json({ message: 'Token inválido.' });
                return;
            }
            const user = await userRepository.findById(req.userId);
            if (!user) {
                res.status(404).json({ message: 'Usuário não encontrado.' });
                return;
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: _userPassword, ...userWithoutPassword } = user;
            res.status(200).json(userWithoutPassword);
        }
        catch {
            res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }
}
exports.UserController = UserController;
