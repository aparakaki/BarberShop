$(document).ready(function () {
    $(document).on("click", "#menu-toggle", function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
    var userId;
    $.get("/setLocalStorage", function (data) {
        console.log(data.id);
        console.log("hit");
        sessionStorage.setItem("userId", data.id);
        userId = data.id;
        $.get("/api/user/" + userId, function (data) {
            //grab name from data to show on welcome sign
            // console.log(data);
            $(".user-name").text(data.name);
    
        });
    });


    var upcomingAppts = [];
//upcoming appts display
    $.get("/api/history/" + userId + "/0", function (data) {
        // console.log(data);
        upcomingAppts = data;
        for (var i = 0; i < data.length; i++) {
            let rowTr = $("<tr>").attr("scope", "row");
            let serTd = $("<td>");
            let dateTd = $("<td>").text(convertDate(data[i].date));
            let timeTd = $("<td>").text(convertTime(data[i].start));
            let priceTd = $("<td>");
            let btnTd = $("<td>");

            var price = 0;
            for (let j = 0; j < data[i].Services.length; j++) {
                price += parseInt(data[i].Services[j].price);
                if (j > 0) {
                    serTd.append(", " + data[i].Services[j].style)
                }
                else {
                    serTd.append(data[i].Services[j].style)
                }
            }
            priceTd.text("$" + price);
            let cancelBtn = $("<button>").attr("id", `${i}`)
            .attr("data-target", "#deleteApptTitle")
            .attr("data-toggle", "modal")
            .addClass("btn btn-danger btn-default btn-sm deleteBtn")
            .append($("<i>").addClass("far fa-trash-alt"));
            btnTd.append(cancelBtn);
            $(rowTr).append(dateTd, timeTd, serTd, priceTd, btnTd);
            $("#apptTable").append(rowTr);
        }

    });
    
    $.get("/api/history/" + userId + "/1", function (data) {
        // console.log(data);
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].Services.length; j++) {
                $("#historyTable").append(`
                <tr>
                <td>${convertDate(data[i].date)}</td>
                <td>${data[i].Services[j].style}</td>
                <td>${data[i].Services[j].time}min</td>
                <td>$${data[i].Services[j].price}</td>
                </tr>
                `)
                
            }
        }
    });

    var apptId;

    $(document).on("click", ".deleteBtn", function(event) {
        event.preventDefault();
        let index = parseInt($(this).attr("id"));
        console.log(upcomingAppts);

        apptId = upcomingAppts[index].id;
        console.log(apptId);
        $(".modal-body").html(`
            Date: ${convertDate(upcomingAppts[index].date)} <br>
            Time: ${convertTime(upcomingAppts[index].start)}
        `);
        $(".modal").modal("show");
    });


    $(document).on("click", "#cancel-appt", function(event) {
        event.preventDefault();

        $.ajax("/api/appointment/" + apptId, {
            type: "DELETE"
        }).then(function() {
            location.reload(true);
        })
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
    
    
        function convertDate(inDate) {
            var newDate = inDate.split("-")[1] + "/" + inDate.split("-")[2] + "/" + inDate.split("-")[0]
            return newDate;
        }
    
});