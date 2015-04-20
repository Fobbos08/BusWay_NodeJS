/**
 * Created by Эмиль on 28.03.2015.
 */
//Определяет, есть ли возможность получить информацию о геопозиции
window.onload = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    function showPosition(position) {
        $.get('/views/platforms.ejs', function (template) {
            var func = ejs.compile(template);
            $.ajax(
                {
                    url:"http://localhost:3001/getPlatforms",
                    data:{
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    },
                    dataType: 'json',
                    type: "post",
                    success: function(data)
                    {
                        var insertHtml = func(data);
                        $('#platforms').html(insertHtml);
                    },
                    error: function(data)
                    {
                        var a = 1;
                    }
                }
            );
        });
    }
