$(".first-button").on("click" ,function (){
    alert("hello world!");
})



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