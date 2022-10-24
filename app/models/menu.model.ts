module.exports = (sequelize: any, Sequelize: any) => {
  const Menu = sequelize.define("menu", {
    businessId: {
      type: Sequelize.INTEGER
    },
    dishName: {
      type: Sequelize.STRING(2000)
    },
    price: {
      type: Sequelize.FLOAT
    }
  });

  return Menu;
};
