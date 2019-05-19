$(document).ready(function () {//I need jquery to run!
	var searchTerms = ['fox', 'cow', 'chicken', 'pig', 'lizard'];

	var createButton = function (name) {
		var button = $('<button>');
		button.text(name);
		
		button.click(function () {
			gifQuery($(this).text());
		});

		$('.button-container').append(button);
	}

	var createButtonsFromArray = function (arr) {
		for (var i = 0; i < arr.length; i++) {
			createButton(arr[i]);
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
			var p = $("<p>").text("Rating: " + results[i].rating);
			animalDiv.append(p);
			animalDiv.append(animalImage);
			$('.library').prepend(animalDiv);
			}
			console.log(response);
		});
	}

		$('#select-animal').on("click",function(event){
			event.preventDefault();
			var animal = $('#animal-input').val().trim();
			searchTerms.push(animal);
			createButtonsFromArray();

			
		});
	gifQuery("cat");

	createButtonsFromArray(searchTerms);
});