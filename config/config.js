require("dotenv").config();
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env;

module.exports = {
  development: {
    username: DB_USER || "postgres",
    password: DB_PASS || "postgres",
    database: DB_NAME || "final_project",
    host: DB_HOST || "db",
    dialect: "postgres",
    port: DB_PORT || 5432,
  },
  test: {
    username: DB_USER || "postgres",
    password: DB_PASS || "postgres",
    database: "final_project_test",
    host: DB_HOST || "db",
    dialect: "postgres",
    port: 5432,
    logging: false,
  },
  production: {
    username: DB_USER || "postgres",
    password: DB_PASS || "OvEhNgPNqpKKeIzYtWoUpstWHfOcfIaX",
    database: DB_NAME || "final_project_prod",
    host: DB_HOST || "autorack.proxy.rlwy.net",
    dialect: "postgres",
    port: DB_PORT || 21528 ,
    logging: false,
  },
};
