
const fs = require('fs');
const wppconnect = require('@wppconnect-team/wppconnect');
const express = require ('express');
const db = require ('../db.js');
const cors = require ('cors');


const app = express();
app.use(express.json());
app.use(cors());

function initBot() {
    wppconnect
        .create({
            session: 'sessionName',
            catchQR: (base64Qr, asciiQR) => {
                console.log(asciiQR); // Optional to log the QR in the terminal
                // ... (rest of the code remains the same)
            },
            logQR: false,
        })
        .then((client) => start(client))
        .catch((error) => console.log(error));
    
    function start(client) {
        client.onMessage((message) => {
            if (message.body === 'agendamento_concluido') {
                // Feedback para o cliente quando o agendamento for concluído
                const message = 'Seu agendamento foi realizado com sucesso!';
                client
                    .sendText(message.from, message)
                    .then(() => {
                        console.log('Feedback sent successfully.');
                    })
                    .catch((error) => {
                        console.error('Error sending feedback:', error);
                    });
            }
        });
    }
}


module.exports = initBot;