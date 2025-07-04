"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = require("bcrypt");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create({ name, email, password_raw, }) {
        const userWithSameEmail = await this.userRepository.findByEmail(email);
        if (userWithSameEmail) {
            throw new Error('Este e-mail já está em uso.');
        }
        const password_hash = await (0, bcrypt_1.hash)(password_raw, 8);
        const user = await this.userRepository.create({
            name,
            email,
            password: password_hash,
        });
        return user;
    }
}
exports.UserService = UserService;
