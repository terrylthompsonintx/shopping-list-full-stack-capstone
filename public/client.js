//STEP 1 - functions and objects definitions




const menuLink = {
    day: '',
    url: ''
};

const ingredient = {
    name: '',
    qty: '',
    inBasket: 0,
    inPantry: 0
};



function buildRecipeList(dataOutput, searchWeekDay) {

    //console.log(dataOutput);
    var buildHtml = '';
    $.each(dataOutput.matches,
        function (key, value) {
            buildHtml += '<ul class="col-3">';
            buildHtml += '<li>';
            buildHtml += value.recipeName;
            buildHtml += ' <a href="https://www.yummly.com/#recipe/' + value.id + '" target="_blank" alt="Link to Yummly Recipe" title="Link to Yummly Recipe">';
            buildHtml += '<i class="fa fa-info-circle" aria-hidden="true"></i>';
            buildHtml += '</a>';
            buildHtml += '</li>';
            buildHtml += '<li>';
            buildHtml += 'Rating: ' + value.rating;
            buildHtml += '</li>';
            buildHtml += '<li>';
            buildHtml += 'Course: ' + value.attributes.course[0];
            buildHtml += '</li>';
            buildHtml += '<li>';
            buildHtml += value.id;
            buildHtml += '</li>';
            buildHtml += '<li>';

            buildHtml += '<ol class="ingredientBox">'
            $.each(value.ingredients, function (subkey, subvalue) {

                buildHtml += '<li>';
                buildHtml += subvalue;
                buildHtml += '</li>';

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

            //buildHtml += '<button class="previewButton" >Preview Recipe</button>';

            buildHtml += "</form>";
            buildHtml += "<form class='storeToDb'>";
            buildHtml += "<input type='hidden' class='storeToDbName' value='" + value.recipeName + "'>";
            buildHtml += "<input type='hidden' class='storeToDbRating' value='" + value.rating + "'>";
            buildHtml += "<input type='hidden' class='storeToDbCourse' value='" + value.attributes.course + "'>";
            buildHtml += "<input type='hidden' class='storeToDbId' value='" + value.id + "'>";
            buildHtml += "<input type='hidden' class='storeToDay' value='" + searchWeekDay + "'>";

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

function buildShoppingList() {
    //accepts array of ingredients
};

function buildMenulist() {
    //accepts array of links and builds links
};

//STEP 2 - functions and objects usage



//Event handler for search button
$('#searchIcon').on('click', function () {
    let searchString = $('#searchTerm').val();
    let searchWeekDay = $('#recipeDay').val();
    console.log(searchString);
    sendRecepiesSearch(searchString, searchWeekDay);
});

//Event handler for select button on recipes
$(document).on('click', '.selectButton', function (event) {
    event.preventDefault();
    $(this).toggleClass("highlight");
    //console.log('buttonpush');

    /* buildHtml += "<form class='storeToDb'>";
     buildHtml += "<input type='hidden' class='storeToDbName' value='" + value.recipeName + "'>";
     buildHtml += "<input type='hidden' class='storeToDbRating' value='" + value.rating + "'>";
     buildHtml += "<input type='hidden' class='storeToDbCourse' value='" + value.attributes.course + "'>";
     buildHtml += "<input type='hidden' class='storeToDbId' value='" + value.id + "'>";
     buildHtml += '<button class="selectButton" >Select Recipe</button>';

     buildHtml += "</form>";*/

    var recipeNameValue = $(this).parent().find('.storeToDbName').val();
    var recipeRatingValue = $(this).parent().find('.storeToDbRating').val();
    var recipeCourseValue = $(this).parent().find('.storeToDbCourse').val();
    var recipeIdValue = $(this).parent().find('.storeToDbId').val();
    var recipeDayValue = $(this).parent().find('.storeToDay').val();

    var recipeObject = {
        'name': recipeNameValue,
        'rating': recipeRatingValue,
        'course': recipeCourseValue,
        'id': recipeIdValue,
        'day': recipeDayValue,

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

            populateFavoritesContainer();
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});

//Event handler for preview button
/*$(document).on('click', '.previewButton', function (event) {
    event.preventDefault();
    console.log('previewbutton pushed');

    var precipeIdValue = $(this).parent().find('.storeToDbId').val();

    console.log(precipeIdValue);
    $.ajax({
            type: "GET",
            url: '/get-recipe/' + precipeIdValue,
            dataType: 'json',
        })
        .done(function (result) {
      })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});*/
