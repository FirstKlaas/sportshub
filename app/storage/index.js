var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || 'development';
var config    = require(path.join(__dirname,'..','config','config.json'))[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);

db = {};

var model = sequelize.import(path.join(__dirname, 'user.js'));
db[model.name] = model;

var model = sequelize.import(path.join(__dirname, 'session.js'));
db[model.name] = model;

var model = sequelize.import(path.join(__dirname, 'entry.js'));
db[model.name] = model;

Object.keys(db).forEach(function(modelName) {
    console.log(db[modelName]);
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
