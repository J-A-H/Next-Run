/**
 * This file connects our server to psql database. Your credentials may vary, so update.
 * You must create database in psql manually first.
 */

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  host: 'localhost',
  database: 'next_run',
  password: '123',
  post: 5432
});

module.exports = pool;