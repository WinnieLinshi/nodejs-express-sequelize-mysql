<a name="readme-top"></a>
<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="https://cdn-icons-png.flaticon.com/512/825/825575.png" alt="Logo" width="80" height="80">
  <h3 align="center">Food Delivery Platform</h3>

  <p align="center">
    An simple Food Delivery Platform example 
    <br />
    <a href="https://nodejs-sequelize-mysql1.herokuapp.com/docs" target="_blank">View Demo</a>
    ·
    <a href="https://github.com/WinnieLinshi/nodejs-express-sequelize-mysql/issues" target="_blank">Report Bug</a>
    ·
    <a href="https://github.com/WinnieLinshi/nodejs-express-sequelize-mysql/issues" target="_blank">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#left_speech_bubbleabout-the-project">About The Project</a>
      <ul>
        <li><a href="#pickbuilt-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#geargetting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
      </ul>
    </li>
    <li><a href="#nut_and_boltusage">Usage</a></li>
    <li><a href="#octocat-table-schema">Table Schema</a></li>
    <li><a href="#iphonecontact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## :left_speech_bubble:	About The Project

[![Product Name Screen Shot][product-screenshot]](https://nodejs-sequelize-mysql1.herokuapp.com/docs/)

This is a simple Food Delivery Platform that implements a reusable REST API for allowing a front-end client to navigate through that sea of data easily, and intuitively.

[Demo link](https://nodejs-sequelize-mysql1.herokuapp.com/docs/) here is the service that I deployed to [heroku](https://dashboard.heroku.com/) 

<p align="right"><a href="#readme-top"><img src="https://cdn-icons-png.flaticon.com/512/833/833408.png" alt="back" width="40" height="40"></a></p>

### :pick:Built With 
![nodejs][nodejs]
![typeScript][typeScript]
![express][express]
![mysql][mysql]

<p align="right"><a href="#readme-top"><img src="https://cdn-icons-png.flaticon.com/512/833/833408.png" alt="back" width="40" height="40"></a></p>



<!-- GETTING STARTED -->
## :gear:Getting Started

There are many ways on setting up this project locally, but the easiest and most recommended way is to use demo website

** use [the demo](https://nodejs-sequelize-mysql1.herokuapp.com/docs/) :triangular_flag_on_post: directly**



To get a local copy up and running follow these simple steps. :trollface:

  ```bash
  tsc
  npm start
  ```


<!-- USAGE EXAMPLES -->
## :nut_and_bolt:Usage

GET
/business
List all restaurants that are open at a certain datetime

GET
/businessByDishNumInPrice
List top y restaurants that have more or less than x number of dishes within a price range, ranked alphabetically

GET
/restOrDish
Search for restaurants or dishes by name, ranked by relevance to search term

POST
/purchaseDish
Process a user purchasing a dish from a restaurant, handling all relevant data changes in an atomic transaction.

<!-- TABLE SCHEMA -->
## :octocat: Table Schema
**These are the initial data for this project**

### BUSINESS
| ID:old_key: | cashBalance     | restaurantName         | 
|--------------|--------------|--------------|
| 1 |  4987.51 | DANTE |

### BUSINESS_HOURS
| ID:old_key: | businessId | day | openTime | closeTime |
|---------|--------------|--------|--------|--------|
| 14  | 1 | 7 | 870 | 1200 |

### PURCHASE_HISTORIES
| ID:old_key: | businessId | dishName | price |
|---------|--------------|--------|-------|
| 4  | 1 | Zio Cecio | 10 |

### MENUS
| ID:old_key: | userID | dishName | restaurantName | transactionAmount |
|---------|--------------|--------|--------|--------|
| 4  | 1 | Zio Cecio | DANTE | 10 |

### USER_INFOS
userID:old_key: | UserName | cashBalance |
---------|----------|------|
| 0  | Edith Johnson | 700.7 |

<!-- CONTACT -->
## :iphone:	Contact

 [![LinkedIn][linkedin-shield]][linkedin-url]  
 **Winnie Lin** - [linw2949@gmail.com](mailto:linw2949@gmail.com)


<p align="right"><a href="#readme-top"><img src="https://cdn-icons-png.flaticon.com/512/833/833408.png" alt="back" width="40" height="40"></a></p>

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/winnielin2949/
[product-screenshot]: Screenshot.png
[express]: https://expressjs.com/images/express-facebook-share.png
[mysql]: https://miro.medium.com/max/1400/1*TTM5AleQfFJ-mItttJROdg.jpeg
[nodejs]: https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png
[typeScript]: https://cdn.thenewstack.io/media/2022/01/10b88c68-typescript-logo.png
