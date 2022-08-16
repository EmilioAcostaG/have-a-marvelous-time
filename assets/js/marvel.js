var statusCode;
var characterName = "thor";
var numComics;
var characterDescription;

function getCharacter() {
    var characterUrl = "https://gateway.marvel.com/v1/public/characters?hash=5ad57e2950ad170a8c45b38ddb6b3b01&ts=string&name=" + characterName + "&apikey=72b7c45c60389c825df0845f4afd3c85";

    return fetch(characterUrl)
    .then((characterResponse) => {
        return characterResponse.json();
    })
    .then((characterResponse) => {
        // var code = characterResponse.code;
        var characterName = characterResponse.data.results[0].name;
        var numComics = characterResponse.data.results[0].comics.available;
        var characterDescription = characterResponse.data.results[0].description;

        // console.log(characterResponse);
        // console.log("Code:", statusCode);
        console.log("Name:", characterName);
        console.log("#Comics:", numComics);
        console.log("Desc:", characterDescription);
        $(".profileTitle").html(characterName.toUpperCase());
        $(".characterDescription").html(characterDescription);
    })
    .catch(error => console.log('error', error));
      
} getCharacter();