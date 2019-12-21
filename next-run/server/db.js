const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  host: 'localhost',
  database: 'next_run',
  password: '123',
  post: 5432
});

module.exports = pool;