const express = require ('express');
const db = require ('../../db.js');
const cors = require ('cors');

const app = express();

app.use(cors());

const router = express.Router();

router.post('/', (req, res) => {
  const { phone } = req.body;

  const checkQuery = `SELECT id, name FROM clientes WHERE phone = ?`;
  db.query(checkQuery, [phone], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Erro ao verificar número de telefone.' });
    } else {
      if (results.length > 0) {
        const id = results[0].id;
        const name = results[0].name;
        res.status(200).json({ exists: true, id, name });
      } else {
        res.status(200).json({ exists: false, id: null, name: '' });
      }
    }
  });
});

module.exports = router;