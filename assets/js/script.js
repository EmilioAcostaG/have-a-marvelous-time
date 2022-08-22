// set-up Marvel API key and Google API key
  // hash=123c5cd9dacf1026d9e68584ba178603    ts=1     apikey=96460a36ab9d0f7072c766f530b5fd05
  // hash=46493b12f449dd19a8d6f3e9482602b8    ts=1     apikey=86db0495a9e60056ebd9ecda528d455d
  // hash=cd848f8ac92b7b905f9458a597170538    ts=1     apikey=676a7bbdec4d02d26007d6b7870d0d04
  // hash=8fcbd9bf77cf9efd8d8cc44a1bbc3e2f    ts=1     apikey=dcd1861001a655a97dc302bedd1f6d4c
  // hash=439ddf271a1f358eed9f21bf2249972c    ts=1     apikey=3c37cf13d1db8abf8d34abee82ce9308
var marvelAPItimestamp = 1;
var marvelAPIhash = "439ddf271a1f358eed9f21bf2249972c";
var marvelAPIpublickey = "3c37cf13d1db8abf8d34abee82ce9308";

var googleAPIkey = "AIzaSyDIAS6wopAuJKcmpYxEYnHXuXriBwMuew0";
/*-------------------------------------------------*/

// Variables for global accessing
var characters;
var city;

// When first loading index main page
async function init() {
  city = "";
  $(".landing-page").css("display", "block");
  $(".characters").css("display", "none");
  $(".profile").css("display", "none");
  await fetchCharactersJSON();
}
init();

/** GOOGLE MAPS API  **/
// Auto Fill the city search input using Google Map API
function autoFilling() {
  // using vanilla javascript for elements due to google maps api requirements
  var input = document.getElementById("cities-autocomplete");
  var autocomplete = new google.maps.places.Autocomplete(input);
}

//  Reload the map iframe using Google Map API
var profileMap = $("#profileMap");
function reloadGoogleMapIframe(aPlace) {
  profileMap.html("");
  profileMap.append("<iframe class='resp-iframe' width='600' height='450' style='border:0' loading='lazy' allowfullscreen src='https://www.google.com/maps/embed/v1/search?q="+ aPlace +"%20near%20"+ city +"&key="+ googleAPIkey +"'></iframe>");
}

// Handle the click event on toDo List
var toDoCharacterInfo = $("#toDo-character-info");
toDoCharacterInfo.on("click", ".toDoSearch", function(event) {
  event.preventDefault();
  var place = event.target.innerHTML;
  reloadGoogleMapIframe(place);
});

// Handle the click event on toEat List
var toEatCharacterInfo = $("#toEat-character-info");
toEatCharacterInfo.on("click", ".toEatSearch", function(event) {
  event.preventDefault();
  var place = event.target.innerHTML;
  reloadGoogleMapIframe(place);
});

/** MARVEL API **/
var characterListUl = $("#characterList");

// Fetching characters by its name from Marvel API and display in characters pages
function fetchCharactersMarvelAPI(index, name) {
    var characterUrl = "https://gateway.marvel.com/v1/public/characters?hash="+ marvelAPIhash +"&ts="+ marvelAPItimestamp +"&name=" + name + "&apikey="+ marvelAPIpublickey;

  return fetch(characterUrl)
  .then((characterResponse) => {
      return characterResponse.json();
  })
  .then((characterResponse) => {
      characters[index]['comics'] = characterResponse.data.results[0].comics.available;
      characters[index]['description'] = characterResponse.data.results[0].description;
      var imageSrc = characterResponse.data.results[0].thumbnail.path + "." + characterResponse.data.results[0].thumbnail.extension;
      characters[index]['image'] = imageSrc;
      // this is to not only show characters by image but also its name through tooltip
      characterListUl.append("<li class='character tooltip' data-index=" + index + "><img src=" + imageSrc + " >" + "<span class='tooltiptext'>" + name.toUpperCase() + "</span></li>");
  })
  .catch(error => console.log('error', error));
};

// Fetching all characters from local Characters JSON
// Add more character info with images from Marvel API
// to save in characters (variable)
async function fetchCharactersJSON() {
  await $.getJSON("./assets/json/characters.json", function(data) {
    characters = data;
    for (var i = 0; i < characters.length; i++) {
      fetchCharactersMarvelAPI(i, characters[i].character);
    }
  });
}

// Handle change city button (1) click event in characters page
var changeCityBtn1 = $('#changeCity-1');
changeCityBtn1.on('click', function() {
  loadingCitySearchModal();
});

// Handle change city button (2) click event in profile page
var changeCityBtn2 = $('#changeCity-2');
changeCityBtn2.on('click', function() {
  loadingCitySearchModal();
});

// Handle openning click event for city search modal 
var modalOpenningButton = $('#modal-button');
modalOpenningButton.on('click', function() {
  loadingCitySearchModal();
});

// Handle closing click event for city search modal
var modalClosingButton = $(".modal-close");
modalClosingButton.on('click', function() {
  $(".modal").removeClass("is-active");
});

// Handle back button click event from profile
var backButton = $('.backButton');
backButton.on('click', function() {
  $(".characters").css("display", "block");
  $(".landing-page").css("display", "none");
  $(".profile").css("display", "none");
})

var citySearchHistoryUl = $('#citySearchHistory');
// Loading cities search history from Local Storage
function loadingCitySearchModal() {
  citySearchHistoryUl.html("");
  var cityList = JSON.parse(localStorage.getItem("cities"));
  if (cityList != null) {
    cityList.forEach(aCity => {
      citySearchHistoryUl.append("<a href=''><li class='aCitySearched'>"+ aCity +"</li></a>");
    });
  }
  $(".modal").addClass("is-active");
}

// Handle the city searched history ul click event
citySearchHistoryUl.on("click", ".aCitySearched", function(event) {
  event.preventDefault();
  var checkedCity = event.target.innerHTML;
  citySearchHandler(checkedCity);
});

// Handle city search submit button from the modal
var citySearchSubmitBtn = $('#citySearchBtn');
citySearchSubmitBtn.on('click', function() {
  citySearchHandler("");
});

var citySearchInput = $('#cities-autocomplete');
// City search validation handler
function citySearchHandler(checkedCity) {
  $("#modalFooterP").html("");
  if (checkedCity=="") {
    checkedCity = citySearchInput.val();
    checkedCity = checkedCity.slice(0,-5);
    citySearchInput.val('');
  }

  // Check whether there is a city searched or not
  // Depending on where page location is, decide which page to go next
  if (city == "") {
    var citySearched = checkedCity;
    if (!citySearched || citySearched == null) {
      $("#modalFooterP").html("Please Input A City In The USA<br>");
      return;
    };
    city = citySearched.toUpperCase();
    changeCityBtn1.html(city);
    changeCityBtn2.html(city);
    $(".characters").css("display", "block");
    $(".landing-page").css("display", "none");
    $(".profile").css("display", "none");
  } else {
    var citySearched = checkedCity;
    if (!citySearched || citySearched == null) {
      $("#modalFooterP").html("Please Input A City In The USA");
      return;
    };
    city = citySearched.toUpperCase();
    changeCityBtn1.html(city);
    changeCityBtn2.html(city);
  };

  // Check whether city exists in local storage or not
  // Save to local storage if not existed
  var cityList = JSON.parse(localStorage.getItem("cities"));
  if (cityList != null) {
    var check = false;
    cityList.forEach(aCity => {   
      if (aCity == city) check = true;
    });
    if (check == false) cityList.push(city);
  } else {
    cityList = [city];
  }
  localStorage.setItem("cities", JSON.stringify(cityList));

  // Displaying parks in the map iframe by default
  var place = "park";
  var profileMap = $("#profileMap");
  profileMap.html("");
  profileMap.append("<iframe class='resp-iframe' width='600' height='450' style='border:0' loading='lazy' allowfullscreen src='https://www.google.com/maps/embed/v1/search?q="+ place +"%20near%20"+ city +"&key="+ googleAPIkey +"'></iframe>");

  $(".modal").removeClass("is-active");
  $("nav").css("display", "block");
}

// Handle click event on character pictures list 
// Diplay the character info to profile page
// Move to profile page
characterListUl.on("click", ".character", function(event) {
  var index = event.currentTarget.dataset.index;
  var characterInfoTopUl = $("#character-info-top");
  characterInfoTopUl.html("");
  characterInfoTopUl.append("<li><h2 class='profileTitle'>" + characters[index].character.toUpperCase() + "</h2></li>");
  if (characters[index].description) {
  characterInfoTopUl.append("<li class='characterDescription'>" + characters[index].description + "</li>")
  } else {
    characterInfoTopUl.append("<li class='characterDescription'>" + "More information below!" + "</li>")
  };
  characterInfoTopUl.append("<li><a class='readMore' href="+ characters[index].readMore +" target='_blank'>Read More</a></li>")
  characterInfoTopUl.append("<hr>");
  characterInfoTopUl.append("<li><strong class='characterDescriptionSub'># OF COMICS:</strong> <span class='numComics'>" + characters[index].comics + "</span></li>");
  characterInfoTopUl.append("<li><strong class='characterDescriptionSub'>FAVORITE THING TO DO:</strong> <span class='favThing'>"+ characters[index].favThing +"</span></li>");
  characterInfoTopUl.append("<li><strong class='characterDescriptionSub'>FAVORITE MEAL:</strong> <span class='favMeal'>"+ characters[index].favMeal +"</span></li>");
  characterInfoTopUl.append("<li><strong class='characterDescriptionSub'>HOBBIES:</strong> <span class='hobbies'>"+ characters[index].hobbies +"</span></li>");
  var profileImage = $('#profileImage');
  profileImage.attr("src", characters[index].image);
  
  var cityCharacterInfo = $("#city-character-info");
  cityCharacterInfo.html(city.toUpperCase());

  var toDoCharacterInfo = $("#toDo-character-info");
  toDoCharacterInfo.html("");
  characters[index].toDo.forEach(aDoing => {
    toDoCharacterInfo.append("<li class='toDoSearch'><a href=''>"+ aDoing +"</a></li>");
  });
  var toEatCharacterInfo = $("#toEat-character-info");
  toEatCharacterInfo.html("");
  characters[index].toEat.forEach(aEating => {
    toEatCharacterInfo.append("<li class='toEatSearch'><a href=''>"+ aEating +"</a></li>");
  });
  
  $(".characters").css("display", "none");
  $(".landing-page").css("display", "none");
  $(".profile").css("display", "block");
});