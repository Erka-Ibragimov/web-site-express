const { Sequelize } = require("sequelize");

module.exports = new Sequelize(process.env.PG_DATABASE, process.env.PG_NAME, process.env.PG_PASSWORD, {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  dialect: "postgres",
});

// PORT=5000
// PG_DATABASE=online-web-site
// PG_PASSWORD=root123
// PG_NAME=postgres
// PG_HOST=localhost
// PG_PORT=5432
