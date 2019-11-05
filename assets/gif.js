var gifSelect;
var cartArr=["Spongebob", "Family Guy", "Rugrats", "Teen Titans",  "American Dad"]
var userInput=$("#input-form").val().trim();


//to create buttons already in array
function renderButtons(){

  $("#buttons").empty();

  $.each(cartArr, function(i, val){

    var buttons= $("<button class='btnClick'>"+ cartArr[i]+"</button>");

    buttons.attr("data-name", cartArr[i])

    buttons.appendTo("#buttons");
  })
}


 //user adding buttons 
$("#input-btn").on("click", function(event){

  event.preventDefault();

  userInput=$("#input-form").val().trim();

  console.log(userInput);

  if(userInput !==""){
    cartArr.push(userInput);
  }
  console.log(cartArr);

  renderButtons();

  $("#input-form").val("");

});

renderButtons();

//click gif button and gis appear
$("#buttons").on("click", ".btnClick", function(event){

  var gifSelect= $(this).attr("data-name");

  console.log(gifSelect);

  $("#gifs").empty();

  var gifAPI="3eDaBXUjJfvyaSnSZueu1CqEJC5iZLdQ";
  var queryURL="http://api.giphy.com/v1/gifs/search?q="+gifSelect+ "&api_key="+gifAPI+ "&limit=10";
//call
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
      console.log(response)

      //to store data that will be used in variable
      var results=response.data;

      console.log(results);

      //looping through each result item
      for (let i = 0; i < results.length; i++) {
        
        //div for gifs
        var cartDiv= $("<div>");

        //variable to display rating from results
        var p = $("<p>").text("Rating: " + results[i].rating);

        //img tag
        var cartImg= $("<img>").addClass("gif");

        //still gif
        var stillGif= results[i].images.fixed_height_still.url;

        //animated gif
        var animGif=results[i].images.fixed_height.url;

        //add still and animated attributes
        cartImg.attr("data-still",stillGif ).attr("data-animate", animGif);

        cartImg.attr("src", stillGif).attr("data-state", "still");

        // adding rating to cartDiv
        cartDiv.append(p);
         
        //adding gifs to cartDiv
        cartDiv.append(cartImg);

        //adding cartDiv to gifs on the html
        $("#gifs").prepend(cartDiv);
        
      }
    });

  });

    //animate gifs
    $("#gifs").on("click", ".gif", function(event){
     
      event.preventDefault();

      var state=$(this).attr("data-state");

      if(state==="still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }

    });