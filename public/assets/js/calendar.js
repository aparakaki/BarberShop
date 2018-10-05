
$(document).ready(function(){
    
    var data = sessionStorage.getItem("serviceSelected");
    console.log(data);

    for (var i=1; i<32; i++){
        var day = $("<li>").text(i);
        day.addClass("day")
        if( i < 10){
            day.attr("id", "2018-10-0" + i );
        } else{
            day.attr("id", "2018-10-" + i );
        }
        
        $(".days").append(day);

    };

    $(document).on("click", ".day", function(){
        var chosenDate = $(this).attr("id");

        $.get("/api/schedule" + chosenDate, function(data){

            //get timeslots that are available and fit the amount of time for the service
            //append to morning and afternoon divs

        });
        var timeslot1 = $("<div>").text("time slot 1")
        var timeslot2 = $("<div>").text("time slot 2")
        
        $(".morning").append(timeslot1);
        $(".afternoon").append(timeslot2)

        
    });



});