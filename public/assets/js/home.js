$(document).ready(function(){

var id = 1; //need to store the user id so we can use it to get the history

$.get("/api/user/" + id, function(data){
    //grab name from data to show on welcome sign
    console.log(data);

});



$.get("/api/history/" + id + "/1" , function(data){
    console.log(data);
    for(var i=0; i<data.length; i++){
        
        //generate divs for each appointment and post to the dom with jquery
    }

});




});