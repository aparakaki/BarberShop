
$(document).ready(function () {

    var today = new Date();
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var days = ["Sunday", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
    var month = months[today.getMonth()];
    var day = days[today.getDay()];
    var fullDate = day + " " + month + " " + today.getDate() + " " + today.getHours() + ":" + today.getMinutes();

    $(".today").append(fullDate);

    var adminMonth = "October"// grab from user input
    $(".admin-month").text(adminMonth);
    var cutMonth = adminMonth.slice(0, 3)
    var adminMonthNum = months.indexOf(cutMonth) + 1;

    console.log(months.indexOf(cutMonth) + 1);

    var lastday = $("<li>").text(31);
    $(".days").append(lastday);
    for (var i = 1; i < 32; i++) {

        var day = $("<li>").text(i);
        day.addClass("day");
        day.addClass("hover");
        if (i < 10) {
            day.attr("id", "2018-" + adminMonthNum + "-0" + i);
        } else {
            day.attr("id", "2018-" + adminMonthNum + "-" + i);
        }
        var date = new Date(day.attr("id").replace(/-/g, "/"));
        console.log(date);
        if (date < today) {
            day.removeClass("hover");
            day.addClass("old");
        }

        $(".days").append(day);
    };

    var selectService = JSON.parse(sessionStorage.getItem('serviceSelected'));
    console.log(selectService);

    var totalPrice = sessionStorage.getItem("servicePrice");
    console.log(totalPrice);
    var totalTime = sessionStorage.getItem("serviceTime");
    console.log(totalTime);
    var userId = sessionStorage.getItem("userId");
    // console.log(data);
    var timesArray = [];        //array that will hold the time slots available
    var chosenDate;
    var apptTime;

    for (var i = 0; i < selectService.length; i++) {
        var yourServ = $("<div>").append(`
        ${selectService[i].style} ${selectService[i].time} min
        `)
        $(".your-service").append(yourServ);
    }

    $(document).on("click", ".old", function () {
        $(".morning").empty();
        $(".afternoon").empty();

        $(".morning").append("<p>").html("<h5><i class='far fa-clock'></i> AM</h5> <br> No available Times");
        $(".afternoon").append("<p>").html("<h5><i class='fas fa-clock'></i> PM</h5> <br> No available Times");
    });

    $(document).on("click", ".hover", function (event) {
        event.preventDefault();
        chosenDate = $(this).attr("id");
        //make get request for time slots and post the ones that apply 
        //need to send with the selected date in the format YYYY-MM-DD HH:MM:SS use moment for this 
        timesArray = [];
        $(".morning").empty();
        $(".afternoon").empty();

        console.log(chosenDate);

        $.get("/api/schedule/" + chosenDate, function (data) {
            timesArray = [];
            // console.log(data);
            timesArray = getTimeSlots(sortTimeData(data));
            console.log(timesArray);
            if (timesArray.length === 0) {
                $(".morning").append("<p>").html("<h5><i class='far fa-clock'></i> AM</h5> <br> No available Times");
                $(".afternoon").append("<p>").html("<h5><i class='fas fa-clock'></i> PM</h5> <br> No available Times");
            }
            else {
                var morn = $("<h5>").html("<i class='far fa-clock'></i> AM");
                var after = $("<h5>").html("<i class='fas fa-clock'></i> PM");
                $(".morning").append(morn);
                $(".afternoon").append(after);

                for (let i = 0; i < timesArray.length; i++) {
                    let temp = convertTime(timesArray[i])
                    let timeBtn = $("<button>").addClass("btn btn-primary time-btn")
                        .attr("data-id", i).text(temp)
                        .attr("data-toggle", "modal")
                        .attr("data-target", "#scheduleModal");
                    let btnDiv = $("<div>").append(timeBtn);
                    if (temp.slice(-2) === "am") {
                        $(".morning").append(btnDiv);
                    }
                    else {
                        $(".afternoon").append(btnDiv);
                    }
                }
            }
        });
    });


    $(document).on("click", ".time-btn", function (event) {
        event.preventDefault();
        var index = $(this).data("id");
        apptTime = timesArray[index];
        var time = convertTime(apptTime);
        var date = convertDate(chosenDate);
        console.log(apptTime);

        $("#book-apt").show();
        $(".cancel").show();
        $(".home").hide();
        $(".modal-body").html(`
            Date: ${date} <br>
            Time: ${time}
        `)
    })

    $(document).on("click", "#book-apt", function (event) {
        event.preventDefault();
        console.log(apptTime);

        var temp = new Date('1970/01/01 ' + apptTime);
        var endTime = new Date(temp.getTime() + (totalTime * 60 * 1000));
        console.log(apptTime);
        endTime = endTime.toString().split(" ")[4].substring(0, 5)


        var apptObj = {
            date: chosenDate,
            start: apptTime,
            end: endTime,
            completed: false,
            UserId: userId
        };
        $.post("/api/schedule", apptObj, function (data) {
            for (let i = 0; i < selectService.length; i++) {
                var detailObj = {
                    AppointmentId: data.id,
                    ServiceId: selectService[i].id
                };
                $.post("/api/details", detailObj, function (data) {
                    console.log(data);
                });
            }

            var date = convertDate(chosenDate);
            $(".modal-body").html(`
                Your appointment on ${date} has been booked! 
                `);
            $(".modal-title").text("Thank You!")
            $("#book-apt").hide();
            $(".cancel").hide();
            var home = $("<a href = '/userHome'><button class = 'btn btn-warning home'>Back To Home</button></a>");
            $(".modal-footer").append(home);
        })
    });


    //sorts the array of appointments in places them in the correct order by time
    function sortTimeData(appointments) {
        //checks if start and end times for the day have been set by the admin
        var startFound = false;
        var endFound = false;
        for (let j = 0; j < appointments.length; j++) {
            if (appointments[j].completed === true) {
                if (appointments[j].start === appointments[j].end) {
                    startFound = true;
                }
                else if (appointments[j].end === "0") {
                    delete appointments[j].end;
                    console.log(appointments[j])
                    endFound = true;
                }
            }
        }
        //if no start time has been set it will default to 9am
        if (!startFound) {
            var empStart = "09:00";  //start time set by employee
            var startTime = empStart;

            //checks if there's an appointment at the very start of the shift
            for (let i = 0; i < appointments.length; i++) {
                if (appointments[i].start === empStart) {
                    startTime = new Date('1970/01/01 ' + empStart);
                    startTime = new Date(startTime.getTime() - 60000).toString().split(" ")[4].substring(0, 5);
                    console.log(startTime)
                    break;
                }
                else {
                    startTime = empStart;
                }
            }
            appointments.push({ start: startTime, end: startTime });
        };
        //if no end time has been set it will default to 5pm
        if (!endFound) {
            var empEnd = "17:00";   //end time set by employee
            appointments.push({ start: empEnd });
        }



        // var empStart = "09:00"  //start time set by employee
        // var empEnd = "17:00"   //end time set by employee
        // var startTime = empStart;

        // //checks if there's an appointment at the very start of the shift
        // for (let i = 0; i < appointments.length; i++) {
        //     if (appointments[i].start === empStart) {
        //         startTime = new Date('1970/01/01 ' + empStart);
        //         startTime = new Date(startTime.getTime() - 60000).toString().split(" ")[4].substring(0, 5);
        //         console.log(startTime)
        //         break;
        //     }
        //     else {
        //         startTime = empStart;
        //     }
        // }

        // appointments.push({ start: startTime, end: startTime });
        // appointments.push({ start: empEnd });

        console.log(appointments);

        appointments.sort(function (a, b) {
            return new Date('1970/01/01 ' + a.start) - new Date('1970/01/01 ' + b.start);
        });

        return appointments;
    };

    //finds the free time slots between each appt. 
    //and calculates the starting times available depending on the service duration
    function getTimeSlots(appointments) {
        var dateEvents = appointments.map(function (event) {
            return {
                start: new Date('1970-01-01 ' + event.start),
                end: new Date('1970-01-01 ' + event.end)
            };
        });

        var requiredGap = totalTime * 60 * 1000;
        var prev = dateEvents[0];
        var firstGap = null;

        var timeSlots = [];

        for (var i = 1; i < dateEvents.length; i++) {
            var current = dateEvents[i];
            var diff = current.start - prev.end;

            if (diff >= requiredGap) {
                firstGap = {
                    start: prev.end,
                    end: current.start
                };
                timeSlots.push(firstGap);
            }

            prev = current;
        }

        var availTimes = [];
        for (let j = 0; j < timeSlots.length; j++) {
            let temp = timeSlots[j].start;
            while (temp < timeSlots[j].end && new Date(temp.getTime() + requiredGap) <= timeSlots[j].end) {
                availTimes.push(temp.toString().split(" ")[4].substring(0, 5));
                temp = new Date(temp.getTime() + requiredGap);
            }
        }
        return availTimes;
    };

    //converts 24-hr format to am/pm format
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
    };

    function convertDate(inDate) {
        var newDate = inDate.split("-")[1] + "/" + inDate.split("-")[2] + "/" + inDate.split("-")[0]
        return newDate;
    };
});