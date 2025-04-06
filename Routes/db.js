const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("your_database_name", "your_username", "your_password", {
  host: "localhost",
  dialect: "mysql", // or 'postgres' if using PostgreSQL
});

sequelize.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.error("Error connecting to database:", err));

module.exports = sequelize;