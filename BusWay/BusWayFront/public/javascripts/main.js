/**
 * Created by Эмиль on 19.04.2015.
 */
$(document).ready(function(){
    $("#addressForm").bind("submit", function(e){
        e.preventDefault();
        getAdresses();
        /*if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getWay);
        } else {
            alert("Geolocation is not supported by this browser.");
        }*/
    });
});

function getAdresses()
{
    $.get('/views/adresses.ejs', function (template) {
        var func = ejs.compile(template);
        $.ajax({
            url: "http://localhost:3001/getAdresses",
            data: {
                target: encodeURIComponent($('#target').val())
            },
            dataType: 'json',
            type: "post",
            success: function (data) {
                var insertHtml = func(data);
                $('#adresses').html(insertHtml);
            },
            error: function (data) {
                var a = 1;
            }
        });
    });
}

function getWay(position){
    $.get('/views/platforms.ejs', function (template) {
        var func = ejs.compile(template);
        $.ajax({
            url: "http://localhost:3001/getPlatforms",
            data: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                target: $("#addressForm").serialize()
            },
            dataType: 'json',
            type: "post",
            success: function (data) {
                var insertHtml = func(data);
                $('#platforms').html(insertHtml);
            },
            error: function (data) {
                var a = 1;
            }
        });
    });
}

function getRoute(e) {
    e.preventDefault();
    var lat;
    var lon;
    var call = function(position)
    {
        lat = 53.67287;
        lon = 23.83165;
        //lat= position.coords.latitude;
        //lon = position.coords.longitude;
        getRoute2(e, lat, lon);
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(call);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function getRoute2(e, lat, lon)
{
    $.get('/views/route.ejs', function (template) {
        var func = ejs.compile(template);
        $.ajax({
            url: "http://localhost:3001/getRoutes",
            data: {
                latitude: lat,
                longitude: lon,
                targetLat: e.toElement.attributes.lat.value,
                targetLon: e.toElement.attributes.lon.value
            },
            dataType: 'json',
            type: "post",
            success: function (data) {
                var insertHtml = func(data);
                $('#route').html(insertHtml);
            },
            error: function (data) {
                var a = 1;
            }
        });
    });
}