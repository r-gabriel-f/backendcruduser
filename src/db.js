const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    max: 20, // máximo número de clientes en el pool
    idleTimeoutMillis: 30000, // tiempo máximo que un cliente puede estar inactivo en el pool
    connectionTimeoutMillis: 2000, // tiempo máximo para establecer una nueva conexión
});

pool.on('error', (err, client) => {
    console.error('Error inesperado en el cliente inactivo', err);
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    getClient: () => pool.connect(),
};