
$(document).ready(function () {
var serviceSelected;
var totalTime = 0;
var totalPrice = 0;

    getServices();


    $(document).on("click", ".service-select" , function(){
        var thisid= $(this).data("id")

        $.get("/api/services", function(data){
            for(var i=0; i<data.length; i++){
                if(thisid === data[i].id){
                  serviceSelected = data[i];
                  totalTime += serviceSelected.time
                  totalPrice += parseInt(serviceSelected.price)  
                }
            }
            var selected = $("<div>").text(serviceSelected.style + " $" + serviceSelected.price + " " + serviceSelected.time + " min")
            selected.attr("id", thisid)
            selected.append(`
            <button class = "btn btn-danger remove-service" data-id = ${thisid}> Remove </button>
            `)
            $(".selected").append(selected);
            $(".totals").html("Total Time: " +  totalTime + "min <br> Total Price: $" + totalPrice)
            var done = $("<button class = 'btn btn-info done'>").text("See Avaliable Appointments");
            $(".done-selecting").append(done);

        });

    });

    $(document).on("click", ".done", function(){
        sessionStorage.setItem("serviceSelected", serviceSelected);
        sessionStorage.setItem("servicePrice", totalPrice);
        sessionStorage.setItem("serviceTime", totalTime);
        
        //direct to calendar page 

    })


    $(document).on("click", ".remove-service", function(){
        var time;
        var price;
        var buttonId = $(this).data("id")
        $("#" + buttonId + " ").remove();

        $.get("/api/services", function(data){
            for(var i=0; i<data.length; i++){
                if(buttonId === data[i].id){
                    time = data[i].time;
                    price = data[i].price;
                }
            }
            totalTime -= parseInt(time);
        totalPrice -= parseInt(price);
        $(".totals").html("Total Time: " +  totalTime + "min <br> Total Price: $" + totalPrice)

        });

        

        
    });

    function getServices() {
        $.get("/api/services", function (data) {

            for (var i = 0; i < data.length; i++) {
                $(".accordion").append(`
        <div class="card">
        <div class="card-header" id="headingOne">
            <h5 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${[i]}"
                    aria-expanded="true" aria-controls="collapse${[i]}">
                    ${data[i].style}
                </button>
            </h5>
        </div>
    
        <div id="collapse${[i]}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div class="card-body">
            ${data[i].description}<br>  
            Estimated Time: ${data[i].time} min <br>
              Price: $${data[i].price} <br>
              <button class = "btn btn-info service-select" data-id = "${data[i].id}"> Select </button>
              
            </div>
        </div>
    </div>
         `)
            };
        });


    };

});