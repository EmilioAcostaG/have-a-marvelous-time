var modalButtonEl = $('#modal-button');
var citySearchBtn = $('#citySearchBtn');
var citySearchInput = $('#cities-autocomplete');
var city;
var changeCityBtn1 = $('#changeCity-1');
var changeCityBtn2 = $('#changeCity-2');
var characterListUl = $("#characterList");
var characters;

// These are used in Marvel.js, Characters.html, and Profile.html
var statusCode;
var backButton = $('.backButton');
var characterClicked;

// Get character info from Marvel
function getCharacter(index, name) {
  // var characterUrl = "https://gateway.marvel.com/v1/public/characters?hash=123c5cd9dacf1026d9e68584ba178603&ts=1&name=" + name + "&apikey=96460a36ab9d0f7072c766f530b5fd05";
  // var characterUrl = "https://gateway.marvel.com/v1/public/characters?hash=46493b12f449dd19a8d6f3e9482602b8&ts=1&name=" + name + "&apikey=86db0495a9e60056ebd9ecda528d455d";
  // var characterUrl = "https://gateway.marvel.com/v1/public/characters?hash=cd848f8ac92b7b905f9458a597170538&ts=1&name=" + name + "&apikey=676a7bbdec4d02d26007d6b7870d0d04";
    var characterUrl = "https://gateway.marvel.com/v1/public/characters?hash=8fcbd9bf77cf9efd8d8cc44a1bbc3e2f&ts=1&name=" + name + "&apikey=dcd1861001a655a97dc302bedd1f6d4c";

  // Pass current characterURL into fetch
  return fetch(characterUrl)
  .then((characterResponse) => {
      return characterResponse.json();
  })
  // Take response and pull specific data points
  .then((characterResponse) => {
      characters[index]['comics'] = characterResponse.data.results[0].comics.available;
      characters[index]['description'] = characterResponse.data.results[0].description;
      var imageSrc = characterResponse.data.results[0].thumbnail.path + "." + characterResponse.data.results[0].thumbnail.extension;
      characters[index]['image'] = imageSrc;
      characterListUl.append("<li class='character tooltip' data-index=" + index + "><img src=" + imageSrc + " >" + "<span class='tooltiptext'>" + name.toUpperCase() + "</span></li>");
  })
  .catch(error => console.log('error', error));
};

// Handle Google Maps auto fill
function autoFilling() {
    var input = document.getElementById("cities-autocomplete");
    var autocomplete = new google.maps.places.Autocomplete(input);
}

// On click save the city searched
modalButtonEl.on('click', function() {
  var citySearchHistoryUl = $('#citySearchHistory');
  citySearchHistoryUl.html("");
  var cityList = JSON.parse(localStorage.getItem("cities"));
  // If no city exists, show default
  if (cityList != null) {
    cityList.forEach(aCity => {
      citySearchHistoryUl.append("<a href=''><li class='aCitySearched'>"+ aCity +"</li></a>");
    });
  }
  $(".modal").addClass("is-active");
});

// Show city searched
var citySearchHistoryUl = $("#citySearchHistory");
citySearchHistoryUl.on("click", ".aCitySearched", function(event) {
  event.preventDefault();
  var checkedCity = event.target.innerHTML;
  citySearchHandler(checkedCity);
});

$(".modal-close").click(function() {
  $(".modal").removeClass("is-active");
});

// Get character info from JSON file and show on screen
async function fetchCharactersAndDisplay() {
  await $.getJSON("./assets/json/characters.json", function(data) {
    characters = data;
    for (var i = 0; i < characters.length; i++) {
      getCharacter(i, characters[i].character);
    }
  });
}

// Show specific pages 
async function init() {
  $(".characters").css("display", "none");
  $(".landing-page").css("display", "block");
  $(".profile").css("display", "none");
  city = "";
  await fetchCharactersAndDisplay();
}

// Additiona search city validation
function citySearchHandler(checkedCity) {
  $("#modalFooterP").html("");
  if (checkedCity=="") {
    checkedCity = citySearchInput.val();
    checkedCity = checkedCity.slice(0,-5);
    citySearchInput.val('');
  }

  if (city == "") {
    var citySearched = checkedCity;
    // If CITY is blank or null, show default of "SELECT CITY"
    if (!citySearched || citySearched == null) {
      $("#modalFooterP").html("Please Input A City In The USA<br>");
      return;
    };
    // Convert city to Uppercase and update buttons
    city = citySearched.toUpperCase();
    changeCityBtn1.html(city);
    changeCityBtn2.html(city);
    $(".characters").css("display", "block");
    $(".landing-page").css("display", "none");
    $(".profile").css("display", "none");
  } else {
    var citySearched = checkedCity;
    // If CITY is blank or null, show defualt of "SELECT CITY"
    if (!citySearched || citySearched == null) {
      $("#modalFooterP").html("Please Input A City In The USA");
      return;
    };
    city = citySearched.toUpperCase();
    changeCityBtn1.html(city);
    changeCityBtn2.html(city);
  };
  // Match city local info to JSON file
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

  var place = "park";
  var profileMap = $("#profileMap");
  profileMap.html("");
  profileMap.append("<iframe class='resp-iframe' width='600' height='450' style='border:0' loading='lazy' allowfullscreen src='https://www.google.com/maps/embed/v1/search?q="+ place +"%20near%20"+ city +"&key=AIzaSyDIAS6wopAuJKcmpYxEYnHXuXriBwMuew0'></iframe>");

  $(".modal").removeClass("is-active");
  $("nav").css("display", "block");

}

citySearchBtn.on('click', function(){
    $("#modalFooterP").html("");
    checkedCity = citySearchInput.val();
    checkedCity = checkedCity.slice(0,-5);
    citySearchInput.val('');
  
    if (city == "") {
      var citySearched = checkedCity;
      // If CITY is blank or null, show default of "SELECT CITY"
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
      // If CITY is blank or null, show defualt of "SELECT CITY"
      if (!citySearched || citySearched == null) {
        $("#modalFooterP").html("Please Input A City In The USA");
        return;
      };
      city = citySearched.toUpperCase();
      changeCityBtn1.html(city);
      changeCityBtn2.html(city);
    };
  
    // Get local storage for city check
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
  
    var place = "park";
    var profileMap = $("#profileMap");
    profileMap.html("");
    profileMap.append("<iframe class='resp-iframe' width='600' height='450' style='border:0' loading='lazy' allowfullscreen src='https://www.google.com/maps/embed/v1/search?q="+ place +"%20near%20"+ city +"&key=AIzaSyDIAS6wopAuJKcmpYxEYnHXuXriBwMuew0'></iframe>");
  
    $(".modal").removeClass("is-active");
    $("nav").css("display", "block");
});

// Handle back button from profile
backButton.on('click', function() {
  $(".characters").css("display", "block");
  $(".landing-page").css("display", "none");
  $(".profile").css("display", "none");
})

// Change city handling
changeCityBtn1.on('click', function() {
  var citySearchHistoryUl = $('#citySearchHistory');
  citySearchHistoryUl.html("");
  var cityList = JSON.parse(localStorage.getItem("cities"));
  if (cityList != null) {
    cityList.forEach(aCity => {
      citySearchHistoryUl.append("<a href=''><li class='aCitySearched'>"+ aCity +"</li></a>");
    });
  }
  $(".modal").addClass("is-active");
});

// Change city handling
changeCityBtn2.on('click', function() {
  var citySearchHistoryUl = $('#citySearchHistory');
  citySearchHistoryUl.html("");
  var cityList = JSON.parse(localStorage.getItem("cities"));
  if (cityList != null) {
    cityList.forEach(aCity => {
      citySearchHistoryUl.append("<a href=''><li class='aCitySearched'>"+ aCity +"</li></a>");
    });
  }
  $(".modal").addClass("is-active");
});

// Load to do info
var toDoCharacterInfo = $("#toDo-character-info");
toDoCharacterInfo.on("click", ".toDoSearch", function(event) {
  event.preventDefault();
  var place = event.target.innerHTML;
  var profileMap = $("#profileMap");
  profileMap.html("");
  profileMap.append("<iframe class='resp-iframe' width='600' height='450' style='border:0' loading='lazy' allowfullscreen src='https://www.google.com/maps/embed/v1/search?q="+ place +"%20near%20"+ city +"&key=AIzaSyDIAS6wopAuJKcmpYxEYnHXuXriBwMuew0'></iframe>");
});

// Load to eat info
var toEatCharacterInfo = $("#toEat-character-info");
toEatCharacterInfo.on("click", ".toEatSearch", function(event) {
  event.preventDefault();
  var place = event.target.innerHTML;
  var profileMap = $("#profileMap");
  profileMap.html("");
  profileMap.append("<iframe class='resp-iframe' width='600' height='450' style='border:0' loading='lazy' allowfullscreen src='https://www.google.com/maps/embed/v1/search?q="+ place +"%20near%20"+ city +"&key=AIzaSyDIAS6wopAuJKcmpYxEYnHXuXriBwMuew0'></iframe>");

});

// Generate character list
characterListUl.on("click", ".character", function(event) {
  var index = event.currentTarget.dataset.index;
  var characterInfoTopUl = $("#character-info-top");
  characterInfoTopUl.html("");
  characterInfoTopUl.append("<li><h2 class='profileTitle'>" + characters[index].character.toUpperCase() + "</h2></li>");
  characterInfoTopUl.append("<li class='characterDescription'>" + characters[index].description + "</li>")
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

// Run everything on load
init();

