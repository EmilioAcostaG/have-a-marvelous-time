var modalButtonEl = $('#modal-button');
var citySearchBtn = $('#citySearchBtn');
var citySearchInput = $('#cities-autocomplete');
var city;

function autoFilling() {
    var input = document.getElementById("cities-autocomplete");
    var autocomplete = new google.maps.places.Autocomplete(input);
}


modalButtonEl.on('click', function() {
  console.log("modal will pop up");

  var target = $(this).data("target");
  $(".modal").addClass("is-active");

} );

$(".model-close").click(function() {
  console.log("closed modal")
 
  $(".modal").removeClass("is-active");
})

citySearchBtn.on('click', function() {
  city = citySearchInput.val();
  console.log(city);
  citySearchInput.val('');
})