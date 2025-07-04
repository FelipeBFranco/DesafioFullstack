import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { router } from './routes.js';

const app = express();
const PORT = 3333;

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:80',
      'http://localhost',
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
