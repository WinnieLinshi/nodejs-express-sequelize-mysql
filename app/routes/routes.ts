module.exports = (app: any) => {
  const controller = require("../controllers/controller");

  var router = require("express").Router();

  router.post("/etlBusiness", controller.businessEtl);
  router.post("/etlUser", controller.userEtl);
  router.get("/business", controller.findAll);
  router.get("/businessByDishNumInPrice", controller.findRestByDishNumInPrice);
  router.get("/restOrDish", controller.findRestOrDish);
  router.post("/purchaseDish", controller.purchaseDish);

  app.use(router);
};
