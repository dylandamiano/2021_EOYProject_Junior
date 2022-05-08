// 2 person project with multiple groups
// LINK FOR VIEWERS: https://studio.code.org/projects/applab/e3NVXSNzJxxMe4T8HqEN-RrrfqLCcBQD8g5vPXKhmpw
// LINK FOR MYSELF: https://studio.code.org/s/csp5-2020/lessons/17/levels/2

var volData = "Volcano Eruptions"; // Volcanic Data

var tempCountries = getColumn(volData, "Country");
var unorganizedCountries = getColumn(volData, "Country");
var country = []; // ORGANIZES COUNTRYS BY ALPHABETICAL ORDER WITHOUT DUPLICATES

var volcanos = getColumn(volData, "Volcano Name"); // Gets all the volcanos in a list
var type = getColumn(volData, "Type"); // Gets the volcano type(s) in a list
var year = getColumn(volData, "Last Known Eruption"); // Gets the last known eruptions of the volcanos
var region = getColumn(volData, "Region");
var rockType = getColumn(volData, "Dominant Rock Type");
var tectonicInfo = getColumn(volData, "Tectonic Setting");


// USES AN EMBEDDED ARRAYS THAT COUNTAIN COUNTRYAFTER LOOPING THROUGH THE "COUNTRY" ARRAY, AND VOLCANIC INFORMATION
var fullCountryStats = []; 

// *** BELOW STARTS THE FUNCTIONS FOR THE WHOLE PROGRAM *** \\\ 

// The function below plots points on the Screen by the name of "2.2"
function plotScreen(countryName) { 
  var noSpaces = countryName.replace(/ /g, ""); // Removes spaces
  setProperty(noSpaces, "hidden", false); // Shows the points on the map, after all, "X" marks the spot :)
}

// The function below updates screen 3.1 when the function is ran
function updateFacts(countryChosen) {
  var volcanoText = ""; // Volcano text is used in column #1 to list all the volcanos within a country
  var yearText = ""; // Year text is used in column #2 to list all the last eruptions within a country
  var typeText = ""; // Type text is used in column #3 to list all the volcano types
  
  var tempVolcanos = []; // Organizes volcanos in a list temporarily to list volcanos on Screen 1.3's drop-down menu 

  for (var i = 0; i < fullCountryStats[countryChosen].length; i++) {
    // ** The 3 below are used to set the text columns on screen 3.1 ** \\
    volcanoText += fullCountryStats[countryChosen][i][0] + "\n" + "\n";
    yearText += fullCountryStats[countryChosen][i][2] + "\n" + "\n";
    typeText += fullCountryStats[countryChosen][i][1] + "\n" + "\n";
    
    tempVolcanos.push(fullCountryStats[countryChosen][i][0]); // Adds a volcano to the tempVolcanos list for export later to a drop-down menu
    
    // ** Mostly a debugger below to ensure that the volcanic information is being displayed properly ** \\
    console.log(
        fullCountryStats[countryChosen][i][0] + " " + fullCountryStats[countryChosen][i][1] + " " +
        fullCountryStats[countryChosen][i][2] + " " + fullCountryStats[countryChosen][i][3] + " " +
        fullCountryStats[countryChosen][i][4]
      );
    
  }
  
  // ** The 3 below set the text columns on screen 3.1 ** \\
  setText("countryText", volcanoText);
  setText("yearText", yearText);
  setText("typeText", typeText);
  
  setProperty("selectRockInfo", "options", tempVolcanos); // Sets the drop-down menus list on 1.3 to all volcanos referred to in 'tempVolcanos'
}

// ** The Function below is used to clear screens when switched ** \\
function clearScreen(screen) {
  if (screen == "3.1") {
    
    setText("countryText", "");
    setText("yearText", "");
    setText("typeText", "");
    
  } else if (screen == "2.2") { 
    // 2.2 is mostly dual-purpose. Clears when the screen is switched or when "Clear" is clicked on screen 2.2
    
    for (var i = 0; i < country.length; i++) {
      //console.log("Cleared!");
      var newVar = country[i].replace(/ /g, ""); // Removes spaces in the country name that will be used to plot points
      setProperty(newVar, "hidden", true); // hides the points on screen 2.2
    }
    
  } else if (screen == "1.3") {
    
    setText("volcanoFacts", "");
    setText("techonicinfo", "");
    
  }
}

/* 
  The function below takes the unorganized list of volcanos and condenses it into a neater, 
  smaller list by alphabetical order 
*/

function filterCountries() {
  var countryCount = 1;
  var iteratedPrior = false;
  
  country = []; // empty the volcano list when updating
  tempCountries.sort(); // Sort by alphabetical order
  
  for (var i = 0; i < tempCountries.length; i++) {
    if (tempCountries[countryCount] == tempCountries[i]) {
      
      if (iteratedPrior == false) {
        // Iterated prior is used here to check if a country was already added to a list
        iteratedPrior = true;
        appendItem(country, tempCountries[i]);
        appendItem(fullCountryStats, tempCountries[i] = []);
      }
      
    } else if (tempCountries[countryCount] != tempCountries[i]) { 
      // Checks to see if a country was iterated prior
      // If not, then we move onto the next country
      
      countryCount = i;
      iteratedPrior = false;
      
    } else if (i == tempCountries.length) { 
      // not necessarily needed since the loop will exit when it is at the end of the list anyways
      // mostly here incase i need to add something else later
      
      break; // stops the loop ( of course )
      
    }
  } 
}

filterCountries();

/* 
  The lines below above the next function are used
  to set the selection information for 1.3 and 3.1
*/

var tempText = [];

for (var i = 0; i < country.length; i++) {
  tempText.push(country[i]);
}

setProperty("selectDropdown", "options", tempText); 
setProperty("countrySelect", "options", tempText);

// tempText = [];

//console.log(country); || WORKS AS INTENDED

//for (var i = 0; i < country.length; i++) {
//  fullCountryStats.push(country[i] = []);
//}

/* 
  The function below organizes volcanos by Country in an embedded list inside of another list
  
  If we want to find the country, we must refer to the 'country' array specifically when running a loop then
  use the index of the country to find the volcanic information
*/

function makeVolcanoGroup() {
  // unorganizedCountries
  // var tempList = [volcano, year, type, rock];
  //console.log(country);  
  for (var i = 0; i < unorganizedCountries.length; i++) {
    for (var c = 0; c < country.length; c++) {
      if (country[c] == unorganizedCountries[i]) {
        // console.log("Match!"); || WORKS AS INTENDED
        var tempList = [volcanos[i], type[i], year[i], rockType[i], tectonicInfo[i], region[i]];
        // console.log(tempList); // || WORKS AS INTENDED
        appendItem(fullCountryStats[c], tempList); // adds volcano information to the country in the stats array
      }
    }
  }
}

makeVolcanoGroup();

// *** BELOW STARTS THE ON-EVENT FUNCTIONS FOR SCREEN CHANGES & WILL CLEAR SCREENS WHEN CHANGED *** \\
onEvent("3.1Button3", "click", function(){
  setScreen("3.1");
  clearScreen("1.3");
  clearScreen("2.2");
});
  
onEvent("3.1Button2", "click", function(){
  setScreen("3.1");
  clearScreen("1.3");
  clearScreen("2.2");
});

onEvent("2.2Button", "click", function(){
  setScreen("2.2");
  clearScreen("3.1");
  clearScreen("1.3");
});
  
onEvent("2.2Button2", "click", function(){
  setScreen("2.2");
  clearScreen("3.1");
  clearScreen("1.3");
});
  
onEvent("1.3Button", "click", function(){
  setScreen("1.3");
  clearScreen("3.1");
  clearScreen("2.2");
});

onEvent("1.3Button2", "click", function(){
  setScreen("1.3");
  clearScreen("3.1");
  clearScreen("2.2");
});

// EXAMPLE FOR UPDATEFACTS USAGE BELOW: updateFacts(fullCountryStats[1]);
onEvent("selectDropdown", "change", function () {
  var countryName = getText("selectDropdown"); // gets the country text
  var index = 0; // used to get the country in the fullcountrystats list
  
  for (var i = 0; i < country.length; i++) { 
    /* 
      Will loop through the country list to verify that the name of the country is
      correct
    */
    if (countryName == country[i]) {
      index = i;
    }
  }
  
  updateFacts(index); // updates the information on screen 3.1
});

// BELOW STARTS THE ON-EVENT FUNCTIONS FOR INPUTTED-USER EVENTS

onEvent("selectRockInfo", "change", function () {
  /* 
    This event updates the rock volcano and rock information on screen 1.3
  */
  
  var volcanoName = getText("selectRockInfo");
  
  console.log("Selected Volcano");
  
  for (var i = 0; i < fullCountryStats.length; i++) { // go through the countries in fullcountrystats
    for (var x = 0; x < fullCountryStats[i].length; x++) { // find the volcanoName
      if (fullCountryStats[i][x][0] == volcanoName) { // If volcano name is accuratly given then proceed with the rest
        var volcanoFacts = "";
        var regionFacts = "";
        
        //console.log("Volcano Match!");
        
        // Updates all volcano information neatly and with full descriptions
        volcanoFacts += "Country: " + country[i] + "\n" ;
        volcanoFacts += "Volcano Name: " + fullCountryStats[i][x][0] + "\n";
        volcanoFacts += "Rock Type: " + fullCountryStats[i][x][3] + "\n";
        volcanoFacts += "Last Eruption: " + fullCountryStats[i][x][2] + "\n";
        volcanoFacts += "Volcano Type: " + fullCountryStats[i][x][1] + "\n";
        
        // Updates region information
        regionFacts += "Tectonic: " + fullCountryStats[i][x][4] + "\n" + "\n";
        regionFacts += "Region: " + fullCountryStats[i][x][5];
        
        setText("techonicinfo", regionFacts);
        setText("volcanoFacts", volcanoFacts);
      }
    }
  }
});

// Clears the points added on-to screen 2.2
onEvent("clearPts", "click", function(){
  clearScreen("2.2");
});

// Adds points on-to screen 2.2
onEvent("mapPoints", "click", function(){
  plotScreen(getText("countrySelect"));
});

// CLEAR THE SCREEN(s) WHEN THE APP STARTS
clearScreen("3.1");
clearScreen("2.2");
clearScreen("1.3");
