var express = require('express');
var app = express();

var storage = require('./storage');

app.get('/', function (req, res) {
    res.send('Hello World!');
});

storage.sequelize.sync({force:true}).then(function() {
    storage.User.create({
        login: 'mary',
        firstName: 'Marion',
        lastName: 'Nebuhr',
        postalCode: '28359'
    });
    app.listen(3000, function () {
        console.log('Example app listening on port 3000!');
    });
});