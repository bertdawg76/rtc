var odm = require('mongoose');

var QuestionSchema = new odm.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    postedBy: { type: odm.Schema.Types.ObjectId, ref: 'User', required: false },
    createdOn: { type: Date, default: Date.now }
});

// the third argument is the collection name
module.exports = odm.model('Question', QuestionSchema, 'questions');



/*var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    createdOn: { type: Date, default: Date.now }
});

// the third argument is the collection nam
mongoose.model('Question', QuestionSchema);*/