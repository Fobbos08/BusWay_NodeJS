/**
 * Created by Эмиль on 19.04.2015.
 */
var http = require('http');

exports.getAdresses = function(query, callback) {
    getByQuery(query, callback);
}

function getByQuery(query, callback)
{
    // An object of options to indicate where to post to
    query = query.replace(' ', '%20');

    var url = 'http://nominatim.openstreetmap.org/search.php?q='+query+'&format=json';
    var str = '';
    var req = http.get(url, function(res) {
        res.on('data', function (chunk) {
            str += chunk;
        });

        res.on('end', function () {
            callback(str);
            console.log(str);
        });
    });
    req.end();
    return str;
}