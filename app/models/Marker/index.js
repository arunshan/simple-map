var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var mapSchema = new Schema({
    id: ObjectId,
    lat: Number,
    lng: Number,
    map: {type: Schema.Types.ObjectId, ref: 'Map'}
});

module.exports = mongoose.model('Marker', userSchema);
