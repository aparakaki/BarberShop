
$(document).ready(function(){
    

    $(".day").click( function(){

        //make get request for time slots and post the ones that apply 
        // need to send with the selected date in the format YYYY-MM-DD HH:MM:SS use moment for this 
        $.get("/api/schedule", function(data){

        })
        var timeslot1 = $("<div>").text("time slot 1")
        var timeslot2 = $("<div>").text("time slot 2")
        
        $(".morning").append(timeslot1);
        $(".afternoon").append(timeslot2)

        
    });



});