const express = require('express')
const app = express()
var restRouter = require('./routes/rest');
var indexRouter = require('./routes/index');
var mongoose = require('mongoose');
var path = require('path');

mongoose.connect('mongodb://user:xiyinlifaze123@ds151970.mlab.com:51970/coj');

app.use(express.static(path.join(__dirname, '../public')));

//three cases below:/, /api/v1/, ...

app.use('/', indexRouter);

app.use('/api/v1/', restRouter);

app.use(function (req, res) {
    //send index.html to start client side
    res.sendFile("index.html", {root: path.join(__dirname, '../public/')});
  });

app.listen(3000, () => console.log('Example app listening on port 3000!'))