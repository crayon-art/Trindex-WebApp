const { Pool } = require ('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DBDATABASE,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT,
    ssl: {
        rejectUnauthorized: false,  // this is insecure and should be configured properly in a production environment
      },
});

module.exports = pool;
