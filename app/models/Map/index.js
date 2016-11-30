var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var mapSchema = new Schema({
    id: ObjectId,
    topRightLat: Number,
    topRightLng: Number,
    bottomLeftLat: Number,
    bottomLeftLng: Number,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Map', mapSchema);
