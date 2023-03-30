# listlocals
list local locations, from country to state to local government areas in Nigeria.

The main.js file contains the JavaScript code that handles the dynamic population of the country, state, local government area (LGA), and city select inputs based on the user's selection.

The getCountries() function is called on document load and retrieves all the countries from the countries.json file and populates the country select input with the retrieved data.

The country select input has an event listener that listens for a change in selection. When a country is selected, the getStates() and getCities() functions are called with the selected country code as the parameter. These functions retrieve the states and cities from the states.json and cities.json files respectively and populate the state and city select inputs with the retrieved data.

The state select input also has an event listener that listens for a change in selection. When a state is selected, the getLocalGovernments() function is called with the selected state code as the parameter. This function retrieves the local governments from the lga.json file and populates the LGA select input with the retrieved data.

All the functions that retrieve data from the JSON files use the jQuery getJSON() method to retrieve the data and the jQuery each() method to loop through the data and populate the select inputs with the retrieved data.

The code also includes some jQuery methods to manipulate the select inputs, such as the html() method to clear the select input and the append() method to add options to the select input.

Overall, the main.js code provides a dynamic and user-friendly way for users to select their country, state, LGA, and city.

main.js - getLocalGovernments

main.js - getCities

main.js - getStates

main.js - getCountries

