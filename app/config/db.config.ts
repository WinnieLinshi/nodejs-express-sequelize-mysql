module.exports = {
  host: 'localhost',
  port: '3306',
  USER: "root",
  PASSWORD: "0000",
  DB: "bootdb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
