const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: '123456',
    database: 'todo_db',
    host: "localhost",
    port: 3000
});

module.exports = pool;