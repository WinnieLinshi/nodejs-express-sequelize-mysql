const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    "openapi": "3.0.3",
    info: {
      "title": "Swagger - OpenAPI 3.0",
      "description": "My first Node.js-express-sequelize-mysql project",  
      version: '1.0.0',
    },
    paths: {
      "/business": {
        "get": {
          "summary": "List all restaurants that are open at a certain datetime",
          "parameters": [
            {
              "name": "dateTime",
              "in": "query",
              "description": "certain datetime",
              "required": true,
              "type": "string"
            }
          ],
          "responses": {
            "200": {
              "description": "success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/businessHour"
                    }
                  }
                }
              }
            }
          }
        },
      },
      "/businessByDishNumInPrice": {
        "get": {
          "summary": "List top y restaurants that have more or less than x number of dishes within a price range, ranked alphabetically",
          "parameters": [
            {
              "name": "dishCompare",
              "in": "query",
              "description": "greater or less",
              "required": true,
              "type": "string"
            },
            {
              "name": "minPrice",
              "in": "query",
              "description": "minPrice",
              "required": true,
              "type": "integer"
            },
            {
              "name": "maxPrice",
              "in": "query",
              "description": "maxPrice",
              "required": true,
              "type": "integer"
            },
            {
              "name": "dishNum",
              "in": "query",
              "description": "x number of dishes",
              "required": true,
              "type": "integer"
            }
          ],
          "responses": {
            "200": {
              "description": "success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/business"
                    }
                  }
                }
              }
            }
          }
        },
      },
      "/restOrDish": {
        "get": {
          "summary": "Search for restaurants or dishes by name, ranked by relevance to search term",
          "parameters": [
            {
              "name": "q",
              "in": "query",
              "description": "search term",
              "required": true,
              "type": "string"
            }
          ],
          "responses": {
            "200": {
              "description": "success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/searchResult"
                    }
                  }
                }
              }
            }
          }
        },
      },
      "/purchaseDish": {
        "post": {
          "summary": "Process a user purchasing a dish from a restaurant, handling all relevant data changes in an atomic transaction.",
          "requestBody": {
            "description": "user purchase details",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/purchaseDetails"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "success"
            }
          }
        },
      }
    },
    "components": {
      "schemas": {
        "businessHour": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
              "example": 10
            },
            "businessId": {
              "type": "integer",
              "example": 10
            },
            "day": {
              "type": "integer",
              "example": 4
            },
            "openTime": {
              "type": "integer",
              "example": 4
            },
            "closeTime": {
              "type": "integer",
              "example": 4
            },
            "createdAt": {
              "type": "string",
              "example": "2022-10-23T06:09:15.000Z"
            },
            "updatedAt": {
              "type": "string",
              "example": "2022-10-23T06:09:15.000Z"
            }
          }
        },
        "business": {
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
              "example": 1
            },
            "cashBalance": {
              "type": "float",
              "example": 10.56
            },
            "restaurantName": {
              "type": "string",
              "example": "La bon jones"
            },
            "createdAt": {
              "type": "string",
              "example": "2022-10-23T06:09:15.000Z"
            },
            "updatedAt": {
              "type": "string",
              "example": "2022-10-23T06:09:15.000Z"
            }
          }
        },
        "searchResult": {
          "type": "object",
          "properties": {
            "searchResult": {
              "type": "string",
              "example": "COFFEE HOUSE MAURICE SALAD BOWL - A Refreshing Salad with Julienne Turkey"
            }
          }
        },
        "purchaseDetails": {
          "type": "object",
          "properties": {
            "userId": {
              "type": "integer",
              "example": 5
            },
            "dishName": {
              "type": "string",
              "example": "Julienne Turkey"
            },
            "restaurantName": {
              "type": "string",
              "example": "COFFEE HOUSE"
            },
            "transactionAmount": {
              "type": "integer",
              "example": 50
            },
            "transactionDate": {
              "type": "string",
              "example": "2022-10-23T06:09:15.000Z"
            }
          }
        }
      }
    }
  },
  apis: ['./routes/routes.ts']
}

const swaggerSpec = swaggerJsdoc(options)


const swaggerDocs = function swaggerDocs(app: any, port: string | number) {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  
  // Documentation in JSON format
  app.get('/docs.json', (req: any, res: any) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
};

module.exports = swaggerDocs;