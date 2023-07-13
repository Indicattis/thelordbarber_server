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
    const selectQuery = 'SELECT day, hour, id_barbeiro FROM agendamentos WHERE id = ?';
    const deleteQuery = 'DELETE FROM agendamentos WHERE id = ?';
    const updateQuery = 'UPDATE horarios SET status = 1 WHERE day = ? AND hour = ? AND id_barbeiro = ?';
    
    db.query(selectQuery, [id], (selectError, selectResult) => {
        if (selectError) {
            res.status(500).json({ error: 'Erro ao obter dados do agendamento.' });
        } else {
            if (selectResult.length > 0) {
                const { day, hour, id_barbeiro } = selectResult[0]; // Obtenha o dia e a hora do agendamento
                
                db.query(deleteQuery, [id], (deleteError) => {
                    if (deleteError) {
                        res.status(500).json({ error: 'Erro ao deletar agendamento.' });
                    } else {
                        db.query(updateQuery, [day, hour, id_barbeiro], (updateError) => {
                            if (updateError) {
                                res.status(500).json({ error: 'Erro ao atualizar status na tabela Horarios.' });
                            } else {
                                res.status(200).json({ message: 'Agendamento deletado com sucesso.' });
                            }
                        });
                    }
                });
            } else {
                res.status(404).json({ error: 'Agendamento não encontrado.' });
            }
        }
    });
});


export default router;
