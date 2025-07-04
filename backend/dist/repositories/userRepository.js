"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const prisma_1 = require("../lib/prisma");
class UserRepository {
    async findByEmail(email) {
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    }
    async create(data) {
        const user = await prisma_1.prisma.user.create({
            data,
        });
        return user;
    }
    async findById(id) {
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                id,
            },
        });
        return user;
    }
}
exports.UserRepository = UserRepository;
