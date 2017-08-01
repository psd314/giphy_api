var userInput;
var query;
var queryUrl;
var srcObj = [];
var currentUrl;
var enterKey;

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

	//disable 'Enter' key from submitting form
	$('input').on('keydown', function(event) {
   		enterKey = event.which;
   		if (enterKey === 13) {
	    	event.preventDefault();
	   	}
	});

	$('#addBtn').on("click", function(){
		if($.inArray($('#userInput').val().toLowerCase(), topics) === -1 ){
			userInput = $('#userInput').val().toLowerCase();
			topics.push(userInput);
			renderButtons();
		} else {
			alert("This button already exists")
		}
		$('#userInput').val("");
	});
	

	$('body').on("click", ".search", function(){
		query = $(this).text();
		queryUrl = "https://api.giphy.com/v1/gifs/search?q=";
		queryUrl += query;
		queryUrl += "&api_key=dff168cd8b1142919db6c3b0027da1e1&limit=10";

		$.ajax({
	      url: queryUrl,
	      method: 'GET'
	    }).done(function(response) {
	    	$('#display').empty();
	    	srcObj = [];
	    	for(var i = 0; i < response.data.length; i++){
	    		// build html to display gif
	    		// var blah = generate image w/ jquery
	    		//
	    		var gifHtml = "<figure class='gif'><img  src='" ;
	    		gifHtml += response.data[i].images.fixed_height_still.url;
	    		gifHtml += "'/><figcaption><strong>Rating - " + response.data[i].rating.toUpperCase();
	    		gifHtml += "</strong></figcaption></figure>";

	      		$('#display').append(gifHtml);
	      		// store still and gif in own object, put in srcObj[]
	    		srcObj.push(
	    			{
	    			"still" : response.data[i].images.fixed_height_still.url,
	    			"gif" : response.data[i].images.fixed_height.url
	    			}
	    		);
	    	}
	    	console.log(response);	
	    });
	});

	$('body').on("click", "img", function(){
		// compare index of parent to index in srcObj[] to toggle
		// still and gif on click
		if ( $(this).attr("src") === srcObj[$(this).parent().index()].still)
		{ 
			$(this).attr("src", srcObj[$(this).parent().index()].gif);
		} else {
			$(this).attr("src", srcObj[$(this).parent().index()].still);
		}	
	});
});