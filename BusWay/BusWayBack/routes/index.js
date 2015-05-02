var express = require('express');
var router = express.Router();
var overpassHelper = require('../../BusWayBack/business/overpassHelper');
var nominatimHelper = require('../../BusWayBack/business/nominatimHelper');
var routeHelper = require('../../BusWayBack/business/routeHelper');

router.post('/getPlatforms', function(req, res, next) {
    var callback = function(result){
        res.header("Access-Control-Allow-Origin", "*");
        res.json({ title: 'Express', rs: result });
    };
    overpassHelper.searchRoute(req.body.latitude,req.body.longitude,500, callback);
});

router.post('/getAdresses', function(req, res, next){
    var callback = function(result){
        res.header("Access-Control-Allow-Origin", "*");
        var js = JSON.parse(result);
        res.json({adresses: js})
    }
    nominatimHelper.getAdresses(req.body.target, callback);
});

router.post('/getRoutes', function(req, res, next){
    var callback = function(result){
        res.header("Access-Control-Allow-Origin", "*");
        //var js = JSON.parse(result);
        res.json({route: result})
    }
    routeHelper.getRoute(req.body.latitude,req.body.longitude, req.body.targetLat, req.body.targetLon, callback);
});

module.exports = router;
