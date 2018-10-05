
$(document).ready(function(){
    

    $(".day").click( function(){
        $(".morning").empty();
        $(".afternoon").empty();

        //make get request for time slots and post the ones that apply 
        // need to send with the selected date in the format YYYY-MM-DD HH:MM:SS use moment for this 
        var inputDate;


        var timesArray = [];

        $.ajax("/api/calendar", {
            type: "GET",
            data: inputDate
        }).then(function (data) {
            timesArray = getTimeSlots(sortTimeData(data));
            // console.log(timesArray);

            for (let i = 0; i < timesArray.length; i++) {
                let temp = convertTime(timesArray[i])
                let timeBtn = $("<button>").addClass("btn btn-info").text(temp);
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


    //sorts the array of appointments in places them in the correct order by time
    function sortTimeData(appointments) {
        var empStart = "9:00"  //start time set by employee
        var empEnd = "17:00"   //end time set by employee
        var startTime;

        //checks if there's an appointment at the very start of the shift
        for(let i = 0; i < appointments.length; i++) {
            if(appointments[i].start === empStart) {
                startTime = new Date('1970/01/01 ' + empStart);
                startTime = new Date(startTime.getTime() - 60000).toString().split(" ")[4].substring(0, 5);
                break;
            }
            else {
                startTime = empStart;
            }
        }
        
        appointments.push({ start: startTime, end: startTime });
        appointments.push({ start: empEnd });

        appointments.sort(function (a, b) {
            return new Date('1970/01/01 ' + a.start) - new Date('1970/01/01 ' + b.start);
        });

        return appointments;
    };

    //finds the free time slots between each appt. 
    //and calculates the starting times available depending on the service duration
    function getTimeSlots(appointments) {

        var serviceTime = 30;   //duration of service in minutes
        var dateEvents = appointments.map(function (event) {
            return {
              start: new Date('1970-01-01 ' + event.start),
              end: new Date('1970-01-01 ' + event.end)
            };
          });
          
          var requiredGap = serviceTime * 60 * 1000;
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

    function convertTime(inTime) {                  //converts 24-hr format to am/pm format
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