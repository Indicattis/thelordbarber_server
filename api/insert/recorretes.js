const express = require ('express');
const db = require ('../../db.js');
const cors = require ('cors');

const app = express();

app.use(express.json());
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

function calcularProximaData(recurrence_day, recurrence_hour, recurrence_mode) {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    const nextMonthYear = nextMonth.getFullYear();
    const nextMonthMonth = nextMonth.getMonth();

    const daysOfWeek = [null, 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab']; // Correção nos índices

    const recurrenceDayIndex = daysOfWeek.indexOf(recurrence_day);

    const nextDates = [];
    const startTime = new Date(`1970-01-01T${recurrence_hour}`);

    if (recurrence_mode === 'semanal') {
        // Percorre todos os dias do mês seguinte e adiciona o dia de recorrência
        for (let day = 1; day <= new Date(nextMonthYear, nextMonthMonth + 1, 0).getDate(); day++) {
            const nextDate = new Date(nextMonthYear, nextMonthMonth, day, startTime.getHours(), startTime.getMinutes(), 0);
            if (nextDate.getDay() === recurrenceDayIndex) {
                nextDates.push(nextDate);
            }
        }
    } else if (recurrence_mode === 'quinzenal') {
        // Encontra a primeira data agendada
        const firstDayOfMonth = new Date(nextMonthYear, nextMonthMonth, 1);
        let firstDay = firstDayOfMonth.getDate();
        const firstWeekday = firstDayOfMonth.getDay();
        if (firstWeekday <= recurrenceDayIndex) {
            firstDay += recurrenceDayIndex - firstWeekday;
        } else {
            firstDay += 7 - (firstWeekday - recurrenceDayIndex);
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