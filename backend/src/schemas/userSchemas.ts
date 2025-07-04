import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'O nome é obrigatório.' })
      .min(3, 'O nome precisa ter no mínimo 3 caracteres.'),
    email: z
      .string({ required_error: 'O e-mail é obrigatório.' })
      .email('Formato de e-mail inválido.'),
    password: z
      .string({ required_error: 'A senha é obrigatória.' })
      .min(6, 'A senha precisa ter no mínimo 6 caracteres.'),
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'O e-mail é obrigatório.' })
      .email('Formato de e-mail inválido.'),
    password: z
      .string({ required_error: 'A senha é obrigatória.' })
      .min(1, 'A senha é obrigatória.'),
  }),
});
