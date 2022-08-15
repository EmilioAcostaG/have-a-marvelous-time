function getCharacter() {
    var characterUrl = "https://gateway.marvel.com/v1/public/characters?hash=5ad57e2950ad170a8c45b38ddb6b3b01&ts=string&name=beast&apikey=72b7c45c60389c825df0845f4afd3c85";

    return fetch(characterUrl)
    .then((characterResponse) => {
        return characterResponse.json();
    })
    .then((characterResponse) => {
        var code = characterResponse.code;
        console.log("Code:", code);
        console.log("Code:", code);
        console.log("Code:", code);

    })
    .catch(error => console.log('error', error));
      
} getCharacter();