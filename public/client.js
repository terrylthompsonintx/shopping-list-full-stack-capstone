//STEP 1 - functions and objects definitions


const serverUrl = 'http://localhost:8080';

const getSearchData = {
    searchString: ''
}
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

function sendSearch(getSearchData, serverUrl) {
    $.ajax({
            type: "POST",
            url: serverUrl + '/search' + getSearchData,
            dataType: 'json',
        })
        .done(function (dataOutput) {


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
    getSearchData.searchString = $('#searchTerm').val();


    console.log(getSearchData.searchString);
    sendSearch();
});


/*$('deleteItem').click(function () {

});

$('itemInBasket').click(function () {

});*/
