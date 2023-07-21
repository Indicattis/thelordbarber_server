

const express = require ('express');
const db = require ('../../db.js');
const jwt  = require ("jsonwebtoken");
const cors = require ('cors');

const app = express();
app.use(express.json());
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
  
  


const router = express.Router();

router.post('/', (req, res) => {
    const { login, password } = req.body;

    const query = `SELECT id, cargo, nome, imagem FROM barbeiros WHERE login = ? AND senha = ?`;
    db.query(query, [login, password], (error, results) => {
        if (error) {
            console.error("Erro ao consultar o banco de dados:", error);
            res.status(500).json({ error: "Erro interno do servidor" });
        } else {
            if (results.length > 0) {
                const { id, cargo, nome, imagem } = results[0];
                const token = jwt.sign({ id, cargo, nome, imagem }, "secret_key");
                res.json({ authenticated: true, token, login, id, nome, imagem });
            } else {
                res.json({ authenticated: false });
            }
        }
    });
});

module.exports = router;
