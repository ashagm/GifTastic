$(document).ready(function(){

const marvelCharactersArr = 
['superman', 'batman', 'spiderman', 'ironman', 'antman', 'thor', 'daredevil', 'hulk'];

const API_KEY = "dc6zaTOxFJmzC";
const limitResults = 9;

renderButtons();

$(".btn-marvel").click(function(){
	callAPI($(this).data('name'));
});

function renderButtons(){
	$.each( marvelCharactersArr, function( index, value ){
    	let newBtn = $("<button>");
    	newBtn.addClass("btn btn-marvel").attr("data-name", value).text(value);
    	$("#button-holder").append(newBtn);
	});
}

function callAPI(charName){

	var queryURL = "https://api.giphy.com/v1/gifs/search?";
	queryURL += 
		$.param({
  			'api_key': API_KEY,
  			'q': charName,
  			'limit': limitResults
		});

	// console.log(queryURL);

	$.ajax({
		url : queryURL,
		method : 'GET'
	}).done(function(giphyResponse){
		// console.log("Response ", giphyResponse);
		renderGifs(giphyResponse);

	}).fail(function(err){
		throw err;
	});

}

function renderGifs(giphyResponse){

	$("#gif-holder").empty();

	let responseArr = giphyResponse.data;

	$.each( responseArr, function( index, el ) {

		let gifDiv = $("<div>").addClass("div-gif");

		let charImage = $("<img class='img-gif'>");
		charImage.attr('src', el.images.fixed_height_still.url);
		charImage.attr('data-gifnum', index);
		charImage.attr('data-still-' + index, el.images.fixed_height_still.url);
		charImage.attr('data-anime-' + index, el.images.fixed_height.url);
		charImage.attr('data-state', 'still');

		gifDiv.append(charImage);
		gifDiv.append($("<p class='gif-rating'>").text(el.rating.toUpperCase()));

		$("#gif-holder").append(gifDiv);
	});

	$('.div-gif img').on('click', function(){
	
		let state = $(this).attr('data-state');
		let gifNum = $(this).data('gifnum');

		if(state == "still"){
			$(this).attr('src', $(this).data('anime-' + gifNum));
			$(this).attr('data-state', 'animate');
		}else if(state == "animate"){
			$(this).attr('src', $(this).data('still-' + gifNum));
			$(this).attr('data-state', 'still');
		}

	});
}

});

