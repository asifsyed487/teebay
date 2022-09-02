const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "mAsTeR12#",
  host: "localhost",
  port: 5432,
  database: "teebay",
});

module.exports = pool;
