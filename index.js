// index.js
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const db = require ('./db.js');
const { inserirHorarios } = require('./rotina.js');
const inserirAgendamentosAutomaticos = require ('./recurrence.js');

const app = express();
app.use(express.json());
app.use(cors());

const port = 9001

app.get('/', (req, res) =>{
    return res.json(`THELORDBARBER_SERVER is on port:${port}`);
});


// ###################################### CRON MODULE #################################################

 
cron.schedule('0 0 15 * *', () => {
    db.query('SELECT id FROM barbeiros', (error, results) => {
        if (error) {
            console.error('Erro ao obter os IDs dos barbeiros:', error);
            return;
        }
        
        const idBarbeiros = results.map((row) => row.id);
        inserirHorarios(idBarbeiros);
    });
});

cron.schedule('0 0 15 * *', () => {
    inserirAgendamentosAutomaticos();
    res.send('Rotina de agendamentos acionada com sucesso!');
})


// ####################################### ROTEAMENTO ##################################################

// # CLIENTES
const clientesRouter = require ('./api/clientes.js');
const getClientDetails = require ('./api/get/cliente.js');
const getClientName = require ('./api/get/cliente-name.js');
const getClientNameOnly = require ('./api/get/cliente-name-only.js');
const getClientPhone = require ('./api/get/cliente-number.js');
const getClientImage = require ('./api/get/cliente-image.js');
const clientLogin = require ('./api/auth/client-login.js');
const clientSetAll = require ('./api/modify/client-all.js');
const insertClient = require ('./api/insert/client.js');
const deleteCliente = require ('./api/delete/cliente.js');
const AlterClientName = require('./api/modify/alter-client-name.js');
const AlterClientPass = require('./api/modify/alter-client-password.js');


// # BARBEIROS
const barbeirosRouter = require ('./api/barbeiros.js');
const getBarberDetails = require ('./api/get/barber.js');
const getBarberNameOnly = require ('./api/get/barber-name-only.js');
const adminLogin = require ('./api/auth/admin-login.js');
const adminSetAll = require ('./api/modify/admin-all.js');
const adminSetPassword = require ('./api/modify/admin-password.js');
const insertBarber = require ('./api/insert/barber.js');
const adminSetImage = require ('./api/modify/admin-image.js');
const deleteBarbeiro = require ('./api/delete/barbeiro.js');


// # AGENDAMENTOS
const agendamentosBarber = require('./api/data/agendamentos-barber.js');
const agendamentosCliente = require ('./api/data/agendamentos-cliente.js');
const agendamentosMes = require ('./api/data/agendamentos-mes.js');
const agendamentosDia = require ('./api/data/agendamentos-dia.js');
const getAgendamento = require ('./api/get/agendamento.js');
const insertAgendamento = require ('./api/insert/agendamento.js');
const deleteAgendamento = require ('./api/delete/agendamento.js');
const insertAgendamentosRecorrentesCliete = require ('./api/insert/recorretes.js')


// # HORARIOS
const horariosRouter = require ('./api/horarios.js');
const horariosBarber = require('./api/data/horarios-barber-dia.js');
const horariosMes = require ('./api/data/horarios-mes.js');
const insertHorario = require ('./api/insert/horarios.js');
const insertHorarioMes = require ('./api/insert/horarios-mes.js');
const changeStatusHorario = require ('./api/modify/horario-status.js');
const getHorariosStatus = require('./api/analytics/horarios-status.js'); // Importe a rota que você criou


// # INSIGHTS
const insightsBarber = require ('./api/analytics/insights-barber.js');
const insightsMonth = require ('./api/analytics/insights-mes.js');

app.use('/horarios', horariosRouter);

app.use('/barbeiros', barbeirosRouter); 

app.use('/clientes', clientesRouter);

app.use('/agendamentos-barbeiro-dia', agendamentosBarber);

app.use('/horarios-barbeiro-dia', horariosBarber);

app.use('/agendamentos-cliente', agendamentosCliente);

app.use('/agendamentos-mes', agendamentosMes);

app.use('/horarios-barbeiro-mes', horariosMes);

app.use('/agendamentos-dia', agendamentosDia);

app.use('/clientes-id', getClientDetails);

app.use('/barber-id', getBarberDetails);

app.use('/cliente-name', getClientName);

app.use('/cliente-name-only', getClientNameOnly);

app.use('/barber-name-only', getBarberNameOnly);

app.use('/cliente-phone', getClientPhone);

app.use('/cliente-image', getClientImage);

app.use('/agendamento-id', getAgendamento);

app.use('/horarios-barbeiro', insightsBarber);

app.use('/insights-mes', insightsMonth);

app.use('/admin-login', adminLogin);

app.use('/client-login', clientLogin);

app.use('/admin-set-all', adminSetAll);

app.use('/admin-set-password', adminSetPassword);

app.use('/cliente-set-all', clientSetAll);

app.use('/post-insert-barber', insertBarber);

app.use('/post-insert-client', insertClient);

app.use('/post-insert-agendamento', insertAgendamento);

app.use('/admin-set-image', adminSetImage);

app.use('/post-delete-agendamento', deleteAgendamento);

app.use('/post-delete-cliente', deleteCliente);

app.use('/post-delete-barbeiro', deleteBarbeiro);

app.use('/insert-horarios-barbeiro', insertHorario)

app.use('/insert-horarios-barbeiro-mes', insertHorarioMes)

app.use('/horario-status', changeStatusHorario)

app.use('/insert-recorrentes-cliente', insertAgendamentosRecorrentesCliete)

app.use('/horarios-status', getHorariosStatus);

app.post('/rotina-recorrentes', (req, res) => {
inserirAgendamentosAutomaticos();
res.send('Rotina de agendamentos acionada com sucesso!');
});


app.use('/alter-client-name', AlterClientName)

app.use('/alter-client-password', AlterClientPass)
  
app.listen(port, () => {
    console.log("Server is running on port "+ port)
})

module.exports = app;