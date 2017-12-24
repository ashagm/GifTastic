var marvelCharacters = 
['superman', 'batman', 'spiderman', 'ironman', 'antman', 'thor', 'daredevil', 'hulk'];

$(document).ready(function(){

	$("#button-holder").empty();
	renderButtons();

	$('#add-btn').click(function(event){
		event.preventDefault();
		var addBtnVal = $('#search-gif').val().trim();
		marvelCharacters.push(addBtnVal);
		$('#search-gif').val("");
		$("#button-holder").empty();
		renderButtons();
		renderGifs(addBtnVal);
	});

});


function renderButtons() {
    for (var index = 0; index < marvelCharacters.length; index++) {
        var newButton = $("<button>");
        newButton.addClass("btn");
        newButton.addClass("marvel_btn");
        newButton.attr("data-name", marvelCharacters[index]);
        newButton.text(marvelCharacters[index]);
        $("#button-holder").append(newButton);
    }

    $('.marvel_btn').click(function(){
		var data = $(this).attr('data-name');
		console.log("Clicked button with data.." + data)
		data = data.replace(" ", '+');
		renderGifs(data);
	});
}

function renderGifs(searchData){
	var api_key = "dc6zaTOxFJmzC";
	var limit = 9;
	// console.log(searchData);
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchData + "&api_key=" + api_key +
	"&limit=" + limit;  

	// console.log(queryURL);

	$.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
    	console.log(response);
    	var results = response.data;
    	
    	$("#gif-holder").empty();

    	 for (var i = 0; i < results.length; i++) {
            
            var gifDiv = $("<div class='gif-div'>");
            var rating = results[i].rating.toUpperCase();
            var stillGif = results[i].images.fixed_height_still.url;
            var animatedGif = results[i].images.fixed_height.url;

            var p = $("<p class='gif-rating'>").text(rating);

            var charImage = $("<img class='gif-img'>");
            charImage.attr('data-gifnum', i);
            charImage.attr("data-still-" + i, stillGif);
            charImage.attr("data-anime-" + i, animatedGif);
            charImage.attr("data-toggle-" + i, 'OFF');
            charImage.attr("src" , stillGif);

            gifDiv.append(p);           
            gifDiv.append(charImage);

            $("#gif-holder").prepend(gifDiv);
          }


		$('.gif-div img').click(function(){
			var gif_num = $(this).data('gifnum');
			var gif_anim = $(this).data('anime-' + gif_num);
			var gif_still = $(this).data('still-' + gif_num);
			var gif_toggle = $(this).data('toggle-' + gif_num);

			if(gif_toggle === "OFF"){
				$(this).attr('src', gif_anim);	
				$(this).data('toggle-' + gif_num, 'ON');
			}else if(gif_toggle === "ON"){
				$(this).attr('src', gif_still);	
				$(this).data('toggle-' + gif_num, 'OFF');
			}	 

		});

    });


}

