const express = require ('express');
const db = require ('../../db.js');
const cors = require ('cors');

const app = express();

app.use(cors());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

function calcularProximaData(recurrence_day, recurrence_hour, recurrence_mode) {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    const nextMonthYear = nextMonth.getFullYear();
    const nextMonthMonth = nextMonth.getMonth();

    const daysOfWeek = [null, 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];

    const recurrenceDayIndex = daysOfWeek.indexOf(recurrence_day);

    const nextDates = [];
    const startTime = new Date(`1970-01-01T${recurrence_hour}`);

    if (recurrence_mode === 'semanal') {
        // Define o primeiro dia de agendamento baseado na diferença entre o dia de recorrência e o dia atual
        const firstDay = today.getDate() + (recurrenceDayIndex - today.getDay());
        const firstDate = new Date(today.getFullYear(), today.getMonth(), firstDay, startTime.getHours(), startTime.getMinutes(), 0);

        // Verifica se a primeira data é menor ou igual ao último dia do mês seguinte
        while (firstDate <= new Date(nextMonthYear, nextMonthMonth + 1, 0)) {
            nextDates.push(firstDate);
            firstDate.setDate(firstDate.getDate() + 7);
        }
    } else if (recurrence_mode === 'quinzenal') {
        // Define o primeiro dia de agendamento baseado na diferença entre o dia de recorrência e o dia atual
        const firstDayOfMonth = new Date(nextMonthYear, nextMonthMonth, 1);
        let firstDay = firstDayOfMonth.getDate() + (recurrenceDayIndex - firstDayOfMonth.getDay());
        if (firstDay <= 0) {
            firstDay += 14;
        }
        const firstDate = new Date(nextMonthYear, nextMonthMonth, firstDay, startTime.getHours(), startTime.getMinutes(), 0);

        // Verifica se a primeira data é menor ou igual ao último dia do mês seguinte
        while (firstDate <= new Date(nextMonthYear, nextMonthMonth + 1, 0)) {
            nextDates.push(firstDate);
            firstDay += 14;
            firstDate.setDate(firstDay);
        }
    }

    return nextDates;
}






const router = express.Router();

router.post('/', (req, res) => {
    const id_client = req.body.cliente;
    const query = `SELECT * FROM clientes WHERE recurrence = 1 AND id = ${id_client}`;

    db.query(query, (error, results) => {
        if (error) {
            console.error('Erro ao obter os clientes com recurrence = 1:', error);
            return;
        }

        const clients = results;

        clients.forEach((client) => {
            const {
                id,
                phone,
                recurrence_day,
                recurrence_hour,
                recurrence_mode
            } = client;

            const nextDates = calcularProximaData(recurrence_day, recurrence_hour, recurrence_mode);

            nextDates.forEach((date) => {
                const formattedDate = date.toISOString().split('T')[0];
                const formattedTime = date.toTimeString().split(' ')[0];

                const checkDuplicateQuery = `SELECT * FROM agendamentos WHERE day = ? AND hour = ?`;
                const checkDuplicateValues = [formattedDate, formattedTime];

                db.query(checkDuplicateQuery, checkDuplicateValues, (duplicateError, duplicateResults) => {
                    if (duplicateError) {
                        console.error('Erro ao verificar duplicidade de agendamentos:', duplicateError);
                        return;
                    }

                    if (duplicateResults.length === 0) {
                        const agendamentoQuery = `INSERT INTO agendamentos (cliente, day, hour, product, value, id_barbeiro, id_cliente) VALUES (?, ?, ?, ?, ?, ?, ?)`;
                        const agendamentoValues = [
                            phone,
                            formattedDate,
                            formattedTime,
                            'Mensalista', 
                            '32.5', 
                            '1', // Adicione aqui o ID do barbeiro
                            id
                        ];

                        db.query(agendamentoQuery, agendamentoValues, (agendamentoError, agendamentoResult) => {
                            if (agendamentoError) {
                                console.error('Erro ao inserir agendamento automático:', agendamentoError);
                            } else {
                                console.log('Agendamento criado:', agendamentoValues);
                            }
                        });
                    }
                });
            });
        });
    });
})


module.exports = router;