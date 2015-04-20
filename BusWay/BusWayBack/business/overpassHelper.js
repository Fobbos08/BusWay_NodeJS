/**
 * Created by Эмиль on 10.04.2015.
 */
var http = require('http');

exports.searchRoute = function(latitude, longitude, around, routerCallback)
{
    around = 500;
    latitude = 53.67287;
    longitude = 23.83165;
    var callback = function(response){
        console.log(response);
        var json = JSON.parse(response);
        var relations = '{"relations":[';
        var bool = false;
        for(var i=0; i<json.elements.length; i++)
        {
            if (json.elements[i].type === 'relation' )
            {
                if (bool)
                {
                    relations += ",";
                }
                else
                {
                    bool = true;
                }
                relations += JSON.stringify(json.elements[i]);

            }
        }
        var jj = JSON.parse(relations+="]}");
        routerCallback(json.elements);
    };
    getRelations(latitude,longitude,around,callback);
}

exports.getStations = function(latitude, longitude, around, routerCallback)
{
    var callback = function(response){
        console.log(response);
        var json = JSON.parse(response);
        routerCallback(json.elements);
    };
    getPlatforms(latitude, longitude, around, callback);
}

function getPlatforms(latitude, longitude, around, callback){
    var query = '?data=[out:json];node[public_transport=platform](around:'+around+','+latitude+','+longitude+');out;';
    getByQuery(query, callback);
    //return getByQuery(query, callback);
}

exports.getPlatformByRef = function(ref, callback){
    var query = '?data=[out:json];node('+ref+');out;';
    getByQuery(query, callback);
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
    var str="";
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
