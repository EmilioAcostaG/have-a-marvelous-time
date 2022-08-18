// function showProfile() {
//     $(".changeCityButton").click(function (event) {
//         console.log("click");
//     }); showProfile();
// };

$(".changeCityButton").click(function (event) {
    console.log("click");
});

$(".characterBox").click(function (event) {
    console.log("click");
});

$(".characterBox").click(function (event) {
    var characterClicked = event.currentTarget.classList[1];
    console.log(characterClicked);
    window.location.replace("/Users/makeithappenmike/Documents/BootCamp/have-a-marvelous-time/characters.html");
});