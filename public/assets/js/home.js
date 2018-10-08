$(document).ready(function(){

var id //need to store the user id so we can use it to get the history

$.get("/api/user" + id, function(data){
    //grab name from data to show on welcome sign

});

$.get("/api/history" + id, function(data){
    console.log(data);
    for(var i=0; i<data.length; i++){
        //filter out an appointment that is "in progress" with an if statement to see if it has happened yet?
        
        //generate divs for each appointment and post to the dom with jquery
    }

});




});