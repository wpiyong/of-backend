'use strict';

var mongoose = require('mongoose');


var questionSchema = new mongoose.Schema({
        qid: { type: String, required: true },
        content: { type: String, required: true },
        type: {type: String, required: true}
    }, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
    }
});


var question = mongoose.model('question', questionSchema, 'question');

module.exports = question;