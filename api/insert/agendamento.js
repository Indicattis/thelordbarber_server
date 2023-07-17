const express = require ('express');
const db = require ('../../db.js');
const cors = require ('cors');

const app = express();

app.use(cors());

const router = express.Router();

router.post('/', (req, res) => {
    const { cliente, day, hour, product, value, barber, userId } = req.body;

    const sqlInsert = `INSERT INTO agendamentos (cliente, day, hour, product, value, id_barbeiro, id_cliente)
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const sqlUpdate = `UPDATE horarios
                       SET status = 0
                       WHERE day = ? AND hour = ? AND id_barbeiro = ?`;

    db.beginTransaction(err => {
        if (err) return res.json({ Message: "Error inside server" });

        db.query(sqlInsert, [cliente, day, hour, product, value, barber, userId], (err, result) => {
            if (err) {
                db.rollback(() => {
                    return res.json({ Message: "Error inside server 1" });
                });
            }

            db.query(sqlUpdate, [day, hour, barber], (err, result) => {
                if (err) {
                    db.rollback(() => {
                        return res.json({ Message: "Error inside server 2" });
                    });
                }

                db.commit(err => {
                    if (err) {
                        db.rollback(() => {
                            return res.json({ Message: "Error inside server 3" });
                        });
                    }

                    return res.json(result);
                });
            });
        });
    });
});


module.exports = router;
