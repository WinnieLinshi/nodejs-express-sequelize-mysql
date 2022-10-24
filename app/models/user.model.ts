module.exports = (sequelize: any, Sequelize: any) => {
  const userInfo = sequelize.define("user_info", {
    userId:{
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    userName: {
      type: Sequelize.STRING
    },
    cashBalance: {
      type: Sequelize.FLOAT
    }
  });

  return userInfo;
};
