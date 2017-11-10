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

    //console.log(recipesFound);
    var buildHtml = '';
    $.each(dataOutput.matches,
        function (key, value) {
            buildHtml += '<ul class="col-3">';
            buildHtml += '<li>';
            buildHtml += value.recipeName;
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




$('#searchIcon').on('click', function () {
    let searchString = $('#searchTerm').val();
    let searchWeekDay = $('#recipeDay').val();



    console.log(searchString);
    sendRecepiesSearch(searchString, searchWeekDay);
});

$(document).on('click', '.selectButton', function (event) {
    event.preventDefault();
    $(this).toggleClass("highlight");
    console.log('buttonpush');

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
        'day': recipeDayValue
    };
    console.log(recipeObject);
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
