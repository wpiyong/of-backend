'use strict';

var questionsModel = require('../models/questionModel');
var logger = require('../logger/logger');

exports.create = function(newEvent, callback, errback) {
    questionsModel.create(newEvent, function (err, eventDoc) {
        if (err) {
            errback(err);
            return
        }
        callback(eventDoc);
    })
};

exports.getQuestions = function (questionType, callback) {
    questionsModel.find({type: questionType}, function (err, res) {
        if (err) {
            logger.logError('questionsService - getQuestions - error in questionsModel.find');
            logger.logError(err);
        }
        callback(err, res);
    })
};



