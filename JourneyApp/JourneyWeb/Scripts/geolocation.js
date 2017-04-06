//AIzaSyBZ6IHUZECmNx0KtMhynF1cwGAOdERa2h8

//http://stackoverflow.com/questions/2993563/how-do-i-return-a-variable-from-google-maps-javascript-geocoder-callback
//Get event
function getLocation(callback) {
    //var formattedAddress;
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition, error);
    }
    else {
        console.log("No support for geolocation");
    }

    function error(error)
    {
        console.log(error);
    }

    function showPosition(position)
    {
        var geocoder = new google.maps.Geocoder;
        var coords = position.coords;
        var latlng = { lat: parseFloat(coords.latitude), lng: parseFloat(coords.longitude) };

        geocoder.geocode({ 'location': latlng }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    callback(results[0].formatted_address);
                } else {
                    console.log("No match, sorry!");
                }
            } else {
                console.log("Error, sorry!");
            }
        });
    }

}