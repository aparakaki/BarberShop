
$(document).ready(function () {
    var serviceSelected = [];
    var totalTime = 0;
    var totalPrice = 0;
    var serviceDel;

    getServices();
    // $(".chosen").hide();

    $(document).on("click", ".service-select", function () {
        var thisid = $(this).data("id")
        var found = false;
        for (let h = 0; h < serviceSelected.length; h++) {
            if (serviceSelected[h].id === thisid) {
                found = true;
                break;
            }
        }
        // $(".chosen").show();

        if (!found) {
            $.get("/api/services", function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (thisid === data[i].id) {
                        serviceSelected.push(data[i]);
                    };
                };
                console.log(serviceSelected);
                $(".selected").empty();

                var title = $("<h3>").text("Services Selected");
                $(".selected").append(title);

                totalTime = 0;
                totalPrice = 0;
                for (var j = 0; j < serviceSelected.length; j++) {
                    totalTime += serviceSelected[j].time
                    totalPrice += parseInt(serviceSelected[j].price)
                    var selected = $("<div>").text(serviceSelected[j].style + " $" + serviceSelected[j].price + " " + serviceSelected[j].time + " min")
                    selected.attr("id", serviceSelected[j].id)
                    selected.append(`
                <button class = "btn btn-danger btn-sm remove-service" data-id = ${serviceSelected[j].id}> <i class="fas fa-backspace"></i> </button>
                `)
                    $(".selected").append(selected);
                    $(".totals").html("<h3> Totals </h3> Total Time: " + totalTime + "min <br> Total Price: $" + totalPrice)
                    var done = $("<a href = '#' class = 'done' ><button class = 'btn btn-primary done'><i class='far fa-calendar-alt'></i> See Available Appintments</button></a>");
                    $(".done-selecting").html(done);
                }
            });
        }          

    });

    $(document).on("click", ".done", function () {
        // if (serviceSelected.length === 0) {
        //     alert("select a service")

        // } else {
        // }
        $(".done").attr("href", "/calendar");

        sessionStorage.setItem("serviceSelected", JSON.stringify(serviceSelected));
        sessionStorage.setItem("servicePrice", totalPrice);
        sessionStorage.setItem("serviceTime", totalTime);

    })


    $(document).on("click", ".remove-service", function () {
        var time;
        var price;
        var buttonId = $(this).data("id")
        $("#" + buttonId + " ").remove();

        $.get("/api/services", function (data) {
            for (var i = 0; i < data.length; i++) {
                if (buttonId === data[i].id) {
                    serviceDel = data[i];
                    time = data[i].time;
                    price = data[i].price;
                }
            }
            totalTime -= parseInt(time);
            totalPrice -= parseInt(price);
            $(".totals").html("<h3> Totals </h3> Total Time: " + totalTime + "min <br> Total Price: $" + totalPrice)

            var index = serviceSelected.indexOf(serviceDel);
            serviceSelected.splice(index, 1);

            if(serviceSelected.length === 0) {
                $(".done").remove();
            }
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
           <em> ${data[i].description}</em><br>  
            Estimated Time: <b>${data[i].time} min </b><br>
              Price: <b>$${data[i].price}</b> <br>
              <button class = "btn btn-warning btn-sm service-select" data-id = "${data[i].id}"> Select </button>
              
            </div>
        </div>
    </div>
         `)
            };
        });


    };

});