// index.js
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const db = require ('./db.js');
const { inserirHorarios } = require('./rotina.js');
const initBot = require('./bot/wppconnect.js')

const app = express();
app.use(express.json());
app.use(cors());

const port = 9001

app.get('/', (req, res) =>{
    return res.json(`THELORDBARBER_SERVER is on port:${port}`);
});


 
cron.schedule('0 0 15 * *', () => {
    db.query('SELECT id FROM barbeiros', (error, results) => {
        if (error) {
            console.error('Erro ao obter os IDs dos barbeiros:', error);
            return;
        }
        
        const idBarbeiros = results.map((row) => row.id);
        inserirHorarios(idBarbeiros);
        executarRotinaAgendamentos()
    });
});



// Roteamento
const horariosRouter = require ('./api/horarios.js');
app.use('/horarios', horariosRouter);

const barbeirosRouter = require ('./api/barbeiros.js');
app.use('/barbeiros', barbeirosRouter); 

const clientesRouter = require ('./api/clientes.js');
app.use('/clientes', clientesRouter);

const agendamentosBarber = require('./api/data/agendamentos-barber.js');
app.use('/agendamentos-barbeiro-dia', agendamentosBarber);

const horariosBarber = require('./api/data/horarios-barber-dia.js');
app.use('/horarios-barbeiro-dia', horariosBarber);

const agendamentosCliente = require ('./api/data/agendamentos-cliente.js');
app.use('/agendamentos-cliente', agendamentosCliente);

const agendamentosMes = require ('./api/data/agendamentos-mes.js');
app.use('/agendamentos-mes', agendamentosMes);

const horariosMes = require ('./api/data/horarios-mes.js');
app.use('/horarios-barbeiro-mes', horariosMes);

const agendamentosDia = require ('./api/data/agendamentos-dia.js');
app.use('/agendamentos-dia', agendamentosDia);

const getClientDetails = require ('./api/get/cliente.js');
app.use('/clientes-id', getClientDetails);

const getBarberDetails = require ('./api/get/barber.js');
app.use('/barber-id', getBarberDetails);

const getClientName = require ('./api/get/cliente-name.js');
app.use('/cliente-name', getClientName);

const getClientNameOnly = require ('./api/get/cliente-name-only.js');
app.use('/cliente-name-only', getClientNameOnly);

const getBarberNameOnly = require ('./api/get/barber-name-only.js');
app.use('/barber-name-only', getBarberNameOnly);

const getClientPhone = require ('./api/get/cliente-number.js');
app.use('/cliente-phone', getClientPhone);

const getClientImage = require ('./api/get/cliente-image.js');
app.use('/cliente-image', getClientImage);

const getAgendamento = require ('./api/get/agendamento.js');
app.use('/agendamento-id', getAgendamento);

const insightsBarber = require ('./api/analytics/insights-barber.js');
app.use('/horarios-barbeiro', insightsBarber);

const insightsMonth = require ('./api/analytics/insights-mes.js');
app.use('/insights-mes', insightsMonth);

const adminLogin = require ('./api/auth/admin-login.js');
app.use('/admin-login', adminLogin);

const clientLogin = require ('./api/auth/client-login.js');
app.use('/client-login', clientLogin);

const adminSetAll = require ('./api/modify/admin-all.js');
app.use('/admin-set-all', adminSetAll);

const adminSetPassword = require ('./api/modify/admin-password.js');
app.use('/admin-set-password', adminSetPassword);

const clientSetAll = require ('./api/modify/client-all.js');
app.use('/cliente-set-all', clientSetAll);

const insertBarber = require ('./api/insert/barber.js');
app.use('/post-insert-barber', insertBarber);

const insertClient = require ('./api/insert/client.js');
app.use('/post-insert-client', insertClient);

const insertAgendamento = require ('./api/insert/agendamento.js');
app.use('/post-insert-agendamento', insertAgendamento);

const adminSetImage = require ('./api/modify/admin-image.js');
app.use('/admin-set-image', adminSetImage);

const deleteAgendamento = require ('./api/delete/agendamento.js');
app.use('/post-delete-agendamento', deleteAgendamento);

const deleteCliente = require ('./api/delete/cliente.js');
app.use('/post-delete-cliente', deleteCliente);

const deleteBarbeiro = require ('./api/delete/barbeiro.js');
app.use('/post-delete-barbeiro', deleteBarbeiro);

const insertHorario = require ('./api/insert/horarios.js');
app.use('/insert-horarios-barbeiro', insertHorario)

const insertHorarioMes = require ('./api/insert/horarios-mes.js');
app.use('/insert-horarios-barbeiro-mes', insertHorarioMes)

const changeStatusHorario = require ('./api/modify/horario-status.js');
app.use('/horario-status', changeStatusHorario)

const insertAgendamentosRecorrentesCliete = require ('./api/insert/recorretes.js')
app.use('/insert-recorrentes-cliente', insertAgendamentosRecorrentesCliete)

const getHorariosStatus = require('./api/analytics/horarios-status.js'); // Importe a rota que você criou
app.use('/horarios-status', getHorariosStatus);

const inserirAgendamentosAutomaticos = require ('./recurrence.js');
app.post('/rotina-recorrentes', (req, res) => {
inserirAgendamentosAutomaticos();
res.send('Rotina de agendamentos acionada com sucesso!');
});


const AlterClientName = require('./api/modify/alter-client-name.js')
app.use('/alter-client-name', AlterClientName)

const AlterClientPass = require('./api/modify/alter-client-password.js')
app.use('/alter-client-password', AlterClientPass)
  
app.listen(port, () => {
    console.log("Server is running on port "+ port)
})

module.exports = app;