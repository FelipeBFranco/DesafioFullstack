import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { router } from './routes.js';

const app = express();
const PORT = process.env.PORT || 3333;

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:80',
      'http://localhost',
      'http://franco.seshatrpg.com.br',
      'https://franco.seshatrpg.com.br',
      'http://franco.seshatrpg.com.br:80',
      'https://franco.seshatrpg.com.br:443',
      ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []), // Permite configurar via variável de ambiente
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
