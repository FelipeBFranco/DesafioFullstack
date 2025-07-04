"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ required_error: 'O nome é obrigatório.' })
            .min(3, 'O nome precisa ter no mínimo 3 caracteres.'),
        email: zod_1.z
            .string({ required_error: 'O e-mail é obrigatório.' })
            .email('Formato de e-mail inválido.'),
        password: zod_1.z
            .string({ required_error: 'A senha é obrigatória.' })
            .min(6, 'A senha precisa ter no mínimo 6 caracteres.'),
    }),
});
exports.loginUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: 'O e-mail é obrigatório.' })
            .email('Formato de e-mail inválido.'),
        password: zod_1.z
            .string({ required_error: 'A senha é obrigatória.' })
            .min(1, 'A senha é obrigatória.'),
    }),
});
