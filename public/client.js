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


const recipeItem = {
    name: '',
    url: '',
    rating: '',
    cuisine: '',
    course: '',
    day: '',
    ingredeintS: []

}

function sendRecepiesSearch(getSearchData) {
    $.ajax({
            type: "GET",
            url: '/search-recipes/' + getSearchData,
            dataType: 'json',
        })
        .done(function (dataOutput) {
            console.log(dataOutput);

        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
};

function buildRecipeList() {

};

function buildShoppingList() {
    //accepts array of ingredients
};

function buildMenulist() {
    //accepts array of links and builds links
};

//STEP 2 - functions and objects usage




$('#searchIcon').click(function () {
    let searchString = $('#searchTerm').val();

    console.log(searchString);
    sendRecepiesSearch(searchString);
});


/*$('deleteItem').click(function () {

});

$('itemInBasket').click(function () {

});*/
