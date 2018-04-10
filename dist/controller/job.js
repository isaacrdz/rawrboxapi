'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _job = require('../model/job');

var _job2 = _interopRequireDefault(_job);

var _authMiddleware = require('../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // CRUD: Create, Read, Update, Delete

  // '/v1/job/add' - Create

  // '/v1/job/add' - POST - add a food truck
  api.post('/add', function (req, res) {
    var newJob = new _job2.default();
    newJob.job = req.body.job;
    newJob.company = req.body.company;
    newJob.image = req.body.image;
    newJob.salary = req.body.salary;
    newJob.location.coordinates.lat = req.body.location.coordinates.lat;
    newJob.location.coordinates.long = req.body.location.coordinates.long;

    newJob.save(function (err) {
      if (err) {
        return res.send(err);
      }
      res.json({ message: 'Job saved successfully' });
    });
  });

  // '/v1/job' - Read
  api.get('/', function (req, res) {
    _job2.default.find({}, function (err, jobs) {
      if (err) {
        res.send(err);
      }
      res.json(jobs);
    });
  });

  // '/v1/job/:id' - Read by id
  api.get('/:id', function (req, res) {
    _job2.default.findById(req.params.id, function (err, job) {
      if (err) {
        res.send(err);
      }
      res.json(job);
    });
  });

  // '/v1/job/:id' - Updated PUT
  api.put('/:id', function (req, res) {
    newJob.findById(req.params.id, function (err, job) {
      if (err) {
        res.send(err);
      }
      newJob.job = req.body.job;
      newJob.company = req.body.company;
      newJob.image = req.body.image;
      newJob.salary = req.body.salary;
      newJob.location.coordinates.lat = req.body.location.coordinates.lat;
      newJob.location.coordinates.long = req.body.location.coordinates.long;
      newJob.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Job info Updated" });
      });
    });
  });

  // '/v1/job/:id' - Delete
  api.delete('/:id', function (req, res) {
    _job2.default.findById(req.params.id, function (err, job) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (job == nul) {
        res.status(404).send("Job not found");
        return;
      }
      _job2.default.remove({
        _id: req.params.id
      }, function (err, job) {
        if (err) {
          res.status(500).send(err);
          return;
        }
        Review.remove({
          _id: req.params.id
        }, function (err, review) {
          if (err) {
            res.send(err);
          }
          res.json({ message: "Foodtruck and Reviews succesfully removed" });
        });
      });
    });
  });

  //add review for specific job id
  // '/v1/job/reviews/add/:id'

  api.post('/reviews/add/:id', function (req, res) {
    _job2.default.findById(req.params.id, function (err, job) {
      if (err) {
        res.send(err);
      }
      var newReview = new Review();

      newReview.title = req.body.title;
      newReview.text = req.body.text;
      newReview.job = job._id;
      newReview.save(function (err, review) {
        if (err) {
          res.send(err);
        }
        job.reviews.push(newReview);
        job.save(function (err) {
          if (err) {
            res.send(err);
          }
          res.json({ message: 'Foodtruck review saved' });
        });
      });
    });
  });

  //get reviews for specific job id
  // '/v1/job/reviews/:id'
  api.get('/reviews/:id', function (req, res) {
    Review.find({
      job: req.params.id
    }, function (err, reviews) {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
  });

  // get job by foodtype
  // ‘/v1/job/foodtype/:foodtype’

  api.get('/foodtype/:foodtype', function (req, res) {
    _job2.default.find({
      foodtype: req.params.foodtype
    }, function (err, jobs) {
      if (err) {
        res.send(err);
      }
      res.json(jobs);
    });
  });

  return api;
};
//# sourceMappingURL=job.js.map