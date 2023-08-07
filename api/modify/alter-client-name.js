

const express = require ('express');
const db = require ('../../db.js');
const cors = require ('cors');

const app = express();
app.use(cors());
  


const router = express.Router();

router.put('/', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
  
    const sqlQuery = `
      UPDATE clientes
      SET name = ?
      WHERE id = ?
    `;
  
    db.query(sqlQuery, [name, id], (err, results) => {
      if (err) {
        console.error('Erro ao atualizar a senha:', err);
        return res.status(500).json({ message: 'Erro ao atualizar o nome' });
      }
  
      // Senha atualizada com sucesso
      return res.status(200).json({ message: 'Dados alterados com sucesso!' });
    });
  });


  module.exports = router;