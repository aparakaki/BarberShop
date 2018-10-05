$(document).on("click", "#menu-toggle", function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
});

// ajax call into the front end

// $(document).ready(function(){
//   var inputDate;
//   var timesArray = [];
//   $.ajax("/api/calendar", {
//     type: "GET",
//     data: inputDate
// }).then(function (data) {
//     timesArray = getTimeSlots(sortTimeData(data));
//     // console.log(timesArray);

//     console.log(data);
// });

// });

let newArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];

for (var i = 0; i < newArray.length; i++) {
  var $name = $("<div>", { class: "appendedName" });
  $name.append(newArray[i]);
  $name.addClass("col-md-3 border border-dark");
  $name.appendTo("#nameAdmin");
}

// var a = $("<div>");
// for (var i = 0; i < newArray.length; i++) {
//    let arrayResult = newArray.length[i];

//   }arrayResult = newArray.length[i];

//   }



// button on click function to grab the values inputed by the IDs
$(document).on("click", "#serviceButton", function(e) {
  // alert("hello world");
  let a = $("#newService").val();
  let b = $("#estimatedTime").val();
  let c = $("#newPrice").val();
  let d = $("#serviceDescrption").val();

  console.log("1" + a + "2" + b + "3" + c + "4" +d);
});

