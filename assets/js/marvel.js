var character = "thor";
var code;
var name;
var numComics;
var description;

function getCharacter() {
    var characterUrl = "https://gateway.marvel.com/v1/public/characters?hash=5ad57e2950ad170a8c45b38ddb6b3b01&ts=string&name=" + character + "&apikey=72b7c45c60389c825df0845f4afd3c85";

    return fetch(characterUrl)
    .then((characterResponse) => {
        return characterResponse.json();
    })
    .then((characterResponse) => {
        var code = characterResponse.code;
        var name = characterResponse.data.results[0].name;
        var numComics = characterResponse.data.results[0].comics.available;
        var description = characterResponse.data.results[0].description;

        console.log(characterResponse);
        console.log("Code:", code);
        console.log("Name:", name);
        console.log("#Comics:", numComics);
        console.log("Desc:", description);
        $(".profileTitle").html(character.toUpperCase());
var characerDescription = "This is a description";
$(".description").html(description);
var numComics = "Number of Comics";
$(".description").html(description);
var description = "This is a description";
$(".description").html(description);

    })
    .catch(error => console.log('error', error));
      
} getCharacter();