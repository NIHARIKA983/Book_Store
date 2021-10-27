/**
 * @description   : It is use to establish the connection between the database and server
 * @package       : express, dotenv
 * @file          : server.js
 * @author        : Niharika K V
*/
const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }));

const connection = require("./config/database.config");
connection.database();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the BookStore.' });
});

app.listen(process.env.PORT, () => {
  console.log('Server is listening on port 3000');
});

module.exports = app; 