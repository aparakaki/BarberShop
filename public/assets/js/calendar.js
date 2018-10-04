
$(document).ready(function(){
    

    $(".day").click( function(){

        //make get request for time slots and post the ones that apply 
        
        var timeslot1 = $("<div>").text("time slot 1")
        var timeslot2 = $("<div>").text("time slot 2")
        
        $(".morning").append(timeslot1);
        $(".afternoon").append(timeslot2)

        
    });



});