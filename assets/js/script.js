var modalButtonEl =  $('#modal-button');

modalButtonEl.on('click', function() {
  console.log("modal will pop up");

  var target = $(this).data("target");
  $(".modal").addClass("is-active");

} );

$(".model-close").click(function() {
  console.log("closed modal")
 
  $(".modal").removeClass("is-active");
})
