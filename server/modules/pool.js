const pg = require('pg');

const config = {
    database: 'task_to_do',
    host: 'localhost',
    port: 5432,
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
    console.log('connected to postgres');

});

pool.on('error', (err) => {
    console.log('error connecting to postgress', err);

});

module.exports = pool;