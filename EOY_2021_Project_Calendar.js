// Events have been hard-coded in to compensate for the need to demonstate 'random event' selection
// UNIX EPOCH INFORMATION PROVIDED FROM WIKIPEDIA & STACKOVERFLOW

// LINK FOR VIEWERS: https://studio.code.org/projects/applab/ZiFZHv1jz8_Snar-eIs-xkfnhh80lJ1HkH0z1dIWsHA
// LINK FOR MYSELF: https://studio.code.org/s/csp8-2020/lessons/3/levels/3

/* 
  Each item in the events list also contains it's own array as follows:
  NAME,
  PLACE,
  
  ARRAY DATE AS: Month Name ; YYYY ; DD
  ARRAY DATE AS: Hour ; Minute ; Suffix
*/

var scheduledEvents = [
  [
    "Order Pizza", 
    "Pizza Hut",
      
    [
      "January",
      "15",
      "2021"
    ],
      
    [
      "1",
      "50",
      "p.m."
    ],
  ],
  
  [
    "Attend School", 
    "School",
      
    [
      "January",
      "20",
      "2021"
    ],
      
    [
      "7",
      "50",
      "a.m."
    ],
  ],
  
  [
    "Write Code", 
    "Code.org",
      
    [
      "March",
      "2",
      "2021"
    ],
      
    [
      "8",
      "50",
      "p.m."
    ],
  ],
  
  [
    "Skip Meeting", 
    "Work",
      
    [
      "March",
      "8",
      "2021"
    ],
      
    [
      "5",
      "00",
      "p.m."
    ],
  ],
];

// Time is measured in miliseconds and the unix epoch is based in the year 1970 (Wikipedia)
// CONVERSION WORKS AS FOLLOWS: Milliseconds / Mins / Hrs / Days / Years
var seconds = getTime() / 1000;
var minutes = seconds / 60;
var hours = minutes / 60;
var days = hours / 24;
var years = days / 365;

// The below gives us the years by applying the knowledge of unix epoch to the equation(s) above
var presetYear = Math.round(years) + 1970;

// [Month, Days in Month (without leapyear), # of Events in Month]
// Each month is listed in chronological order
var months = [
  ["January", 31, 0 + 2],
  ["February", 28, 0],
  ["March", 31, 0 + 2],
  ["April", 30, 0],
  ["May", 31, 0],
  ["June", 30, 0],
  ["July", 31, 0],
  ["August", 31, 0],
  ["September", 30, 0],
  ["October", 31, 0],
  ["November", 30, 0],
  ["December", 31, 0],
];

// Hours will contain numbers 1-12 upon the program running and be thrown into an 'hours' dropdown menu
// Hours will contain numbers 0-60 upon the program running and be thrown into an 'minutes' dropdown menu
var hours = [];
var minutes = [];

/*
  The function below will take the months in a year from the 'months' array and will
  input it into an dropdown menu so the user can select later on
  
  THIS RUNS UPON THE INITIAL LAUNCH OF THE APPLICATION
*/

function monthSetup() {
  var tempMonths = [];
  
  for (var mths=0; mths < months.length; mths++) {
    tempMonths.push(months[mths][0]);
  }
  
  //console.log(tempMonths);
  setProperty("dateMonth", "options", tempMonths);
  setProperty("randomMonth", "options", tempMonths);
}

/* 
  The function below will set up the 'hours' and 'minutes' array and input the necessary information
  that is required to the 'Hours' and 'Minutes' dropdown menu respectfully
  
  When ran, the 'th' time variable will be pushed to 'hours' and the 'tm' time variable will be pushed to 'minutes'
  All of this information will be output to a drop menu at the end of the algorithm
  
  TH = Time Minutes
  TM = Time Seconds
*/

function timeSetup() {
  
  for (var th=1; th < 13; th++) {
    hours.push(th);
  }
  //console.log(hours);
  
  for (var tm=0; tm < 61; tm++) {
    if (tm <= 9) {
      minutes.push("0" + tm);
    } else {
      minutes.push(tm);
    }
    
  }
  // console.log(minutes);
  
  setProperty("timeHour", "options", hours);
  setProperty("timeMinute", "options", minutes);
}

/* 
  The function below will check for if the year that the user inputted is a leapyear from the 'dateYear' input from the user
*/

function checkLeapYear(year) {
  var leapYear = false;
  
  if ((year % 4) == 0) {
    leapYear = true;
    //console.log("This is a leap year indeed!");
  } else {
    //console.log("This is not a leap year!");
  }
  
  return leapYear;
}

// The function below checks for how many days are in a given month within a year
// This will also account for leap[year in january]

function checkDays(month, leapyear) {
  var days = 0;
  
  for (var mths=0; mths < months.length; mths++) {
    
    if (months[mths][0] == month) {
      if ((months[mths][0] == "February") && (leapyear == true)) {
        days = 29;
      } else {
        days = months[mths][1];
      }
    }
  }
  
  return days;
}

/* 
  When the user has inputted all necessary information and then fires the createEvent event,
  this will input the event information within a text-label by the order in which it was created 
*/

function updateDateDirectory() {
  setProperty("eventDisplay", "text", "");
  
  var dateDirectoryString = "";
  var temporaryDate = "";
  
  for (var i = 0; i < scheduledEvents.length; i++) {
    
    for (var ia = 0; ia < scheduledEvents[i].length; ia++) {
      if (typeof(scheduledEvents[i][ia]) == "string") {
        //console.log("Is a string!");
        if (ia == 0) {
          temporaryDate += String(scheduledEvents[i][ia]) + " @ ";
        } else if (ia == 1) {
          temporaryDate += String(scheduledEvents[i][ia]) + " on ";
        }

      } else if (typeof(scheduledEvents[i][ia]) == "object") {
        
        for (var ib = 0; ib < scheduledEvents[i][ia].length; ib++) {
          if (ia == 2) {
            if ((ib == 0)) {
              temporaryDate += String(scheduledEvents[i][ia][ib]) + " ";
            } else if (ib == 1) {
              temporaryDate += String(scheduledEvents[i][ia][ib]) + ", ";
            } else if (ib == 2) {
              temporaryDate += String(scheduledEvents[i][ia][ib]) + " at ";
            }
          } else if (ia == 3) {
            if ((ib == 0)) {
              temporaryDate += String(scheduledEvents[i][ia][ib]) + ":";
            } else if (ib == 1) {
              temporaryDate += String(scheduledEvents[i][ia][ib]) + "";
            } else if (ib == 2) {
              temporaryDate += String(scheduledEvents[i][ia][ib]);
            }
          }
        }
      }
    }
    
    
    //console.log(temporaryDate);
    dateDirectoryString += temporaryDate + "\n\n";
    temporaryDate = "";
  }
  
  setProperty("eventDisplay", "text", dateDirectoryString);
}

// Updates the number of days in a month once a user selects a different month; accounts for leapyear in February as well
// Utilizes the 'checkLeapYear' function  and 'checkDays' function

function daysAsList() {
  var inputYear = parseInt(getText("dateYear", "text"));
  var isLeapYear = checkLeapYear(inputYear);
  //console.log(getProperty("dateYear", "text"));
  
  var daysInMonth = checkDays(getProperty("dateMonth", "text"), isLeapYear);
  //console.log(daysInMonth);
  
  var listedDays = [];
  
  for (var i = 1; i < daysInMonth + 1; i++) {
    listedDays.push(i);
  }
  
  return listedDays;
}

// When a user selects a random month, and then fires the 'randomEvent' function,

/* 
  Works as follows
  
  A month is inputted, the first traversal checks for where the month given is in the months array.
  Once that is selected, it will check if there is any events (0 for no events). If the value is greater than
  zero, it will fire an else function which will then check for which events have the given month in it's array
  and will then push it to another array to be sorted.
  
  The setProperty function will then format the date, time, and rest of the information.
  However, the setProperty function will use that information based upon a random event.
*/

function randomEvent(chosenMonth) {
  var chosenMonthEvents = [];
  
  for (var i = 0; i < months.length; i++) {
    if (months[i][0] == chosenMonth) {
      if (months[i][2] == 0) {
        setProperty("eventOutput", "text", "No events scheduled for this month");
      } else {
        for (var j = 0; j < scheduledEvents.length; j++) {
          for (var k = 0; k < scheduledEvents[j].length; k++) {
            if (scheduledEvents[j][2][0] == chosenMonth) {
              chosenMonthEvents.push(scheduledEvents[j]);
            }
          }
        }
        
      var randomSelect = randomNumber(0, chosenMonthEvents.length - 1);
      
      setProperty(
          "eventOutput", 
          "text", 
          "Name: " + chosenMonthEvents[randomSelect][0] + "\n\n" +
          "Date: " + chosenMonthEvents[randomSelect][2][0] + " " + chosenMonthEvents[randomSelect][2][1] + ", " + chosenMonthEvents[randomSelect][2][2] + "\n\n" +
          "Time: " + chosenMonthEvents[randomSelect][3][0] + ":" + chosenMonthEvents[randomSelect][3][1] + chosenMonthEvents[randomSelect][3][2] + "\n\n" +
          "Location: " + chosenMonthEvents[randomSelect][1]
        );
      }
    }
  }
}

// When this is fired, create a nested array within scheduledEvents containing the events information
onEvent("createEvent", "click", function() {
  
  for (var i = 0; i < months.length; i++) {
    if (getProperty("dateMonth", "text") == months[i][0]) {
      months[i][2] += 1;
    }
  }
  
  scheduledEvents.push(
    [
      getProperty("eventName", "text"), 
      getProperty("placeName", "text"),
      
      [
        getProperty("dateMonth", "text"),
        getProperty("dateDay", "text"),
        getProperty("dateYear", "text")
      ],
      
      [
        getProperty("timeHour", "text"),
        getProperty("timeMinute", "text"),
        getProperty("timeSuffix", "text")
      ],
    ]);
  
  updateDateDirectory();
});

// Gets the days within a month once selected (leapyear is accounted for), outputs to dropdown menu)
onEvent("dateMonth", "change", function() {
  var days = daysAsList();
  setProperty("dateDay", "options", days);
});

// Gets the days within the given month (leapyear is accounted for), outputs to dropdown menu
onEvent("dateYear", "change", function() {
  var days = daysAsList();
  setProperty("dateDay", "options", days);
});

// Once a month is selected, this will schedule an event at random then outputs to a text-label
onEvent("randomEvent", "click", function(){
  var selectedMonth = getText("randomMonth");
  randomEvent(selectedMonth);
});

// Sets up the hours and minutes for the time dropdown menus
timeSetup();
monthSetup();

// Gets the number of days within a month
var setupDays = daysAsList();
setProperty("dateDay", "options", setupDays);

// Works from unix epoch equation at the beginning of the application (lines 85-92)
setProperty("dateYear", "text", presetYear);

// Updates the event display with pre-determined events but will be used later on to account for new events
updateDateDirectory();
