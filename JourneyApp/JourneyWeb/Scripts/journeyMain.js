//Get list with all vehicles belonging to the logged in user
function getMyVehicles(getData)
{
    $.ajax({
        type: 'get',
        datatype: "json",
        url: "/api/Vehicle",
        success: function (data) {
        }
    }).done(function (data) {
        getData(data);
    });
}