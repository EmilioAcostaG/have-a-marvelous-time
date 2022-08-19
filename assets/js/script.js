var modalButtonEl = $('#modal-button');
var citySearchBtn = $('#citySearchBtn');
var citySearchInput = $('#cities-autocomplete');
var city;
var changeCityBtn = $('#changeCity');
var characterListUl = $("#characterList");
var characters;

// These are used in Marvel.js, Characters.html, and Profile.html
var statusCode;
var backButton = $('.backButton');
var characterClicked;

// Get character info from Marvel
function getCharacter(index, name) {
  var characterUrl = "https://gateway.marvel.com/v1/public/characters?hash=123c5cd9dacf1026d9e68584ba178603&ts=1&name=" + name + "&apikey=96460a36ab9d0f7072c766f530b5fd05";
  //var characterUrl = "https://gateway.marvel.com/v1/public/characters?hash=46493b12f449dd19a8d6f3e9482602b8&ts=1&name=" + name + "&apikey=86db0495a9e60056ebd9ecda528d455d";
  //var characterUrl = "https://gateway.marvel.com/v1/public/characters?hash=cd848f8ac92b7b905f9458a597170538&ts=1&name=" + name + "&apikey=676a7bbdec4d02d26007d6b7870d0d04";
  return fetch(characterUrl)
  .then((characterResponse) => {
      return characterResponse.json();
  })
  .then((characterResponse) => {
      characters[index]['comics'] = characterResponse.data.results[0].comics.available;
      characters[index]['description'] = characterResponse.data.results[0].description;
      var imageSrc = characterResponse.data.results[0].thumbnail.path + "." + characterResponse.data.results[0].thumbnail.extension;
      characters[index]['image'] = imageSrc;
      characterListUl.append("<li class='character' data-index=" + index + "><img src=" + imageSrc+" >"+"</li>");
  })
  .catch(error => console.log('error', error));
};

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

async function fetchCharactersAndDisplay() {
  await $.getJSON("./assets/json/characters.json", function(data) {
    characters = data;
    for (var i = 0; i < characters.length; i++) {
      getCharacter(i, characters[i].Character);
    }
  });
}

async function init() {
  $(".characters").css("visibility", "hidden");
  $(".landing-page").css("visibility", "hidden");
  $(".profile").css("visibility", "visible");
 // await fetchCharactersAndDisplay();
  console.log(characters);
}

citySearchBtn.on('click', function() {
  city = citySearchInput.val();
  citySearchInput.val('');

  changeCityBtn.html(city);

  $(".modal").removeClass("is-active");
  $(".characters").css("visibility", "visible");
  $(".landing-page").css("visibility", "hidden");
});

// TODO: we need to redo this function again
backButton.on('click', function() {
  console.log(city);
  window.location.replace("./characters.html");
})

changeCityBtn.on('click', function() {
  $(".modal").addClass("is-active");
});

characterListUl.on("click", ".character", function(event) {
  var index = event.currentTarget.dataset.index;
  //localStorage.setItem("characterClicked", characterClicked);
  console.log(event.currentTarget.dataset.index);
  var characterInfoTopUl = $("#character-info-top");
  characterInfoTopUl.append("<li><h2 class='profileTitle'>" + characters[index].Character + "</h2></li>");

  $(".characters").css("visibility", "hidden");
  $(".landing-page").css("visibility", "hidden");
  $(".profile").css("visibility", "visible");
});


// Handle click function on character images
// $(".characterBox").click(function (event) {
//     console.log("click");
// });

// // Handle redirect to profile on click
// $(".characterBox").click(function (event) {
//     console.log(characterClicked);
// });

// Get clicked character onto Profile page
function getClickedCharacter(characterClicked) {
  characterClicked = localStorage.getItem("characterClicked");
  console.log("character:", characterClicked);
};

// Get character info from Characters.json
var favThing;
var favMeal;
var hobbies;
var somethingToEat;
var somethingToDo;
var readMore;
// var city = "{CITY}"

function getCharacterInfo(characterClicked) {
   console.log("character clicked", characterClicked);
    var characterInfoUrl = "./assets/json/characters.json";
    // console.log("Getting Characters");

    return fetch(characterInfoUrl)
    .then((characterInfoResponse) => {
        return characterInfoResponse.json();
    })
    .then((characterInfoResponse) => {
        console.log(characterInfoResponse);
        favThing = characterInfoResponse[3]["Character"];
        favMeal = characterInfoResponse[3]["Food"];
        hobbies = characterInfoResponse[3]["Hobby"];
        somethingToEat = characterInfoResponse[3]["Restaraunts"];
        somethingToDo = characterInfoResponse[3]["Place"];
        readMore = characterInfoResponse[3]["ReadMore"];
        // console.log(somethingToEat.join(', '));

        $(".city").html(city);
        $(".favThing").html(favThing);
        $(".favMeal").html(favMeal);
        $(".hobbies").html(hobbies.join(', '));
        $(".toEat").html(somethingToEat.join(', '));
        $(".toDo").html(somethingToDo.join(', '));
        $(".readMore").attr("href", readMore)
        $(".changeCityButton").click(function (event) {
            console.log("click");
        });
        

    })
    .catch(error => console.log('error', error));
      
}

init();