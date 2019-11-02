// gif=$(this).attr("data-name")
var cartArr=["Spongebob", "Family Guy", "Rugrats", "Teen Titans",  "American Dad"]
var gif="grinch";
var gifAPI="3eDaBXUjJfvyaSnSZueu1CqEJC5iZLdQ";
var queryURL="http://api.giphy.com/v1/gifs/search?q="+gif+ "&api_key="+gifAPI+ "&limit=10";

function renderButtons(){

  $("#buttons").empty();

  $.each(cartArr, function(i, val){

    var buttons= $("<button>"+ cartArr[i]+"</button>");

    buttons.appendTo("#buttons");
  })
}

  
$("#input-btn").on("click", function(event){

  event.preventDefault();

  var userInput=$("#input-form").val();

  console.log(userInput);

  if(userInput !==""){
    cartArr.push(userInput);
  }
  console.log(cartArr);

  renderButtons();

  $("#input-form").val("");

});

renderButtons();

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
      console.log(response)
    })