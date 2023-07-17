const express = require ('express');
const db = require ('../../db.js');
const cors = require ('cors');

const app = express();

app.use(cors());

const router = express.Router();

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  // Consulta para excluir os horários relacionados ao barbeiro
  const deleteHorariosQuery = 'DELETE FROM horarios WHERE id_barbeiro = ?';

  // Consulta para excluir o barbeiro
  const deleteBarbeiroQuery = 'DELETE FROM barbeiros WHERE id = ?';

  db.beginTransaction((beginTransactionError) => {
    if (beginTransactionError) {
      res.status(500).json({ error: 'Erro ao iniciar a transação.' });
      return;
    }

    db.query(deleteHorariosQuery, [id], (deleteHorariosError) => {
      if (deleteHorariosError) {
        db.rollback(() => {
          res.status(500).json({ error: 'Erro ao excluir os horários do barbeiro.' });
        });
      } else {
        db.query(deleteBarbeiroQuery, [id], (deleteBarbeiroError) => {
          if (deleteBarbeiroError) {
            db.rollback(() => {
              res.status(500).json({ error: 'Erro ao deletar barbeiro.' });
            });
          } else {
            db.commit((commitError) => {
              if (commitError) {
                db.rollback(() => {
                  res.status(500).json({ error: 'Erro ao confirmar a transação.' });
                });
              } else {
                res.status(200).json({ message: 'Barbeiro deletado com sucesso.' });
              }
            });
          }
        });
      }
    });
  });
});

module.exports = router;
