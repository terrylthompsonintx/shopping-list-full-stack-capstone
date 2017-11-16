//book mark ????

//getting external resources
const express = require('express');
const morgan = require('morgan');
var unirest = require('unirest');
var events = require('events');
const mongoose = require('mongoose');
var config = require('./config');

var recipe = require('./models/recipe');
var list = require('./models/list');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

//setting up the server to run as a module
var runServer = function (callback) {
    mongoose.connect(config.DATABASE_URL, function (err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function () {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};




if (require.main === module) {
    runServer(function (err) {
        if (err) {
            console.error(err);
        }
    });
};

// external api function
/*const yummlyKey = '971c769d4bab882dc3281f0dc6131324';
const appId = '35372e2c';
const yummlyEndPoint = 'http://api.yummly.com/v1';
const yummlyRecipe = 'http://api.yummly.com/v1/api/recipes?'
var searchTermYummly = '';*/

var getRecepiesFromYum = function (searchTerm) {
    var emitter = new events.EventEmitter();
    //console.log("inside getFromActive function");
    unirest.get("http://api.yummly.com/v1/api/recipes?_app_id=35372e2c&_app_key=971c769d4bab882dc3281f0dc6131324&q=" + searchTerm)
        .header("Accept", "application/json")
        .end(function (result) {
            // console.log(result.status, result.headers, result.body);
            //success scenario
            if (result.ok) {
                emitter.emit('end', result.body);
            }
            //failure scenario
            else {
                emitter.emit('error', result.code);
            }
        });

    return emitter;
};
var getSingleFromYum = function (recipeId) {
    //console.log(recipeId);
    var emitter = new events.EventEmitter();
    //console.log("inside getFromActive function");
    //console.log("http://api.yummly.com/v1/api/recipe/" + recipeId + "?_app_id=35372e2c&_app_key=971c769d4bab882dc3281f0dc6131324");
    unirest.get("http://api.yummly.com/v1/api/recipe/" + recipeId + "?_app_id=35372e2c&_app_key=971c769d4bab882dc3281f0dc6131324")
        .header("Accept", "application/json")
        .end(function (result) {
            //console.log(result.status, result.headers, result.body);
            //success scenario
            if (result.ok) {
                emitter.emit('end', result.body);
            }
            //failure scenario
            else {
                emitter.emit('error', result.code);
            }
        });

    return emitter;
};

//internal api end points

app.get('/search-recipes/:name', (req, res) => {
    //console.log(req);
    //    external api function call and response

    var searchReq = getRecepiesFromYum(req.params.name);

    //get the data from the first api call
    searchReq.on('end', function (item) {
        res.json(item);
    });

    //error handling
    searchReq.on('error', function (code) {
        res.sendStatus(code);
    });

});

//????
//let recipe_details = {
//    "name": "Baked Panko Crusted Fish",
//    "rating": "4",
//    "course": "Main Dishes",
//    "id": "Baked-Panko-Crusted-Fish-2040665",
//    "day": "sunday",
//    "ingredients": {
//        "fish fillets": "1 to 1 1/2 pounds fish fillets, such as haddock, cod, catfish, pollock, or similar mild white fish, cut into 4-ounce to 6-ounce portions",
//        "salt": "salt and freshly ground black pepper"
//    }
//}
app.get('/get-recipe/:id', (req, res) => {

    console.log(req.params.id);
    //    external api function call and response

    var aRecipe = getSingleFromYum(req.params.id);

    //get the data from the first api call
    aRecipe.on('end', function (item) {
        res.json(item);

        //????
        //        res.json(item.ingredientLines[0]);
    });

    //error handling
    aRecipe.on('error', function (code) {
        res.sendStatus(code);
    });

});

app.get('/retrieve-recipes', (req, res) => {
    recipe
        .find().then(recipes => {
            res.json({
                recipes: recipes.map(
                    (recipe) => recipe.apiRepr())
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'Error Reading'
            });
        });
});


app.post('/add-recipe-db/', function (req, res) {


    let aRecipe = getSingleFromYum(req.body.id);
    console.log(aRecipe);

    //get the data from the first api call
    aRecipe.on('end', function (item) {

        //console.log(item.ingredientLines);
        //db connection and data queries
        recipe.create({
            name: req.body.name,
            rating: req.body.rating,
            course: req.body.course,
            id: req.body.id,
            day: req.body.day,
            shortList: req.body.shortList,
            ingredients: JSON.stringify(item.ingredientLines)

        }, function (err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(201).json(item);
        });

        list.create({
            ingredients: JSON.stringify(item.ingredientLines)

        }, function (err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(201).json(item);
        });


        //res.json(item);
    });

    //error handling
    aRecipe.on('error', function (code) {
        res.sendStatus(code);
    });


});




//export and run the server

//app.listen(process.env.PORT || 8080);
