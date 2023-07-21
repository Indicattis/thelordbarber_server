const cors = require('cors');

function configureCors() {
  const corsOptions = {
    origin: '*', // ou 'http://localhost:3000' para permitir somente esse domínio
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };

  return cors(corsOptions);
}

module.exports = configureCors;