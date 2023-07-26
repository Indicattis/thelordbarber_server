const express = require ('express');
const db = require ('../../db.js');
const cors = require ('cors');

const app = express();

app.use(express.json());
app.use(cors());

const router = express.Router();

router.post('/', (req, res) => {
    const { phone, username, password } = req.body;
    
    const insertQuery = `INSERT INTO clientes (phone, name, senha) VALUES ('${phone}', '${username}', '${password}')`;
    db.query(insertQuery, (error) => {
        if (error) {
        res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
        } else {
        res.status(200).json({ message: 'Usuário cadastrado com sucesso.' });
        }
    });
    });

module.exports = router;