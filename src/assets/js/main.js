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
            $("#country").append('<option value="">Select Country/Region</option>');
            $.each(data, function (idx, value) {
                $("#country").append('<option value="' + value.code + '">' + value.name + '</option>');
            });
        });
    } else {
        $.getJSON("locals/countries.json", (data) =>{
            $.each(data, function (idx, value) {
                if (country_code === value.code) {
                    $("#country :selected").prepend('<option value="' + value.code + '">' + value.name + '</option>').trigger('change');
                }
            });
        });
    }
}

//get state of districts by country code
function getStates(country_code) {
    if (country_code.length === 2) {
        $.getJSON("locals/states.json", (data) =>{
            $("#state").html("");
            $("#state").append('<option value="">Select State/Province/Region</option>');
            $.each(data, function (idx, value) {
                if (idx === country_code) {
                    $.each(Object.values(value), function (key, val) {
                        $("#state").append('<option value="' + val.code + '">' + val.name + '</option>');
                    });
                }
            });
        });
    } else {
        $.getJSON("locals/states.json", (data) =>{
            $.each(data, function (idx, value) {
                $.each(Object.values(value), function (key, val) {
                    if (val.code === country_code) {
                        $("#state :selected").prepend('<option value="' + val.code + '">' + val.name + '</option>').trigger('change');
                    }
                });
            });
        });
    }
}

// Get cities by country code
function getCities(country_code) {
    $.getJSON("locals/cities.json", (data) =>{
        $("#city").html("");
        $("#city").append('<option value="">Select City/Town</option>');
        $.each(data, function (idx, value) {
            if (idx === country_code) {
                $.each(Object.values(value), function (key, val) {
                    $("#city").append('<option value="' + val.code + '">' + val.name + '</option>');
                });
            }
        });
    });
}

function getLocalGovernments(state_code, lga_code = null) {
    if (lga_code === null) {
        $.getJSON("locals/lga.json", (data) =>{        
            $("#lga").html("");
            $("#lga").append('<option value="">Select LGA/District</option>');
            $.each(data, function (idx, value) {
                if (idx === state_code.slice(0, 2)) {
                    $.each(value, function (inx, state_values) {
                        $.each(state_values, function (nx, lga_values) {
                            console.log(nx, lga_values);
                            if (nx === state_code) {
                                $.each(Object.values(lga_values), function (key, val) {
                                    $("#lga").append('<option value="' + val.code + '">' + val.name + '</option>');
                                });
                            }
                        });
                    });
                }
            });
        });
    } else {
        $.getJSON("locals/lga.json", (data) =>{  
            $.each(data, function (idx, value) {
                if (idx === state_code.slice(0, 2)) {
                    $.each(value, function (inx, state_values) {
                        $.each(state_values, function (nx, lga_values) {
                            if (nx === state_code) {
                                $.each(Object.values(lga_values), function (key, val) {
                                    if (val.code === lga_code) {
                                        $("#lga :selected").prepend('<option value="' + val.code + '">' + val.name + '</option>').trigger('change');
                                    }
                                });
                            }
                        });
                    });
                }
            });
        });

    }
}

