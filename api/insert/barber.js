import express from 'express';
import db from '../../db.js';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
    }));

const router = express.Router();

router.post('/', (req, res) => {
    
    const insertQuery = `INSERT INTO barbeiros (login, nome, senha, cargo) VALUES ('novo', 'Novo', '123', 'Atendente')`;
    db.query(insertQuery, (error) => {
        if (error) {
        res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
        } else {
        res.status(200).json({ message: 'Usuário cadastrado com sucesso.' });
        }
    });
});


export default router;
