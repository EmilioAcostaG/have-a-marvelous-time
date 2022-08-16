var favThing;
var favMeal;
var hobbies;
var somethingToEat;
var somethingToDo;

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
        somethingToEat = characterInfoResponse[3]["Place"];
        somethingToDo = characterInfoResponse[3]["Restaraunts"];

        // console.log("Fav Thing:", favThing);
        // console.log("Fav Meal:", favMeal);
        // console.log("Hobbies:", hobbies);
        // console.log("To Eat:", somethingToEat);
        // console.log("To Do:", somethingToDo);

        $(".favThing").html(favThing);
        $(".favMeal").html(favMeal);
        $(".hobbies").html(hobbies);
        $(".toEat").html(somethingToEat);
        $(".toDo").html(somethingToDo);

        $(".changeCityButton").click(function (event) {
            console.log(event);
            console.log("click");
        });
        

    })
    .catch(error => console.log('error', error));
      
} getCharacterInfo();

