//START
$(document).ready(function() {

  

















  $(document).on("click", "#menu-toggle", function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

  $(document).on("click", "#serviceButton", function(e) {
    event.preventDefault();
    let a = $("#newService").val();
    let b = $("#estimatedTime").val(); // convert to string?
    let c = $("#newPrice").val(); // convert to string?
    let d = $("#serviceDescription").val();
    // create an object
    var createService = {
      style: a,
      time: b,
      price: c,
      description: d
    };
    console.log(a + b + c + d);
    console.log("hello world", createService);
    // post to api service route
    $.ajax("/api/services", { type: "POST", data: createService }).then(
      function(data) {
        // console.log("added new services" + createService);
        // refresh each time button submits
        location.reload();
        console.log("string data",data);
      }
    );
  }); 

  //get api
//   setTimeout(function () {
 



  //test
          let newArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];
            for (var i = 0; i < newArray.length; i++) {
              var $name = $("<div>", { class: "appendedName" });
              $name.append(newArray[i]);
              $name.addClass("col-md-3 border border-dark");
              $name.appendTo("#nameAdmin");
          }
  // // button on click function to grab the values inputed by the IDs
});


