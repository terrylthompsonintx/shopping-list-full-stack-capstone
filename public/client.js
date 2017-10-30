const yummlyKey = '971c769d4bab882dc3281f0dc6131324';
const appId = '35372e2c';
const yummlyEndPoint = 'http://api.yummly.com/v1';
const yummlyRecipe = 'http://api.yummly.com/v1/api/recipes?'
var searchTermYummly = 'test';

/*$('#search').hide();
$('#assign').hide();
$('#ingredient1').hide();
$('#ingredient2').hide();
$('#menu').hide();*/

function callYummly(searchTermYummly) {
    var query = yummlyRecipe + '_app_id=' + appId + '&_app_key=' + yummlyKey + '&' + searchTermYummly;
    console.log(query);
    //$.getJSON(youTubeSearchApiUrl, query, recipelist);
};

//function recipelist();

$('#continueButton').click(function () {
    $('#intro').hide();
    $('#search').show();
})

$('#searchIcon').click(function () {
    searchTermYummly = $('#searchTerm').val();
    document.getElementById("searchTerm").value = "";
    callYummly(searchTermYummly);

})
