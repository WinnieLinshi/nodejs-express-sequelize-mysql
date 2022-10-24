module.exports = (sequelize: any, Sequelize: any) => {
  const businessInfo = sequelize.define("business", {
    cashBalance: {
      type: Sequelize.FLOAT,
    },
    restaurantName: {
      type: Sequelize.STRING
    }
  });

  return businessInfo;
};
