module.exports = (sequelize:any, Sequelize: any) => {
  const businessHour = sequelize.define("business_hour", {
    businessId: {
      type: Sequelize.INTEGER
    },
    day: {
      type: Sequelize.INTEGER
    },
    openTime: {
      type: Sequelize.INTEGER
    },
    closeTime: {
      type: Sequelize.INTEGER
    }
  });

  return businessHour;
};
