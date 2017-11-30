var topics = ["Ariel", "Sleeping Beauty", "Cinderella"];


function renderButtons() {

    $(".buttons").empty();

    for (var i = 0; i < topics.length; i++) {

        var a = $("<button>");
        a.addClass("topic");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $(".buttons").append(a);
    }
}


function displayGifs() {

    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=VQTjfEornAFAcD73fDcuw7ubcsY82Dac&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {

        $("#pictures").empty();

        for (var i = 0; i < 10; i++) {

            var princessId = "princess" + i;
            var princessDiv = $("<div>").attr("id", princessId);
            $(princessDiv).addClass("float");
            $("#pictures").append(princessDiv);

            var rating = response.data[i].rating;
            var princessStill = response.data[i].images.fixed_height_small_still.url;

            var princessAnimated = response.data[i].images.fixed_height_small.url;

            var space = $("<br />");
            var imageId = "image" + i;
            var image = $("<img>").attr("id", imageId);
            $(image).addClass("image");
            $(image).attr("animate", "still");
            $(image).attr("src", princessStill);
            $(image).attr("linka", princessAnimated);
            $(image).attr("links", princessStill);
            $(princessDiv).append("Rating: " + rating);
            $(princessDiv).append(space);
            $(princessDiv).append(image);
        }


    });

}

$(document).on("click", ".image", function(event) {
        console.log(this);
        if ($(this).attr("animate") === "still") {
            $(this).attr("src", $(this).attr("linka"));
            $(this).attr("animate", "animate");
        } else {
            $(this).attr("src", $(this).attr("links"));
            $(this).attr("animate", "still");
        }
    });

$("#add-gif").on("click", function(event) {
    event.preventDefault();
    var gifNew = $("#gif-input").val().trim();
    topics.push(gifNew);
    renderButtons();
});

renderButtons();



$(document).on("click", ".topic", displayGifs);