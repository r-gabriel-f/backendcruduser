const { Pool } = require('pg');

const pool = new Pool({
    user: "robert",
    host: "localhost",
    database: "persona",
    password: "",
    port: 5432,
});

module.exports = pool;

