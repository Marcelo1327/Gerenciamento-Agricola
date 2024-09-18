const cron = require('node-cron');
const { removeExpiredTokens } = require('./tokenService');

// Executa a tarefa todos os dias à meia-noite
cron.schedule('0 0 * * *', async () => {
    console.log('Iniciando limpeza de tokens expirados...');
    await removeExpiredTokens();
});