'use strict';

var express = require('express'),
    router = express.Router(),
    jwt = require('jsonwebtoken'),
    config = require('../config/config'),
    questionsService = require('../services/questionsService'),
    async = require('async'),
    uuidV4 = require('uuid/v4'),
    logger = require('../logger/logger');

router.get('/', function(req, res, next) {
  res.send('respond with a question router');
});

router.get('/questions', function(req, res, next) {
    var type = req.query.type;
    console.log(type);
    questionsService.getQuestions(type, function(err, data) {
        if(err) {
            logger.logError('questionsRoutes - questions - error in questionsService.getQuestions');
            logger.logError(err);
            res.status(400).send({
                error: 400,
                message: err.message
            });
         } else {
            res.status(201).send({
                status: 201,
                data: data
             });
         }
    });
});

router.post('/newquestion', function (req, res, next) {
    //var decodedToken = jwt.decode(req.headers.token, config.jwtSecret);
    console.log('start');
    console.log(req.body.type + ' ' + req.body.content);
    var createEvent = {
        qid: uuidV4(),
        type: req.body.type,
        content: req.body.content
    }
    async.waterfall([
        function (callback) {
            //create an event
            questionsService.create(createEvent, function (eventDoc) {
                callback(null, eventDoc);
            }, function (err) {
                logger.logError('EventRoutes - newEvent - error creating event document');
                logger.logError(err);
                callback(err)
            })
        },
    ], function (err, results) {
        if (err) {
            res.status(401).send({
                error: {
                    status:401,
                    message: err
                }
            });
            return
        }
        res.status(201).send({
            success: {
                status: 201,
                message: 'event has been successfully created and gas have been alerted'
            }
        })
    });
});

module.exports = router;