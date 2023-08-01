const express = require('express');
const db = require('../../db.js');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const router = express.Router();

router.post('/', (req, res) => {
    const { phone, password } = req.body;

    const query = `SELECT id, name, phone, image FROM clientes WHERE phone = ? AND senha = ?`;
    db.query(query, [phone, password], (error, results) => {
        if (error) {
            console.error("Erro ao consultar o banco de dados:", error);
            res.status(500).json({ error: "Erro interno do servidor" });
        } else {
            if (results.length > 0) {
                const { id, name, phone, image } = results[0];
                const token = jwt.sign({ id, name, phone, image }, "secret_key");
                res.json({ authenticated: true, token, id, phone, name, image });
            } else {
                res.json({ authenticated: false });
            }
        }
    });
});

module.exports = router;