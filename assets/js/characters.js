var favThing;
var favMeal;
var hobbies;
var somethingToEat;
var somethingToDo;
var readMore;

function getCharacterInfo() {
    var characterInfoUrl = "assets/json/characters.json";
    // console.log("Getting Characters");

    return fetch(characterInfoUrl)
    .then((characterInfoResponse) => {
        return characterInfoResponse.json();
    })
    .then((characterInfoResponse) => {
        // console.log(characterInfoResponse);
        favThing = characterInfoResponse[3]["Character"];
        favMeal = characterInfoResponse[3]["Food"];
        hobbies = characterInfoResponse[3]["Hobby"];
        somethingToEat = characterInfoResponse[3]["Restaraunts"];
        somethingToDo = characterInfoResponse[3]["Place"];
        readMore = characterInfoResponse[3]["ReadMore"];
        console.log(somethingToEat.join(', '));

        $(".favThing").html(favThing);
        $(".favMeal").html(favMeal);
        $(".hobbies").html(hobbies);
        $(".toEat").html(somethingToEat.join(', '));
        $(".toDo").html(somethingToDo);
        $(".readMore").attr("href", readMore)
        $(".changeCityButton").click(function (event) {
            console.log(event);
            console.log("click");
        });
        

    })
    .catch(error => console.log('error', error));
      
} getCharacterInfo();

