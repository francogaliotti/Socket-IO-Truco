'use strict';
/*
const path = require('path');
const fs = require('fs');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
//const config = require(__dirname + '/../config/config').development;

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
  });
const db = {sequelize, Sequelize};
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;*/

import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const  sequelize = new Sequelize("trucousers", "root", "1234", {
    host: 'localhost',
    dialect: 'mysql'
  });

export { Sequelize, sequelize };