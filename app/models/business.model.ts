module.exports = (sequelize: any, Sequelize: any) => {
  const businessInfo = sequelize.define("business", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    cashBalance: {
      type: Sequelize.FLOAT,
    },
    restaurantName: {
      type: Sequelize.STRING
    }
  });

  return businessInfo;
};
