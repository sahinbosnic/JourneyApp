//AIzaSyBZ6IHUZECmNx0KtMhynF1cwGAOdERa2h8

//Get event
function getLocation() {
    var formattedAddress;
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
                    formattedAddress = results[0].formatted_address;
                    console.log(formattedAddress, "geolocation");
                } else {
                    console.log("No match, sorry!");
                }
            } else {
                console.log("Error, sorry!");
            }
        });
    }
    return formattedAddress;

}