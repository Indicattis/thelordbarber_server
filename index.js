// index.js
import express from 'express';
import cors from 'cors';
import { inserirHorarios } from './rotina.js';
import cron from 'node-cron';
import db from './db.js';
import { inserirAgendamentosAutomaticos} from './recurrence.js'
// import client from './chatbot.js'; // Importe o chatbot

const app = express();
const port = 8800;

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());

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
    executarRotinaAgendamentos()
})

// Roteamento
import horariosRouter from './api/horarios.js';
app.use('/horarios', horariosRouter);

import barbeirosRouter from './api/barbeiros.js';
app.use('/barbeiros', barbeirosRouter);

import clientesRouter from './api/clientes.js';
app.use('/clientes', clientesRouter);

import agendamentosBarber from './api/data/agendamentos-barber.js'
app.use('/agendamentos-barbeiro-dia', agendamentosBarber);

import agendamentosCliente from './api/data/agendamentos-cliente.js'
app.use('/agendamentos-cliente', agendamentosCliente);

import agendamentosMes from './api/data/agendamentos-mes.js'
app.use('/agendamentos-mes', agendamentosMes);

import agendamentosDia from './api/data/agendamentos-dia.js'
app.use('/agendamentos-dia', agendamentosDia);

import getClientDetails from './api/get/cliente.js'
app.use('/clientes-id', getClientDetails);

import getClientName from './api/get/cliente-name.js'
app.use('/cliente-name', getClientName);

import getClientPhone from './api/get/cliente-number.js'
app.use('/cliente-phone', getClientPhone);

import getAgendamento from './api/get/agendamento.js'
app.use('/agendamento-id', getAgendamento);

import insightsBarber from './api/analytics/insights-barber.js'
app.use('/horarios-barbeiro', insightsBarber);

import insightsMonth from './api/analytics/insights-mes.js'
app.use('/insights-mes', insightsMonth);


import adminLogin from './api/auth/admin-login.js'
app.use('/admin-login', adminLogin)

import adminSetAll from './api/modify/admin-all.js'
app.use('/admin-set-all', adminSetAll)

import adminSetPassword from './api/modify/admin-password.js'
app.use('/admin-set-password', adminSetPassword)

import clientSetAll from './api/modify/client-all.js'
app.use('/cliente-set-all', clientSetAll)


import insertBarber from './api/insert/barber.js'
app.use('/post-insert-barber', insertBarber)


import insertClient from './api/insert/client.js'
app.use('/post-insert-client', insertClient)

import insertAgendamento from './api/insert/agendamento.js'
app.use('/post-insert-agendamento', insertAgendamento)

import adminSetImage from './api/modify/admin-image.js'
app.use('/admin-set-image', adminSetImage)

import deleteAgendamento from './api/delete/agendamento.js'
app.use('/post-delete-agendamento', deleteAgendamento)

import deleteCliente from './api/delete/cliente.js'
app.use('/post-delete-cliente', deleteCliente)

import deleteBarbeiro from './api/delete/barbeiro.js'
app.use('/post-delete-barbeiro', deleteBarbeiro)

app.post('/rotina-recorrentes', (req, res) => {
inserirAgendamentosAutomaticos();
res.send('Rotina de agendamentos acionada com sucesso!');
});


import insertHorario from './api/insert/horarios.js'
app.use('/insert-horarios-barbeiro', insertHorario)

import insertAgendamentosRecorrentesCliete from './api/insert/recorretes.js'
app.use('/insert-recorrentes-cliente', insertAgendamentosRecorrentesCliete)

// Inicia o servidor
app.listen(port, () => {
console.log(`Servidor rodando em http://localhost:${port}`);
});