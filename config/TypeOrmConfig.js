"use strict";
exports.__esModule = true;
exports.typeOrmConfig = void 0;
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
exports.typeOrmConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['../src/entities/*.js'],
    synchronize: true,
    logging: true,
    keepConnectionAlive: true
};
