"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Importa o objeto padrão
class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async authenticate({ email, password_raw }) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Credenciais inválidas.');
        }
        const isPasswordCorrect = await (0, bcrypt_1.compare)(password_raw, user.password);
        if (!isPasswordCorrect) {
            throw new Error('Credenciais inválidas.');
        }
        const token = jsonwebtoken_1.default.sign({
            name: user.name,
            email: user.email,
            sub: user.id,
        }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        return { token, user };
    }
}
exports.AuthService = AuthService;
