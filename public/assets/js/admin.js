




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

var timesArray = [];        //array that will hold the time slots available
    var chosenDate;
    var apptTime;
$.get("/api/schedule/",function (data) {
  timesArray = [];
  timesArray = getTimeSlots(sortTimeData(data));
            console.log(timesArray);
            for (let i = 0; i < timesArray.length; i++) {              
            // var $name = $("<div>", { class: "appendedName" });
            // $name.append(newArray[i]);
            // $name.addClass("col-md-3 border border-dark");
            // $name.appendTo("#nameAdmin");
            console.log(timesArray[i]);
              // let temp = convertTime(timesArray[i])
              // let newDiv = $("<div>").addClass("col-md-3 border border-dark")
              //                 .attr("data-id", i).text(temp)
              //                 .attr("data-toggle", "modal")
              //                 .attr("data-target", "#scheduleModal");
              // let btnDiv = $("<div>").append(timeBtn);    
              console.log(data);
          }
      }).then(function (response1) {
        console.log(response1);
      })


      
// for (var i = 0; i < newArray.length; i++) {
  
// }


