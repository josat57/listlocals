/*
    jshint esversion: 6
 */

$(document).ready(function() {
    //On load of the document all countries are loaded into the country select input.
    getCountries();


    const country = document.querySelectorAll("#country")[0];
    const state = document.querySelectorAll("#state")[0];
    const lga = document.querySelectorAll("#lga")[0];

    //Get state by the country code when a country is selected
    country.addEventListener("change", (eobjs) => {
       const countryCode = eobjs.currentTarget.value;
       getStates(countryCode);
       getCities(countryCode);
    });

    //Get all the local governments by the state code when a state is selected
    state.addEventListener("change", (eobjs) => {
       const stateCode = eobjs.currentTarget.value;
       getLocalGovernments(stateCode);
    });
});

//Get countries
function getCountries(country_code = null){
    
    if(country_code === null) {
        $.getJSON("locals/countries.json", (data) =>{
            $("#country").html("");
            $("#country").append('<option value="">Select Country...</option>');
            $.each(data, function (idx, value) {
                $("#country").append('<option value="' + value.code + '">' + value.name + '</option>');
            });
        });
    } else {
        $.getJSON("locals/countries.json", (data) =>{
            $.each(data, function (idx, value) {
                if (country_code === value.code) {
                    $("#country : selected").prepend('<option value="' + value.code + '">' + value.name + '</option>');
                }
            });
        });
    }
}

//get state of districts by country code
function getStates(country_code) {
    $.getJSON("locals/states.json", (data) =>{
        $("#state").html("");
        $("#state").append('<option value="">Select State...</option>');
        $.each(data, function (idx, value) {
            if (idx === country_code) {
                $.each(Object.values(value), function (key, val) {
                    $("#state").append('<option value="' + val.code + '">' + val.name + '</option>');
                });
            }
        });
    });
}

// Get cities by country code
function getCities(country_code) {
    $.getJSON("locals/cities.json", (data) =>{
        $("#city").html("");
        $("#city").append('<option value="">Select City...</option>');
        $.each(data, function (idx, value) {
            if (idx === country_code) {
                $.each(Object.values(value), function (key, val) {
                    $("#city").append('<option value="' + val.code + '">' + val.name + '</option>');
                });
            }
        });
    });
}

function getLocalGovernments(state_code) {
    $.getJSON("locals/lga.json", (data) =>{
        console.log(data);
        alert("data");
        $("#lga").html("");
        $("#lga").append('<option value="">Select LGA...</option>');
        $.each(data, function (idx, value) {
            if (idx === state_code) {
                $.each(Object.values(value), function (key, val) {
                    $("#lga").append('<option value="' + val.code + '">' + val.name + '</option>');
                });
            }
        });
    });
}

