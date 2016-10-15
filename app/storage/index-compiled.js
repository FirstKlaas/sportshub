"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var sequelize = new Sequelize('postgres://developer:developer@localhost:5432/sportshub');

db = {};

var model = sequelize.import(path.join(__dirname, 'user.js'));
db[model.name] = model;
console.log('Imported ' + model.name);

Object.keys(db).forEach(function (modelName) {
    console.log(db[modelName]);
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

//# sourceMappingURL=index-compiled.js.map