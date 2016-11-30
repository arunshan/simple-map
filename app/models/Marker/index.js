var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var markerSchema = new Schema({
    id: ObjectId,
    lat: Number,
    lng: Number,
    map: {type: Schema.Types.ObjectId, ref: 'Map'}
});

module.exports = mongoose.model('Marker', markerSchema);
