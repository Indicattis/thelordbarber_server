

const express = require ('express');
const db = require ('../../db.js');
const cors = require ('cors');

const app = express();
app.use(cors());
  


const router = express.Router();

router.put('/', (req, res) => {
    const id = req.body.id;
    const password = req.body.password;
  
    const sqlQuery = `
      UPDATE clientes
      SET senha = ?
      WHERE id = ?
    `;
  
    db.query(sqlQuery, [password, id], (err, results) => {
      if (err) {
        console.error('Erro ao atualizar a senha:', err);
        return res.status(500).json({ message: 'Erro ao atualizar a senha' });
      }
  
      // Senha atualizada com sucesso
      return res.status(200).json({ message: 'Dados alterados com sucesso!' });
    });
  });


  module.exports = router;