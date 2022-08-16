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
        somethingToEat = characterInfoResponse[3]["Place"];
        somethingToDo = characterInfoResponse[3]["Restaraunts"];
        readMore = characterInfoResponse[3]["ReadMore"];
        var toEatArray = [];
        toEatArray.push(somethingToEat);
        console.log(toEatArray);

        // console.log("Fav Thing:", favThing);
        // console.log("Fav Meal:", favMeal);
        // console.log("Hobbies:", hobbies);
        // console.log("To Eat:", somethingToEat);
        // console.log("To Do:", somethingToDo);
        // console.log("Read More:", readMore);

        $(".favThing").html(favThing);
        $(".favMeal").html(favMeal);
        $(".hobbies").html(hobbies);
        for (let i = 0; i < toEatArray.length; i++) {
            readMore = characterInfoResponse[3]["ReadMore"];
            console.log("loop", readMore);
            $(".toEat").html(somethingToEat);
        };
        
        $(".toDo").html(somethingToDo);
        $(".readMore").attr("href", readMore)

        $(".changeCityButton").click(function (event) {
            console.log(event);
            console.log("click");
        });
        

    })
    .catch(error => console.log('error', error));
      
} getCharacterInfo();

