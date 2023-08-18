// index.js
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const InsertSchedules = require('./rotina.js');
const InsertAppointments = require ('./recurrence.js');

const app = express();
app.use(express.json());
app.use(cors());

const port = 9001

app.get('/', (req, res) =>{
    return res.json(`THELORDBARBER_SERVER is on port:${port}`);
});


// ###################################### CRON MODULE #################################################

 
cron.schedule('0 0 15 * *', () => {
    InsertSchedules()
});

cron.schedule('10 0 15 * *', () => {
    InsertAppointments();
    res.send('Rotina de agendamentos acionada com sucesso!');
})


// ####################################### ROTEAMENTO ##################################################

// # CLIENTES
const GetClients = require ('./api/clientes.js');
const GetClientDetails = require ('./api/get/cliente.js');
const VerifyClient = require ('./api/get/cliente-name.js');
const GetClientName = require ('./api/get/cliente-name-only.js');
const GetClientPhone = require ('./api/get/cliente-number.js');
const GetClientImage = require ('./api/get/cliente-image.js');
const LoginClient = require ('./api/auth/client-login.js');
const AlterClient = require ('./api/modify/client-all.js');
const InsertClient = require ('./api/insert/client.js');
const DeleteClient = require ('./api/delete/cliente.js');
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
const DeleteAgendamentosCliente = require('./api/delete/agendamentos-cliente.js')


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
const ClientProgress = require ('./api/analytics/client-progress.js');

// # BOT
const StartBot = require('./bot/wppconnect.js')



app.use('/init-bot', StartBot)

app.use('/horarios', horariosRouter);

app.use('/barbeiros', barbeirosRouter); 

app.use('/clientes', GetClients);

app.use('/agendamentos-barbeiro-dia', agendamentosBarber);

app.use('/horarios-barbeiro-dia', horariosBarber);

app.use('/agendamentos-cliente', agendamentosCliente);

app.use('/agendamentos-mes', agendamentosMes);

app.use('/horarios-barbeiro-mes', horariosMes);

app.use('/agendamentos-dia', agendamentosDia);

app.use('/clientes-id', GetClientDetails);

app.use('/barber-id', getBarberDetails);

app.use('/cliente-name', VerifyClient);

app.use('/cliente-name-only', GetClientName);

app.use('/barber-name-only', getBarberNameOnly);

app.use('/cliente-phone', GetClientPhone);

app.use('/cliente-image', GetClientImage);

app.use('/agendamento-id', getAgendamento);

app.use('/horarios-barbeiro', insightsBarber);

app.use('/insights-mes', insightsMonth);

app.use('/admin-login', adminLogin);

app.use('/client-login', LoginClient);

app.use('/admin-set-all', adminSetAll);

app.use('/admin-set-password', adminSetPassword);

app.use('/cliente-set-all', AlterClient);

app.use('/post-insert-barber', insertBarber);

app.use('/post-insert-client', InsertClient);

app.use('/post-insert-agendamento', insertAgendamento);

app.use('/admin-set-image', adminSetImage);

app.use('/post-delete-agendamento', deleteAgendamento);

app.use('/post-delete-cliente', DeleteClient);

app.use('/post-delete-barbeiro', deleteBarbeiro);

app.use('/insert-horarios-barbeiro', insertHorario)

app.use('/insert-horarios-barbeiro-mes', insertHorarioMes)

app.use('/horario-status', changeStatusHorario)

app.use('/insert-recorrentes-cliente', insertAgendamentosRecorrentesCliete)

app.use('/horarios-status', getHorariosStatus);

app.use('/client-progress', ClientProgress);

app.use('/delete-agendamentos-cliente', DeleteAgendamentosCliente)

app.post('/rotina-recorrentes', (req, res) => {
InsertAppointments();
res.send('Rotina de agendamentos acionada com sucesso!');
});


app.use('/alter-client-name', AlterClientName)

app.use('/alter-client-password', AlterClientPass)
  
app.listen(port, () => {
    console.log("Server is running on port "+ port)
})

module.exports = app;