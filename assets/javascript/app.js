var userInput;
var query;
var queryUrl;
var enterKey;
var rating = "&rating=r";
var button;

var topics = [
		"honey badger",
		"lion",
		"sugar glider",
		"ferret",
		"dog",
		"cat"]

function renderButtons() {
	$('#buttons').empty();
	topics.forEach(function(val) {
		$('#buttons').append("<button type='button' class='search'>" + val + "</button>");
	});
}

$(document).ready(function() {
	renderButtons();

	// add new button
	$('#addBtn').on("click", function(e){
		e.preventDefault();
		if ($('#userInput').val().toLowerCase() === ""){
			alert("Please enter a search term");
		} else if ($.inArray($('#userInput').val().toLowerCase(), topics) === -1 ){
			userInput = $('#userInput').val().toLowerCase();
			topics.push(userInput);
			renderButtons();
		} else {
			alert("This button already exists");
		}
		$('#userInput').val("");	
	});

	//adjust rating for queryUrl
	$("input[type='radio']").change(function(){

		switch($(this).attr("value")) {
			case "y":
				rating = "&rating=y";
				break;
			case "g":
				rating = "&rating=g";
				break;
			case "pg":
				rating = "&rating=pg";
				break;
			case "pg13":
				rating = "&rating=pg13";
				break;
			case "r":
				rating = "&rating=r";
		}
	});
	

	$('body').on("click", ".search", function(){
		query = $(this).text();
		queryUrl = "https://api.giphy.com/v1/gifs/search?q=";
		queryUrl += query + rating;
		queryUrl += "&api_key=dff168cd8b1142919db6c3b0027da1e1&limit=10";

		$.ajax({
	      url: queryUrl,
	      method: 'GET'
	    }).done(function(response) {
	    	$('#display').empty();
	    	console.log(response);
	    	for(var i = 0; i < response.data.length; i++){
	    		// build html to display gif
	    		// var blah = generate image w/ jquery
	    		//
	    		var gifHtml = "<figure class='gif'><img  src='" ;
	    		gifHtml += response.data[i].images.fixed_height_still.url;
	    		gifHtml += "' data-state=\'still\' data-still=\'" + response.data[i].images.fixed_height_still.url + "' ";
	    		gifHtml += " data-animate='";
	    		gifHtml += response.data[i].images.fixed_height.url + "'/>";
	    		gifHtml += "<figcaption><strong>Rating - " + response.data[i].rating.toUpperCase();
	    		gifHtml += "</strong></figcaption></figure>";
	      		$('#display').append(gifHtml);
	      		console.log(gifHtml);
	    	}

	    	// original assignment functionality
	  //   	$('img').on("click", function(){
			// 	// compare index of parent to index in srcObj[] to toggle
			// 	// still and gif on click
			// 	if ( $(this).attr("data-state") === 'still')
			// 	{ 
			// 		$(this).attr("src", $(this).attr("data-animate"))
			// 			.attr("data-state", "animate");
			// 	} else {
			// 		$(this).attr("src", $(this).attr("data-still"))
			// 			.attr("data-state", "still");					
			// 	}	
			// });

			// Evan's hover bonus
			$( "img" ).hover(
		      function() {
		        $(this).attr('src', $(this).attr('data-animate'));
		      }, function() {
		        $(this).attr('src', $(this).attr('data-still'));
		      }
		    );	    	
	    });
	});
});