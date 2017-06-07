

$(document).ready(function() {

	// Populating the list, just put a few things in there
	var topics = ["baseball", "football", "basketball", "good times"];
	var topic = $("#gif-input").val();
	// queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=10&api_key=dc6zaTOxFJmzC";	
	// They put this here in the movie app example, but it seems
	// to work fine without it

	var display = function(){
		topic = $(this).attr("data-name");
		//Honestly not 100% sure on why this needs to be here, but they do it in the
		//movie app and adding it made it work.  I mean I get what it does but don't
		//really know why we defined it to the input up top and redefined it to the data-name

		queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=10&api_key=dc6zaTOxFJmzC";	
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
		//Good ol fashioned AJAX thing

			$("#gif-view").empty();
			//empty the div when the user clicks on another category, otherwise it just
			//keeps appending the gifs to the bottom

		for(var i = 0; i < 10; i++){
			var still = response.data[i].images.downsized_still.url;
			var active = response.data[i].images.downsized_medium.url;
			var rating = response.data[i].rating;
			//Run the loop ten times for the ten images, though if you wanted to do it a user inputted
			//amount of times you could have them input the number, have i go to that number, then
			//replace the 10 in the queryURL with the inputted value.
			//downsized_still is the still image of the gif, _medium is the moving one that is the
			//same size as the still

			var gifDiv = $("<div>");
			gifDiv.attr("class", "gifDiv");
			$("#gif-view").append(gifDiv);
			$(gifDiv).append("<p>Rating: " + rating + "</p");
			$(gifDiv).append("<img class='gif' src='" + still + "'data-animate='" + active + "'data-still='" + still + "'>");
			//Created a new div and appended it to the one before it along with its rating and active
			//and still states

			$(document).on("click", ".gif", function(){
				//Pausing and restarting the gifs
				var state = $(this).attr("data-state");
				
				if(state == "still"){
					$(this).attr("src", $(this).attr("data-animate"));
					$(this).attr("data-state", "animate")
				}else if(state != "still"){
					$(this).attr("src", $(this).attr("data-still"));
					$(this).attr("data-state", "still")
				}
			});
		}
		});
	}
	var buttonGuy = function(){
		$("#buttons-view").empty();
		for(var i = 0; i < topics.length; i++){
			var button = $("<button>");
			button.addClass("button");
			button.attr("data-name", topics[i]);
			button.text(topics[i]);
			$("#buttons-view").append(button);
			//This guy creates the buttons for the preloaded topics and is called in the
			//gif adding function.  Tried to do bootstrap buttons but it hated it
			//so I gave up
		}
	}
	$("#add-gif").on("click", function(event){
		event.preventDefault();
		var newGif = $("#gif-input").val();
		topics.push(newGif);
		$("#gif-input").val("");
		buttonGuy();
		//adds the new gif categories
	});

	$(document).on("click", ".button", display);
	buttonGuy();
});