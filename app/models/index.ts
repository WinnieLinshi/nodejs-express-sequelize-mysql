const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  menu: require("./menu.model")(sequelize, Sequelize),
  business: require("./business.model")(sequelize, Sequelize),
  businessHour: require("./businessHour.model")(sequelize, Sequelize),
  purchaseHistory: require("./purchaseHistory.model")(sequelize, Sequelize),
  user: require("./user.model")(sequelize, Sequelize)
};

db.business.hasMany(db.menu);
db.business.hasMany(db.businessHour);
db.menu.belongsTo(db.business)
db.businessHour.belongsTo(db.business)

module.exports = db;
