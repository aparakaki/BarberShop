
$(document).on("click", "#tabletCheckIn", function (e) {
  event.preventDefault();
  let signInTime = {
    userName: $("#idTablet").val().trim(),
    startTime: (Date.now()) / 1000 / 60
  }
  console.log(signInTime);
  $.ajax("/haircutStartTime", {
    type: "POST",
    data: signInTime
  }).then(function (data){
  })
});
// check out
$(document).on("click", "#tabletCheckOut", function (e) {
  event.preventDefault();
  let signOutTime = {
    userName: $("#idTabletTwo").val().trim(),
    endTime: (Date.now()) / 1000 / 60
  }
  console.log(signOutTime);
  $.ajax("/haircutEndTime", {
    type: "POST",
    data: signOutTime
  }).then(function (data){
  })
});
// jQuery & Velocity.js sign in JS

function slideUpIn() {
    $("#login").velocity("transition.slideUpIn", 1250)
  };
  
  function slideLeftIn() {
    $(".row").delay(500).velocity("transition.slideLeftIn", {stagger: 500})    
  }
  
  function shake() {
    $(".password-row").velocity("callout.shake");
  }
  
  slideUpIn();
  slideLeftIn();
  $("button").on("click", function () {
    shake();
  });
  //