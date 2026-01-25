var express = require('express');
var router = express.Router();
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
};

const pgp = require('pg-promise')();

const db = pgp(`postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/backend`);

/* GET upload-logs */
router.get('/', async function (req, res, next) {
  try {
    const logs = await db.any('SELECT * FROM logs');
    res.json(logs);
  } catch (error) {
    console.error('ERROR:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;