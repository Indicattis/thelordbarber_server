import express from 'express';
import db from '../../db.js';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

const router = express.Router();

router.post('/:id', (req, res) => {
  const id = req.params.id;

  // Consulta para excluir os agendamentos relacionados ao cliente
  const deleteAgendamentosQuery = 'DELETE FROM agendamentos WHERE id_cliente = ?';

  // Consulta para excluir o cliente
  const deleteClienteQuery = 'DELETE FROM clientes WHERE id = ?';

  db.beginTransaction((beginTransactionError) => {
    if (beginTransactionError) {
      res.status(500).json({ error: 'Erro ao iniciar a transação.' });
      return;
    }

    db.query(deleteAgendamentosQuery, [id], (deleteAgendamentosError) => {
      if (deleteAgendamentosError) {
        db.rollback(() => {
          res.status(500).json({ error: 'Erro ao excluir os agendamentos do cliente.' });
        });
      } else {
        db.query(deleteClienteQuery, [id], (deleteClienteError) => {
          if (deleteClienteError) {
            db.rollback(() => {
              res.status(500).json({ error: 'Erro ao deletar cliente.' });
            });
          } else {
            db.commit((commitError) => {
              if (commitError) {
                db.rollback(() => {
                  res.status(500).json({ error: 'Erro ao confirmar a transação.' });
                });
              } else {
                res.status(200).json({ message: 'Cliente deletado com sucesso.' });
              }
            });
          }
        });
      }
    });
  });
});

export default router;
