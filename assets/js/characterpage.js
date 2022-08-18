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
<<<<<<< HEAD
    window.location.replace("./characters.html");
});
=======
    window.location.replace("./profile");
});

// $(".profileImage").attr("src", profileImage);
// console.log("image url", profileImage);

// $(".profileImage").css("background-image", "url(" + profileImage + ")");
>>>>>>> 6bcf57591c2e979dbdd4e191ee930c77f702995b
