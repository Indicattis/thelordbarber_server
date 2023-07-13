

import express from 'express';
import db from '../../db.js';
import cors from 'cors';

const app = express();
app.use(cors({
origin: 'http://localhost:3000'
}));
  


const router = express.Router();

router.put('/', (req, res) => {
    const barberId = req.body.barber_id;
    const password = req.body.password;
  
    const sqlQuery = `
      UPDATE barbeiros
      SET senha = ?
      WHERE id = ?
    `;
  
    if (!barberId || !password) {
      return res.status(400).json({ message: 'Parâmetros inválidos' });
    }
  
    db.query(sqlQuery, [password, barberId], (err, results) => {
      if (err) {
        console.error('Erro ao atualizar a senha:', err);
        return res.status(500).json({ message: 'Erro ao atualizar a senha' });
      }
  
      // Senha atualizada com sucesso
      return res.status(200).json({ message: 'Senha alterada com sucesso' });
    });
  });


export default router;
