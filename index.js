// IMPORT modul
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./src/helper/db');
const qs = require('querystring');

const app = express();

//configure express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));

app.route('/item')
    // POST method on path '/item' to add new items
    .post((request, response) => {
        const {
            name,
            price,
            description
        } = request.body;
        if (name && price && description) {
            db.query(`insert into items (name, price, description) values ('${name}', ${price}, '${description}')`, (error, result, fields) => {
                if (!error) {
                    response.send({
                        success: true,
                        message: 'Success post data',
                        data: request.body
                    });
                } else {
                    console.log(error.message);
                    response.status(500).send({
                        success: false,
                        message: 'Connection refuse'
                    });
                }
            });
        } else {
            response.status(400).send({
                success: false,
                message: 'Incomplete data'
            });
        }
    })
    // GET method on path '/item' to get item & search item
    .get((request, response) => {
        let {
            page,
            limit,
            search
        } = request.query;

        let searchKey = ''
        let searchValue = '';

        if (typeof search === 'object') {
            searchKey = Object.keys(search)[0];
            searchValue = Object.values(search)[0];
        } else {
            searchKey = 'name';
            searchValue = search || '';
        }

        if (!limit) {
            limit = 5;
        } else {
            limit = parseInt(limit);
        }

        if (!page) {
            page = 1;
        } else {
            page = parseInt(page);
        }

        db.query(`select * from items where ${searchKey} like '%${searchValue}%' limit ${limit} offset ${(page-1)*limit}`, (error, result, fields) => {
            if (!error) {
                const pageInfo = {
                    count: 0,
                    pages: 0,
                    currentPage: page,
                    limitPerPage: limit,
                    nextLink: null,
                    prevLink: null
                }

                if (result.length) {
                    db.query(`select count(*) as count from items where ${searchKey} like '%${searchValue}%'`, (error, data, fields) => {
                        const {
                            count
                        } = data[0];
                        pageInfo.count = count;
                        pageInfo.pages = Math.ceil(count / limit);

                        const {
                            pages,
                            currentPage
                        } = pageInfo;

                        if (currentPage < pages) {
                            pageInfo.nextLink = `http://localhost:8080/item?${qs.stringify({...request.query, ...{page: page+1}})}`;
                        }

                        if (currentPage > 1) {
                            pageInfo.prevLink = `http://localhost:8080/item?${qs.stringify({...request.query, ...{page: page-1}})}`;
                        }

                        response.send({
                            success: true,
                            message: 'List of items',
                            data: result,
                            pageInfo
                        });
                    });
                } else {
                    response.send({
                        success: true,
                        message: 'No data on this page',
                        pageInfo
                    });
                }
            } else {
                console.log(error.message);
                response.status(500).send({
                    success: false,
                    message: 'Connection refuse'
                });
            }
        })
    })

// listening on port 8080
app.listen(8080, () => {
    console.log('App listening on port 8080');
});