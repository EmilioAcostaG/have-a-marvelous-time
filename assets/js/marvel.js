var statusCode;
var characterName = "thor";
var numComics;
var characterDescription;
var profileImage;

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
            $(".profileImage").attr("src",profileImage);
            $(".profileTitle").html(characterName.toUpperCase());
            $(".characterDescription").html("characterDescription");
            $(".numComics").html(numComics);
          });
    })
    .catch(error => console.log('error', error));
      
} getCharacter();