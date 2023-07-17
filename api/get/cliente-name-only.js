const express = require ('express');
const db = require ('../../db.js');
const cors = require ('cors');

const app = express();

app.use(cors());

const router = express.Router();

router.post('/', (req, res) => {
    const { cliente } = req.query;
  
    const checkQuery = 'SELECT name FROM clientes WHERE phone = ?';
    db.query(checkQuery, [cliente], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Erro ao verificar número de telefone.' });
      } else {
        if (results.length > 0) {
          const name = results[0].name;
          res.status(200).json({ name });
        } else {
          res.status(200).json({ name: '-' });
        }
      }
    });
  });

module.exports = router;