import express from 'express';
import db from '../../db.js';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
    }));

const router = express.Router();

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { nome, idade, cargo, senha, login } = req.body;

    const sqlUpdate = `UPDATE barbeiros
                       SET login = ?, nome = ?, idade = ?, cargo = ?, senha = ?
                       WHERE id = ?`;

    db.query(sqlUpdate, [login, nome, idade, cargo, senha, id], (err, result) => {
        if (err) {
            console.error("Erro ao atualizar o barbeiro:", err);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }

        return res.json({ message: "Barbeiro atualizado com sucesso" });
    });
});

export default router;
