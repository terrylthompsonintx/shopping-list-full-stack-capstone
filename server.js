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

var shoppingList = new Array('');
var shopListItem = new Object();



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


//function to check the ingredient short list and the detailed ingredient list and store them in the shopping list collection

function storeShoppingList(ingredientsShortList, ingredientsDetails) {

    //check if the input arrays are not empty
    if ((ingredientsShortList.length != 0) && (ingredientsDetails.length != 0)) {
        //loop the shortlist array


        for (let i = 0; i < ingredientsShortList.length; i++) {
            let foundDetailedtIngredient = 0;

            //check if the short Ingredient name is not empty
            if (ingredientsShortList[i] != "") {

                //get one short Ingredient at a time
                let shortIngredient = ingredientsShortList[i].toLowerCase();

                //if the ingredient was not found yet
                if (foundDetailedtIngredient == 0) {
                    //for each one short Ingredient loop the ingredientsDetails
                    for (let y = 0; y < ingredientsDetails.length; y++) {

                        //check if the detailed Ingredient name is not empty
                        if (ingredientsDetails[i] != "") {

                            //get one detailed Ingredient at a time
                            let detailedIngredient = ingredientsDetails[i].toLowerCase();

                            //match the short Ingredient with the detailed Ingredient
                            if (detailedIngredient.indexOf(shortIngredient) !== -1) {

                                foundDetailedtIngredient++;
                                console.log(i, shortIngredient, detailedIngredient);
                            }
                        }
                    }
                }

            }
        }
        //check for existing data in DB.
        //No Start adding.
        //Yes check if ingredientsShortList is present
        //no Add ingredientsShortList and ingredientsDetails as object.
        //yes add ingredientsDetails to existing object.
    }
}

function storeIngredient(shortList, qtyList) {
    //function takes two arrays from a recipe.  It ensure that the short list item is present in the qty item.  If so, it checks the shoppingList array to see if the shortlist item is present.  If so it adds the qty to the shortlist qty.
    //if its not present, it adds the shortlist item and qty to shopping list.


    for (let x = 0; x < qtyList.length; x++) {
        let shortListLower = shortList[x].toLowerCase();
        let listCounter = 0;
        let found = 0;
        while ((found != 1) && (listCounter < shortList.length)) {
            let qtylistLower = qtyList[x].toLowerCase();
            if (qtylistLower.indexOf(shortListLower) !== -1) {
                found = 1;
                console.log("line 159", shortListLower, qtylistLower);
                list.create({
                    ingredient: shortList[listCounter],
                    qty: qtyList[x]

                });
            }

            listCounter++;
        }
        listCounter = 0;
        found = 0;
        //        for (let e = 0; e < shortList.length; e++) {
        //            let qtylistLower = qtyList[x].toLowerCase();
        //            console.log(shortListLower, qtylistLower);
        //checks to see if shortlist item is present in
        //            if (qtylistLower.indexOf(shortListLower) !== -1) {
        //            if (shortListLower.indexOf(qtylistLower) !== -1) {
        //                console.log("line 159", shortListLower, qtylistLower);


        //            if (shoppingList.length > 0) {
        //                //search shopping list to see if ingredient present if the list is greater than 0
        //                for (let t = 0; t < shoppingList.length; t++) {
        //                    //iterates through shopping list
        //                    let shoppingListLow = shoppingList[t];
        //                    console.log(shoppingListLow);
        //                    let shoppingListLower = shoppingListLow.toLowerCase();
        //                    if (shoppingListLower == shortListLower) {
        //                        //found in list
        //                        let addqty = qtylist[x];
        //                        shoppingList[t].qty.push(addqty);
        //                        //adds it to the objects qty array.
        //                        console.log(shoppinglist);
        //                    } else {
        //                        //not found in list
        //                        let pushQty = new Array();
        //                        pushQty[0] = qtyList[x];
        //                        let newShopItem = new Object();
        //                        newShopItem.item = shortList[x];
        //                        newShopItem.qty = pushQty;
        //
        //
        //                        //pushes new item to shoppinglist
        //                        shoppingList.push(newShopItem);
        //                    }
        //
        //                }
        //            } else
        //            //if shopping list is enpty add new item.
        //            {
        //                let newItem = new shopListItem({
        //                    item: shortlist[x],
        //                    qty: qtylist[x]
        //                })
        //                shoppingList.push(newItem);
        //
        //            }
    }
}



//console.log(shoppingList);

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

    //console.log(req.params.id);
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
app.get('/retrieve-recipes/', function (req, res) {
    recipe.find(function (err, item) {
        //        console.log(item);
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(item);
    });
});

//app.get('/retrieve-recipes/', (req, res) => {
//    var allrecipes = '';
//    allrecipes = recipe.find();
//    console.log(allrecipes);
//    res.json(allrecipes);
//
//
//});
//app.get('/populate-favorites', function (req, res) {
//    activity.find(function (err, item) {
//        console.log(item);
//        if (err) {
//            return res.status(500).json({
//                message: 'Internal Server Error'
//            });
//        }
//        res.status(200).json(item);
//    });
// });
app.post('/add-recipe-db/', function (req, res) {


    let aRecipe = getSingleFromYum(req.body.id);
    //console.log(aRecipe);

    //get the data from the first api call
    aRecipe.on('end', function (item) {
        //        console.log(req.body.shortList.split(","));
        //        console.log(item.ingredientLines);

        //storeShoppingList(req.body.shortList.split(","), item.ingredientLines);
        storeIngredient(req.body.shortList.split(","), item.ingredientLines);
        //ttstoreShoppingList(req.body.shortList.split(","), item.ingredientLines);
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
            //            if (err) {
            //                return res.status(500).json({
            //                    message: 'Internal Server Error'
            //                });
            //            }
            //            res.status(201).json(item);
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
