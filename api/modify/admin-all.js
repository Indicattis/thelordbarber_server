const express = require ('express');
const db = require ('../../db.js');
const cors = require ('cors');

const app = express();

app.use(cors());

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

module.exports = router;
