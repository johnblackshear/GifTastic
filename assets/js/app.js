$(document).ready(function () {//I need jquery to run!
	var searchTerms = ['fox', 'cow', 'chicken', 'pig', 'lizard','cat'];

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
			+ "&q=" + term;

		$.ajax({
			method: "GET",
			url: queryURL,
		}).then(function (result) {
			console.log(result);
		});
	}

	gifQuery("cat");

	createButtonsFromArray(searchTerms);
});