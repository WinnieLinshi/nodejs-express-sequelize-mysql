const db = require("../models");
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;

const business = db.business;
const menu = db.menu;
const purchaseHistory = db.purchaseHistory;
const user = db.user;
const businessHour = db.businessHour;

const Op = db.Sequelize.Op;
const moment = require('moment');
const businessFile = require('../config/1.json');
const userFile = require('../config/2.json');

// Create and Save a new business
exports.businessEtl = (req: any, res: any) => {
  // Create a business
  let businessId = 1

  const businesss = businessFile.map((business: { cashBalance: any; restaurantName: any; }) => ({
    id:businessId++,
    cashBalance: business.cashBalance,
    restaurantName: business.restaurantName,
  }));

  // Save business in the database
  business.bulkCreate(businesss).then((data: any) => {
    res.send(data);
  })

  const dayOfWeek: Record<string, number> = { Mon: 1, Tues: 2, Wed: 3, Weds: 3, Thu: 4, Thurs: 4, Fri: 5, Sat: 6, Sun: 7 }
  const toMinutes = (time: string) => moment.duration(moment(time, ['h:mm A']).format('HH:mm')).asMinutes()
  var businessHours: { businessId: number; day: any; openTime: number; closeTime: number; }[] = []
  let id = 1


  businessFile.forEach((business: { openingHours: string; }) => {
    business.openingHours.split('/').forEach((date: string) => {
      const days = [...date.matchAll(/[A-Z][a-z]+/g)].map((i) => i[0])
      const timeRange = [...date.matchAll(/\d+(:\d+)?\s*(am|pm)?/g)].map((i) => i[0])

      days.forEach((day) => {
        const openingHour = toMinutes(timeRange[0])
        const closingHour = toMinutes(timeRange[1])

        businessHours.push({
          businessId: id,
          day: dayOfWeek[day],
          openTime: openingHour,
          closeTime: closingHour,
        })
      })
    })
    id++;
  })

  businessHour.bulkCreate(businessHours);

  let i = 1;
  var menus: { businessId: number; dishName: any; price: any; }[] = [];
  businessFile.forEach((business: { menu: { dishName: any; price: any; }[]; }) => {
    business.menu.forEach((element: { dishName: any; price: any; }) => {
      menus.push({
        businessId: i,
        dishName: element.dishName,
        price: element.price,
      });
    });
    i++;
  });
  
  menu.bulkCreate(menus).then((data: any) => {
    res.send();
  })
    .catch((err: { message: any; }) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the menu.",
      });
    });
};

// Create and Save a few users
exports.userEtl = (req: any, res: any) => {
  // Create a few users
  const users = userFile.map((user: { cashBalance: any; name: any; id: any; }) => ({
    cashBalance: user.cashBalance,
    userName: user.name,
    userId: user.id
  }));

  var purchaseHistorys: { userId: any; dishName: any; restaurantName: any; transactionAmount: any; transactionDate: any; }[] = []
  userFile.forEach((user: { purchaseHistory: any[]; id: any; }) => {
    user.purchaseHistory.forEach((element: { dishName: any; restaurantName: any; transactionAmount: any; transactionDate: string | number | Date; }) => {
      purchaseHistorys.push({
        userId: user.id,
        dishName: element.dishName,
        restaurantName: element.restaurantName,
        transactionAmount: element.transactionAmount,
        transactionDate: moment(new Date(element.transactionDate)).format('YYYY-MM-DD HH:mm:ss')
      });
    });
  });

  // Save business in the database
  user.bulkCreate(users);
  purchaseHistory.bulkCreate(purchaseHistorys).then(res.send())
    .catch((err: { message: any; }) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    });
};

exports.findAll = (req: { query: { dateTime: any; }; }, res: { send: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: any; }): void; new(): any; }; }; }) => {
  const date = moment(req.query.dateTime)
  const day = date.day() + 1
  const time = moment.duration(date.format('HH:mm')).asMinutes()

  businessHour
    .findAll({
      where: {
        day: day,
        openTime: { [Op.lte]: time },
        closeTime: { [Op.gte]: time },
      }
    })
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: { message: any; }) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving businesss.",
      });
    });
};

exports.findRestByDishNumInPrice = (req: any, res: any) => {
  const dishCompare = req.query.dishCompare === 'greater' ? '>' : '<'
  const minPrice = parseInt(req.query.minPrice)
  const maxPrice = parseInt(req.query.maxPrice)
  const dishNum = req.query.dishNum
  business.findAll({
    having: Sequelize.literal('dishNum ' + dishCompare + dishNum),
    attributes: {
      include: [
        [sequelize.fn("COUNT", "1"), 'dishNum']
      ]
    },
    group: "menus.businessId",
    order: [["restaurantName", "ASC"]],
    where: { '$menus.price$': { [Op.lte]: maxPrice, [Op.gte]: minPrice } },
    include: [{
      model: menu,
      required: true
    }]
  })
    .then((data: any) => {
      res.send(data);
    });
};

exports.findRestOrDish = (req: any, res: any) => {
  const searchTerm = req.query.q
  const dishNameFilter = searchTerm ? { dishName: { [Op.like]: `%${searchTerm}%` } } : {}
  const restNameFilter = searchTerm ? { restaurantName: { [Op.like]: `%${searchTerm}%` } } : {}

  Promise.all([
    menu.findAll({ where: dishNameFilter, attributes: [['dishName', 'searchResult']] }),
    business.findAll({ where: restNameFilter, attributes: [['restaurantName', 'searchResult']] }),
  ]).then((modelReturn) => res.send(modelReturn.flat().sort(
    function (a, b) { return a.dataValues.searchResult.length - b.dataValues.searchResult.length; })))

};

exports.purchaseDish = async (req: any, res: any) => {
  await sequelize.transaction(async (t: any) => {

    var purchaseDetails = {
      userId: req.body.userId,
      dishName: req.body.dishName,
      restaurantName: req.body.restaurantName,
      transactionAmount: req.body.transactionAmount,
      transactionDate: moment(new Date(req.body.transactionDate)).format('YYYY-MM-DD HH:mm:ss')
    }

    const userInfo = await user.findByPk(purchaseDetails.userId);
    if (userInfo === null) {
      res.send();
    } else {
      purchaseHistory.create(purchaseDetails, { transaction: t })
      await user.update({ cashBalance: userInfo.cashBalance - req.body.transactionAmount }, { where: { userId: userInfo.userId } }, { transaction: t }).then((data: any) => {
        res.send({ status: data[0] === 1 ? "success" : "fail" });
      });
    }
  });

};

export { };