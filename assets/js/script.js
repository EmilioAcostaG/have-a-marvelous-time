var modalButtonEl = $('#modal-button');
var citySearchBtn = $('#citySearchBtn');
var citySearchInput = $('#cities-autocomplete');
var changeCityBtn = $('#changeCity');
var characterListUl = $("#characterList");

// These are used in Marvel.js, Characters.html, and Profile.html
var statusCode;
var characterName = "thor";
var numComics;
var characterDescription;
var profileImage;
// console.log("image url", profileImage);

// Get character info from Marvel
function getCharacter() {
  var characterUrl = "https://gateway.marvel.com/v1/public/characters?hash=5ad57e2950ad170a8c45b38ddb6b3b01&ts=string&name=" + characterName + "&apikey=72b7c45c60389c825df0845f4afd3c85";

  return fetch(characterUrl)
  .then((characterResponse) => {
      return characterResponse.json();
  })
  .then((characterResponse) => {
      // var code = characterResponse.code;
      characterName = characterResponse.data.results[0].name;
      numComics = characterResponse.data.results[0].comics.available;
      characterDescription = characterResponse.data.results[0].description;
      profileImage = characterResponse.data.results[0].thumbnail.path + "." + characterResponse.data.results[0].thumbnail.extension;
      console.log(profileImage);

      // console.log("Code:", statusCode);
      // console.log("Name:", characterName);
      // console.log("#Comics:", numComics);
      // console.log("Desc:", characterDescription);
      $(document).ready(function(){
          // $(".thor").css("background-image", "url(" + profileImage + ")");
          $(".thor").attr("src", profileImage);
          // console.log($(".profileImage").css("background-image", "url(" + profileImage + ")"));
          $(".profileTitle").html(characterName.toUpperCase());
          $(".characterDescription").html("characterDescription");
          $(".numComics").html(numComics);
      });
  })
  .catch(error => console.log('error', error));
} 
getCharacter();

function autoFilling() {
    var input = document.getElementById("cities-autocomplete");
    var autocomplete = new google.maps.places.Autocomplete(input);
}

modalButtonEl.on('click', function() {
  $(".modal").addClass("is-active");
});

$(".modal-close").click(function() {
  $(".modal").removeClass("is-active");
});

function fetchCharactersAndDisplay() {
  $.getJSON("./assets/json/characters.json", function(data) {
    console.log(data);
    data.forEach(element => {
      characterListUl.append("<li class='character'>"+element.Character+"</li>");
    });
  });
}

citySearchBtn.on('click', function() {
  var city = citySearchInput.val();
  citySearchInput.val('');

  changeCityBtn.html(city);

  $(".modal").removeClass("is-active");
  $(".characters").css("visibility", "visible");
  $(".landing-page").css("visibility", "hidden");
});


changeCityBtn.on('click', function() {
    $(".modal").addClass("is-active");
  });

$("#changeCity").click(function () {
    $(".modal").addClass("is-active");
});

characterListUl.on("click", ".character", function() {
    console.log("clicked");
});

fetchCharactersAndDisplay();