module.exports = {
  host: 'us-cdbr-east-06.cleardb.net',
  port: '3306',
  USER: "bca8ea498a1051",
  PASSWORD: "c9cb18a9",
  DB: "heroku_8026153cf176c00",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
