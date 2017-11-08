const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const yummlyKey = '971c769d4bab882dc3281f0dc6131324';
const appId = '35372e2c';
const yummlyEndPoint = 'http://api.yummly.com/v1';
const yummlyRecipe = 'http://api.yummly.com/v1/api/recipes?'
var searchTermYummly = '';

function callYummly(searchTermYummly) {
    var query = yummlyRecipe + '_app_id=' + appId + '&_app_key=' + yummlyKey + '&' + searchTermYummly;
    console.log(query);
    $.getJSON();
};

/*app.post('/search', (req, res) => {
    callYummly =
});*/




const app = express();
app.use(express.static('public'));
app.listen(process.env.PORT || 8080);
