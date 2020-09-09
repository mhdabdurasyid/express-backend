<h1 align="center">CRUD Using ExpressJs & MySQL</h1>

Built with NodeJs using the ExpressJs Framework.
Express.js is a web application framework for Node.js. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With
[![Express.js](https://img.shields.io/badge/Express.js-4.17.1-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v12.18.3-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (XAMPP)
5. Code Editor (Visual Studio Code)

## How to run the app ?
1. Open app's directory in CMD
2. Type `npm i express`, `npm i body-parser`, & `npm i mysql`
3. Turn on Web Server and MySQL (XAMPP, etc.)
4. Create a database with the name ecommerce and create table items which contain id(int), name(varchar), price(int) & description(varchar) to **phpmyadmin**
5. Open Postman desktop application that has installed before
6. Choose HTTP Method and enter request URL (ex. https://localhost:8080/)
7. You can see all the end point [here](#end-point)

## End Point
**1. GET**

* `/item`(Get All item) 
* `/item?page=1`
* `/item?limit=5`
* `/item?page=1&limit=5`
* `/item?search=query`
* `/item/{id}`(Get item by ID) 

**2. POST**

* `/item`(Add new item) 

**3. PUT**

* `/item/{id}`(Update item by ID) 

**4. PATCH**

* `/item/{id}`(Update item partially by ID) 

**5. DELETE**

* `/item/{id}`(Delete item by ID) 
