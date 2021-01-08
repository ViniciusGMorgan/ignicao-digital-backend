require("dotenv").config();

module.exports = {
  dialect: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "database_development",
  define: {
    timestamps: false,
    underscored: true,
    underscoredAll: true,
  },
};
