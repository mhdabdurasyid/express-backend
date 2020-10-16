<h1 align="center">CRUD Using ExpressJs & MySQL</h1>

Built with NodeJs using the ExpressJs Framework.
Express.js is a web application framework for Node.js. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With
[![Express.js](https://img.shields.io/badge/Express.js-4.17.1-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v12.18.3-green.svg?style=rounded-square)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-v2.18.1-blue.svg?style=rounded-square)](https://www.npmjs.com/package/mysql)

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (XAMPP)
5. Code Editor (Visual Studio Code)

## How to run the app ?
1. Open app's directory in CMD
2. Type `npm install`
3. Turn on Web Server and MySQL (XAMPP, etc.)
4. Create a database with the name e-commerce to **phpmyadmin**
5. Open Postman desktop application that has installed before
6. Choose HTTP Method and enter request URL (ex. https://localhost:8080/)
7. You can see all the end point [here](#end-point)

## End Point
**A. PUBLIC**

1. Register

   * **POST**
     * `/public/costumer`(Register as a costumer. Form parameter: `name, email, password`) 
     * `/public/seller` (Register as a seller. Form parameter: `email, password, storeName, phone`)
     
2. Login

   * **POST**
     * `/auth/customer/login`(Login as a costumer. Form parameter: `email, password`) 
     * `/auth/seller/login` (Login as a seller Form parameter: `email, password`)
     
3. Home

   * **GET**
     * `/public/category`(Show product category)
     * `/public/item?limit=&search=&sort=&page` (Advance function on product such as limit, search, sort, and pagination)
     
4. Product Detail

   * **GET**
     * `/public/item/:id` (Get product by id)
     
5. Category

   * **GET**
     * `/public/category/:id?page=&limit=&search=&sort=` (Get product by category with advanced function)
     
6. Others

   * **GET**
     * `/public/color`
     * `/public/condition`
     * `/public/province`
     * `/public/city`

**B. PRIVATE**

1. Customer

   * **GET**
     * `/costumer` (Get customer profile)
     * `/shipping_address` (Get customer shipping address list)
     * `/shipping_address/primary` (Get customer primary shipping address)
     * `/cart` (Get customer cart)
     
   * **POST**
     * `/cart` (Add product to customer cart. Form parameter: `itemID, quantity`)
     
   * **PATCH**
     * `/costumer` (Update customer profile)
     * `/cart/:item_id` (Update product quantity by id on cart. Form parameter: `quantity`)
     
   * **PUT**
     * `/shipping_address/:id` (Update customer shipping address by id. Form parameter: `addressName, address, recipientName, recipientPhone, city, postalCode, primaryAddress`)
     
   * **DELETE**
     * `shipping_address/:id` (Delete customer shipping address by id)
     * `/cart/:item_id` (Delete product by id from cart)

2. Seller

   * **GET**
     * `/seller` (Get seller profile)
     * `/item_image/:id` (Get product image by id)
     
   * **POST**
     * `/item` (Add new product. Form parameter: `name, price, description, stock, categoryID, conditionID, colorID`)
     * `/item_image` (Add product image. Form parameter: `id, image`)
     
   * **PATCH**
     * `/seller` (Update seller profile)
     * `/item/:id` (Update product)
     
   * **PUT**
     * `/item_image/:id` (Update product image by id. Form parameter: `image`)
     
   * **DELETE**
     * `/item/:id` (Delete product)
     * `/item_image/:id` (Delete product image)

3. SuperAdmin

   * **POST**
     * `/category`
     * `/color`
     * `/condition`
   
   * **PUT**
     * `/category/:id`
     * `/color/:id`
     * `/condition/:id`

   * **DELETE**
     * `/costumer/:id`
     * `/seller/:id`
     * `/category/:id`
     * `/color/:id`
     * `/condition/:id`
