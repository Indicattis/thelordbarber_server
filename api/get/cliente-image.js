const express = require ('express');
const db = require ('../../db.js');
const cors = require ('cors');

const app = express();

app.use(cors());

const router = express.Router();

router.post('/', (req, res) => {
    const { id } = req.body;
  
    const checkQuery = `SELECT image FROM clientes WHERE id = ?`;
    db.query(checkQuery, [id], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Erro ao verificar a imagem do usuário.' });
      } else {
        if (results.length > 0) {
          const image = results[0].image;
          res.status(200).json({ exists: true, image });
        } else {
          res.status(200).json({ exists: false, image: 0 });
        }
      }
    });
  });
  

module.exports = router;
