const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  database: 'postgres',
})

exports.query = pool.query
