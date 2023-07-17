const express = require ('express');
const db = require ('../../db.js');
const cors = require ('cors');

const app = express();

app.use(cors());

const router = express.Router();

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { name, phone, recurrence, recurrence_day, recurrence_hour, recurrence_mode } = req.body;

    const sqlUpdate = `UPDATE clientes
                       SET name = ?, phone = ?, recurrence = ?, recurrence_day = ?, recurrence_hour = ?, recurrence_mode = ?
                       WHERE id = ?`;

    db.query(sqlUpdate, [name, phone, recurrence, recurrence_day, recurrence_hour, recurrence_mode, id], (err, result) => {
        if (err) {
            console.error("Erro ao atualizar o barbeiro:", err);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }

        return res.json({ message: "Cliente atualizado com sucesso" });
    });
});

module.exports = router;