$(document).ready(function(){

    $(document).on("click", "#menu-toggle", function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
      });

var id = 1; //need to store the user id so we can use it to get the history

$.get("/api/user/" + id, function(data){
    //grab name from data to show on welcome sign
    console.log(data);
    $(".user-name").text(data.name);

});



$.get("/api/history/" + id + "/1" , function(data){
    console.log(data);
    for(var i=0; i<data.length; i++){
        for(var j=0; j<data[i].Services.length; j++ ){
 
        $(".history").append(`
        <div class = "row">

                        <!-- second row of appends starts here -->
                        <div class="col-md-3 border border-dark" id="hcType">
                            <!-- hc type appends here -->
                            ${data[i].Services[j].style}
                        </div>
                        <div class="col-md-3 border border-dark" id="appDate">
                            <!-- app date appends here -->
                            ${convertDate(data[i].date)}
                        </div>
                        <div class="col-md-3  border border-dark" id="hcTime">
                            <!-- Time appends here -->
                            ${data[i].serviceLength}
                        </div>
                        <div class="col-md-3 border border-dark" id="userPrice">
                            <!-- Price appends here -->
                            $${data[i].Services[j].price}
                        </div>
                        <!-- append ends here -->

                    </div>
        
        `)
        
        }
    }

});

function convertTime(inTime) {
    var hourVar = parseInt(inTime.slice(0, 3));
    var minVar = inTime.slice(3);

    if (hourVar > 12) {
        hourVar = hourVar - 12;
        var hourStr = hourVar + ":" + minVar + "pm";
    }
    else if (hourVar === 12) {
        var hourStr = hourVar + ":" + minVar + "pm";
    }
    else {
        var hourStr = hourVar + ":" + minVar + "am";
    }

    return hourStr;
}


});