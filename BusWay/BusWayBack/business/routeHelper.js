/**
 * Created by Эмиль on 19.04.2015.
 */
var overpassHelper = require('../../BusWayBack/business/overpassHelper');

exports.getRoute = function(startLat, startLon, targetLat, targetLon, callback){
    var startStations;
    var targetStations;
    var targetStationsCallback = function(result){
        targetStations = result;

       for(var i=0; i<startStations.length; i++)
       {
           if (startStations[i].type==='relation')
           {
               var start=0;
               var end=0;
               for(var j=0; j<startStations[i].members.length; j++)
               if (startStations[i].members[j].type==="node")
               {
                   for(var k=0; k<targetStations.length; k++){
                       if (startStations[i].members[j].ref == targetStations[k].id)
                       {
                           var result = startStations[i];
                           callback(result);
                           return;
                       }
                   }
               }
           }
       }
    };
    var startStationsCallback = function(result){
        startStations = result;
        overpassHelper.getStations(targetLat, targetLon,500, targetStationsCallback);
    };
    overpassHelper.searchRoute(startLat, startLon, 500, startStationsCallback);

}

