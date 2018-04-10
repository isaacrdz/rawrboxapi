'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Review from './review';
var Schema = _mongoose2.default.Schema;

var JobSchema = new Schema({
  job: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  description: {
    type: String

  },
  salary: {
    type: Number

  },
  image: {
    type: String

  },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: {
      "lat": Number,
      "long": Number
    }

  }

});

module.exports = _mongoose2.default.model('Job', JobSchema);
//# sourceMappingURL=job.js.map