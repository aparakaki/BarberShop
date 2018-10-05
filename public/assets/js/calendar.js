
$(document).ready(function(){



    for (var i=1; i<32; i++){
        var day = $("<li>").text(i);
        day.addClass("day")
        if( i < 10){
            day.attr("id", "2018-10-0" + i );
        } else{
            day.attr("id", "2018-10-" + i );
        }
        
        $(".days").append(day);   
    };

    var selectService = JSON.parse(sessionStorage.getItem('serviceSelected'));
    console.log(selectService);
    var totalPrice = sessionStorage.getItem("servicePrice");
    console.log(totalPrice);
    var totalTime = sessionStorage.getItem("serviceTime");
    console.log(totalTime);
    var uId = sessionStorage.getItem("userId");
    // console.log(data);
    var timesArray = [];        //array that will hold the time slots available
    var chosenDate;
    var apptTime;


    $(document).on("click", ".day", function(event){
        event.preventDefault();
        chosenDate = $(this).attr("id");
        //make get request for time slots and post the ones that apply 
        //need to send with the selected date in the format YYYY-MM-DD HH:MM:SS use moment for this 
        timesArray = [];
        $(".morning").empty();
        $(".afternoon").empty();
        
        console.log(chosenDate);

        $.get("/api/schedule/" + chosenDate,function (data) {
            timesArray = [];
            // console.log(data);
            timesArray = getTimeSlots(sortTimeData(data));
            console.log(timesArray);

            for (let i = 0; i < timesArray.length; i++) {
                let temp = convertTime(timesArray[i])
                let timeBtn = $("<button>").addClass("btn btn-info time-btn")
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
        });
    });


    $(document).on("click", ".time-btn", function(event) {
        event.preventDefault();
        var index = $(this).data("id");
        apptTime = timesArray[index];
        $(".modal-body").html(`
            Date: ${chosenDate} <br>
            Time: ${apptTime}
        `)
    })

    $(document).on("click", "#book-apt", function(event) {
        event.preventDefault();
        var temp = new Date('1970/01/01 ' + apptTime);
        var endTime = new Date(temp.getTime() + (totalTime * 60 * 1000));
        endTime = endTime.toString().split(" ")[4].substring(0, 5)

    
        var apptObj = {
            date: chosenDate, 
            start: apptTime, 
            end:endTime, 
            userId: 1 //uId
        }
        $.post("/api/schedule", apptObj, function(data) {
            console.log(data);
            // $.post("/api/details", )
        })
    });
    
    // function editTime(time) {
    //     if(time[0] === "0") {
    //         time = 
    //     }
    // }

    



    //sorts the array of appointments in places them in the correct order by time
    function sortTimeData(appointments) {
        var empStart = "9:00"  //start time set by employee
        var empEnd = "17:00"   //end time set by employee
        var startTime = empStart;

        //checks if there's an appointment at the very start of the shift
        for(let i = 0; i < appointments.length; i++) {
            if(appointments[i].start === empStart) {
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
        appointments.push({ start: empEnd });

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
      
        if(hourVar > 12) {
            hourVar = hourVar -12;
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