/**
 * Created by Эмиль on 10.04.2015.
 */
var http = require('http');

exports.getStations = function(latitude, longitude, around, routerCallback)
{
    around = 500;
    latitude = 53.67287;
    longitude = 23.83165;
    var callback = function(response){
        console.log(response);
        var json = JSON.parse(response.replace("undefined",""));
        routerCallback(json.elements);
    };
    getPlatforms(latitude, longitude, around, callback);
}

function getPlatforms(latitude, longitude, around, callback){
    var query = '?data=[out:json];node[public_transport=platform](around:'+around+','+latitude+','+longitude+');out;';
    return getByQuery(query, callback);
}

function getRelations(latitude, longitude, around, callback){
    var query = '?data=[out:json];node[public_transport=platform](around:'+around+','+latitude+','+longitude+');relation(bn)->.x;(._;<;);out;';
    return getByQuery(query, callback);
}

function getByQuery(query, callback)
{
    // An object of options to indicate where to post to
    var options = {
        host: 'overpass-api.de',
        path: '/api/interpreter'+query
    };
    var str;
    var req = http.get(options, function(res) {
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
