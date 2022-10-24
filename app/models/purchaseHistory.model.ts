module.exports = (sequelize: any, Sequelize: any) => {
  const purchaseHistory = sequelize.define("purchase_history", {
    userId:{
      type: Sequelize.INTEGER
    },
    dishName: {
      type: Sequelize.STRING
    },
    restaurantName: {
      type: Sequelize.STRING
    },
    transactionAmount: {
      type: Sequelize.FLOAT
    },
    transactionDate: {
      type: Sequelize.DATE
    }
  });

  return purchaseHistory;
};
