$(document).ready(function () {

    var id = 2; //need to store the user id so we can use it to get the history

    $.get("/api/user/" + id, function (data) {
        //grab name from data to show on welcome sign
        console.log(data);

    });



    $.get("/api/history/" + id + "/1", function (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {

            //generate divs for each appointment and post to the dom with jquery
        }

    });

    $.get("/api/history/" + id + "/0", function (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            let serDiv = $("<div>");
            let dateDiv = $("<div>").text(convertDate(data[i].date));
            let timeDiv = $("<div>").text(convertTime(data[i].start));
            let priceDiv = $("<div>");

            var price = 0;
            for (let j = 0; j < data[i].Services.length; j++) {
                price += parseInt(data[i].Services[j].price);
                if (j > 0) {
                    serDiv.append(", " + data[i].Services[j].style)
                }
                else {
                    serDiv.append(data[i].Services[j].style)
                }
            }
            priceDiv.text("$" + price);
            $("#apptPrice").append(priceDiv);
            $("#apptService").append(serDiv);
            $("#apptTime").append(timeDiv);
            $("#apptDate").append(dateDiv);

        }

    });

    function convertDate(inDate) {
        var newDate = inDate.split("-")[1] + "/" +inDate.split("-")[2] + "/" +inDate.split("-")[0]
        return newDate;
    }

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