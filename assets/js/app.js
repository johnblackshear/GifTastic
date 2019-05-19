$(document).ready(function () {//I need jquery to run!
	var searchTerms = ['cat','dog','fox', 'cow', 'chicken', 'pig', 'lizard'];

	var createButton = function (name) {
		var button = $("<button class='btn btn-light'>");
		button.text(name);
		
		button.click(function () {
			gifQuery($(this).text());
		});

		$('.button-container').append(button);
	}

	var createButtonsFromArray = function () {
		for (var i = 0; i < searchTerms.length; i++) {
			createButton(searchTerms[i]);
		}
	}

	var gifQuery = function (term) {
		var apiKey = "vdJbozY65dSnXQCZUu0q59cvKTdKhVMF";
		var queryURL = "http://api.giphy.com/v1/gifs/search?apiKey="
			+ apiKey
			+ "&q=" + term + "&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET",
		}).then(function (response) {
			var results = response.data;
			for(var i = 0; i < results.length; i++){
			var animalDiv = $('<div>');
			var animalImage = $('<img>');
			animalImage.attr("src", results[i].images.fixed_height_still.url);
			animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("data-state", "still");
            animalImage.attr("class", "gif");
			var p = $("<p>").text("Rating: " + results[i].rating);
			//animalDiv.addclass(".animalDiv")
			animalDiv.append(p);
			animalDiv.append(animalImage);
			$('.library').prepend(animalDiv);
			}
			console.log(response);
		});
	}

		$('#select-animal').on("click",function(event){
			$(".button-container").empty();
			event.preventDefault();
			var animal = $('#animal-input').val().trim();
			searchTerms.push(animal);
			createButtonsFromArray();
		});

		$("body").on("click", ".gif", function () {
			console.log("click");
			var state = $(this).attr("data-state");
			if (state === "still") {
			  $(this).attr("src", $(this).attr("data-animate"));
			  $(this).attr("data-state", "animate");
			} else {
			  $(this).attr("src", $(this).attr("data-still"));
			  $(this).attr("data-state", "still");
			}

		});

	gifQuery("frenchie");

	createButtonsFromArray(searchTerms);
});