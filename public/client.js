//STEP 1 - functions and objects definitions
const yummlyKey = '971c769d4bab882dc3281f0dc6131324';
const appId = '35372e2c';
const yummlyEndPoint = 'http://api.yummly.com/v1';
const yummlyRecipe = 'http://api.yummly.com/v1/api/recipes?'
var searchTermYummly = 'test';



function callYummly(searchTermYummly) {
    var query = yummlyRecipe + '_app_id=' + appId + '&_app_key=' + yummlyKey + '&' + searchTermYummly;
    console.log(query);
    //$.getJSON(youTubeSearchApiUrl, query, recipelist);
};

//function recipelist();

//STEP 2 - functions and objects usage

$('#continueButton').click(function () {

})

$('#searchIcon').click(function () {
    searchTermYummly = $('#searchTerm').val();
    document.getElementById("searchTerm").value = "";
    callYummly(searchTermYummly);

})
