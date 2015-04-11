var express = require('express');
var router = express.Router();
var overpassHelper = require('../../BusWayBack/business/overpassHelper');

router.post('/getPlatforms', function(req, res, next) {
    var callback = function(result){
        res.header("Access-Control-Allow-Origin", "*");
        res.json({ title: 'Express', rs: result });
        res.render();
    };
    overpassHelper.getStations(req.body.latitude,req.body.longitude,500, callback);
});

module.exports = router;
