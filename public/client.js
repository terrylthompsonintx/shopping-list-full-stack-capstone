//STEP 1 - functions and objects definitions

var menu = '';
var toggleHidden = 1;


//Populates Menu section of Search.html
function addToMenu(recipeName, id, menu) {
    var buildMenuHtml = '';
    //buildMenuHtml += '<li><h3>' + $('#recipeDay').val() + '</h3></li>';
    buildMenuHtml += '<li><a href="https://www.yummly.com/#recipe/' + id + '" target="_blank" alt="Link to Yummly Recipe" title="Link to Yummly Recipe">' + recipeName + ' </a></li>';
    var dayId = '#' + $('#recipeDay').val();
    $(dayId).append(buildMenuHtml);
    //    menu += '<li><h3>' + dayId + '</h3></li>';
    //    menu += buildMenuHtml;
    //    console.log(menu);

};

function buildRecipeList(dataOutput, searchWeekDay) {

    //console.log(dataOutput);
    var buildHtml = '';

    $.each(dataOutput.matches,
        function (key, value) {
            buildHtml += '<ul class="col-4 item">';
            buildHtml += '<li class ="title">' + value.recipeName;

            buildHtml += ' <a href="https://www.yummly.com/#recipe/ class="wobble"' + value.id + '" target="_blank" alt="Link to Yummly Recipe" title="Link to Yummly Recipe">';
            buildHtml += '<i class="fa fa-info-circle" aria-hidden="true"></i>';
            buildHtml += '</a>';
            buildHtml += '</li>';

            buildHtml += '<li>';


            buildHtml += '<img src ="' + value.smallImageUrls[0] +
                '"/>';
            //            console.log(imgURL);
            //            buildHtml += '</li>';

            buildHtml += '<li>';
            buildHtml += 'Rating: ' + value.rating;
            buildHtml += '</li>';
            buildHtml += '<li>';
            buildHtml += 'Course: ' + value.attributes.course;
            buildHtml += '</li>';
            buildHtml += '<li class="title">';
            buildHtml += 'Ingredients:';
            buildHtml += '</li>';
            buildHtml += '<li>';


            buildHtml += '<ol class="ingredientBox">';
            let shortList = "";
            $.each(value.ingredients, function (subkey, subvalue) {

                buildHtml += '<li>';
                buildHtml += subvalue;
                buildHtml += '</li>';

                shortList += subvalue + ",";

            });
            buildHtml += '</ol>'

            buildHtml += '</li>';
            buildHtml += '<li>';
            buildHtml += "<form class='storeToDb'>";
            buildHtml += "<input type='hidden' class='storeToDbName' value='" + value.recipeName + "'>";
            buildHtml += "<input type='hidden' class='storeToDbRating' value='" + value.rating + "'>";
            buildHtml += "<input type='hidden' class='storeToDbCourse' value='" + value.attributes.course + "'>";
            buildHtml += "<input type='hidden' class='storeToDbId' value='" + value.id + "'>";
            buildHtml += "<input type='hidden' class='storeToDay' value='" + searchWeekDay + "'>";
            buildHtml += "<input type='hidden' class='storeToShortList' value='" + shortList + "'>";

            buildHtml += '<button class="selectButton" >Select Recipe</button>';

            buildHtml += "</form>";

            buildHtml += '</li>';
            buildHtml += '</ul>';



            //    console.log(buildHtml);
        });
    $('#searchBoxReturn').html(buildHtml);

};

function sendRecepiesSearch(getSearchData, searchWeekDay) {
    $.ajax({
            type: "GET",
            url: '/search-recipes/' + getSearchData,
            dataType: 'json',
        })
        .done(function (dataOutput) {
            console.log(dataOutput);
            buildRecipeList(dataOutput, searchWeekDay);

        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
};

function buildShoppingList(result) {
    console.log(result);
    let aggregateList = [];
    let aggregateLower = '';
    let currentIngredient = '';
    let oldIngredient = '';
    let ingredientHtml = '';
    for (let e = 0; e < result.length; e++) {
        if (result[e].ingredient !== undefined) {
            var resultconvert = result[e].ingredient;
            //console.log(resultconvert);
            var resultLower = resultconvert.toLowerCase();
            currentIngredient = resultLower;

            if (currentIngredient !== oldIngredient) {
                ingredientHtml += '<ul class = "col-3 itemIng">';
                ingredientHtml += '<li class="title">' + result[e].ingredient + '<hr>';
                ingredientHtml += '<ol class ="ingredientBox">';

            }

            ingredientHtml += '<li> ' + result[e].qty;
            ingredientHtml += '<form class="deleteDb">';
            ingredientHtml += '<input type="hidden" class = "deleteFromDB" value=' + result[e]._id + ">";

            ingredientHtml += '<button class ="deleteButton button"type= "submit">';
            ingredientHtml += '<i class="fa fa-trash" aria-hidden="true"></i> ';
            ingredientHtml += '</button>  ';
            ingredientHtml += '</form> ';
            ingredientHtml += '</li> ';
            let a = e;
            a++;
            if (a < result.length) {
                resultconvert = result[a].ingredient;
                resultLower = resultconvert.toLowerCase();
            }

            console.log(currentIngredient, oldIngredient);
            if (currentIngredient !== resultLower) {
                //console.log('!', currentIngredient, oldIngredient);
                //console.log('!', currentIngredient, oldIngredient);
                ingredientHtml += '</ol></li></ul>';

            }
            oldIngredient = currentIngredient;




        }
        $('#list1').html(ingredientHtml);
    }
    //console.log('aggregate', aggregateList);
    //build output
};

function buildFinalList(result) {
    console.log(result);
    let aggregateList = [];
    let aggregateLower = '';
    let currentIngredient = '';
    let oldIngredient = '';
    let ingredientHtml = '';
    for (let e = 0; e < result.length; e++) {
        if (result[e].ingredient !== undefined) {
            var resultconvert = result[e].ingredient;
            //console.log(resultconvert);
            var resultLower = resultconvert.toLowerCase();
            currentIngredient = resultLower;

            if (currentIngredient !== oldIngredient) {
                ingredientHtml += '<ul class = "col-3 itemIng">';
                ingredientHtml += '<li class ="title">' + result[e].ingredient + '<hr>';
                ingredientHtml += '<ol class ="ingredientBox">';

            }

            ingredientHtml += '<li> ' + result[e].qty;
            ingredientHtml += '<form class="deleteDb">';
            ingredientHtml += '<input type="hidden" class = "strike" value=' + result[e]._id + ">";

            ingredientHtml += '<button class ="crossOffList button" type="submit">';
            ingredientHtml += '<i class="fa fa-shopping-cart" aria-hidden="true"></i> ';
            ingredientHtml += '</button>  ';
            ingredientHtml += '</form> ';
            ingredientHtml += '</li> ';
            let a = e;
            a++;
            if (a < result.length) {
                resultconvert = result[a].ingredient;
                resultLower = resultconvert.toLowerCase();
            }

            console.log(currentIngredient, oldIngredient);
            if (currentIngredient !== resultLower) {
                console.log('!', currentIngredient, oldIngredient);
                //console.log('!', currentIngredient, oldIngredient);
                ingredientHtml += '</ol></li></ul>';

            }
            oldIngredient = currentIngredient;




        }
        $('#finalList').html(ingredientHtml);
    }
    //console.log('aggregate', aggregateList);
    //build output
};

function buildMenulist() {
    $.ajax({
            method: 'get',
            dataType: 'json',
            contentType: 'application/json',
            //data: JSON.stringify(recipeObject),
            url: '/retrieve-recipes/',
        })
        .done(function (result) {
            console.log(result);
            var menuHtml = '';
            for (let t = 0; t < result.length; t++) {
                var dayId = '#' + result[t].day;

                menuHtml += '<li>';

                menuHtml += '';
                menuHtml += '<a href="https://www.yummly.com/#recipe/' + result[t].id + '" target="_blank" alt="Link to Yummly Recipe" title="Link to Yummly Recipe">';
                menuHtml += result[t].name;
                menuHtml += '</a>';
                menuHtml += '</li>';
                $(dayId).append(menuHtml);
            }

            //$('#menu').html(menuHtml);

        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });

};

//STEP 2 - functions and objects usage



//Event handler for search button
$('#searchIcon').on('click', function () {
    let searchString = $('#searchTerm').val();
    let searchWeekDay = $('#recipeDay').val();
    //console.log(searchString);
    sendRecepiesSearch(searchString, searchWeekDay);

    if (toggleHidden) {
        toggleHidden = 0;
        $('#searchBoxReturn').toggleClass("hidden");
        $('#yLogo').toggleClass("hidden");
    }
});

//Event handler for select button on recipes
$(document).on('click', '.selectButton', function (event) {
    event.preventDefault();

    var recipeNameValue = $(this).parent().find('.storeToDbName').val();
    var recipeRatingValue = $(this).parent().find('.storeToDbRating').val();
    var recipeCourseValue = $(this).parent().find('.storeToDbCourse').val();
    var recipeIdValue = $(this).parent().find('.storeToDbId').val();
    //var recipeDayValue = $(this).parent().find('.storeToDay').val();
    var recipeDayValue = $('#recipeDay').val();
    var recipeStoreToShortList = $(this).parent().find('.storeToShortList').val();

    var recipeObject = {
        'name': recipeNameValue,
        'rating': recipeRatingValue,
        'course': recipeCourseValue,
        'id': recipeIdValue,
        'day': recipeDayValue,
        'shortList': recipeStoreToShortList,

    };
    //console.log(recipeObject);
    $.ajax({
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(recipeObject),
            url: '/add-recipe-db/',
        })
        .done(function (result) {

            addToMenu(recipeObject.name, recipeObject.id);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});

$(document).on('click', '.deleteButton', function (event) {
    event.preventDefault();
    $(this).closest('li').hide();

    var idValue = $(this).parent().find('.deleteFromDB').val();

    //console.log(deleteObject);

    console.log(idValue);
    $.ajax({
            method: 'DELETE',
            dataType: 'json',
            contentType: 'application/json',

            url: '/delete/' + idValue,
        })
        .done(function (result) {


        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});
$(document).on('click', '.crossOffList', function (event) {
    event.preventDefault();
    $(this).closest('li').toggleClass('stroked');


});
$(document).on('click', '#dumpDb', function (event) {
    event.preventDefault();


    let killObj = {
        id: 'killAll'
    }

    $.ajax({
            method: 'DELETE',
            dataType: 'json',
            contentType: 'application/json',

            url: '/deleterec/' + JSON.stringify(killObj),
        })
        .done(function (result) {


        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);

        });
    $.ajax({
            method: 'DELETE',
            dataType: 'json',
            contentType: 'application/json',

            url: '/deletering/' + JSON.stringify(killObj),
        })
        .done(function (result) {


        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);

        });
    window.location = "/";

});
