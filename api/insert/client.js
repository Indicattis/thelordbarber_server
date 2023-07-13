import express from 'express';
import db from '../../db.js';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
    }));

const router = express.Router();

router.post('/', (req, res) => {
    const { phone, username } = req.body;
    
    const insertQuery = `INSERT INTO clientes (phone, name) VALUES ('${phone}', '${username}')`;
    db.query(insertQuery, (error) => {
        if (error) {
        res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
        } else {
        res.status(200).json({ message: 'Usuário cadastrado com sucesso.' });
        }
    });
    });

export default router;