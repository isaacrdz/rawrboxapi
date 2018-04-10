import mongoose from 'mongoose';
import {Router} from 'express';
import Job from '../model/job';

import  { authenticate } from '../middleware/authMiddleware';

export default({config, db}) => {
  let api = Router();

  // CRUD: Create, Read, Update, Delete

  // '/v1/job/add' - Create

  // '/v1/job/add' - POST - add a food truck
    api.post('/add', (req, res) => {
      let newJob = new Job();
      newJob.job = req.body.job;
      newJob.company = req.body.company;
      newJob.image = req.body.image;
      newJob.salary = req.body.salary;
      newJob.location.coordinates.lat = req.body.location.coordinates.lat;
      newJob.location.coordinates.long = req.body.location.coordinates.long;


      newJob.save(function(err) {
        if (err) {
          return res.send(err);
        }
        res.json({ message: 'Job saved successfully' });
      });
    });



  // '/v1/job' - Read
  api.get('/', (req, res) => {
    Job.find({}, (err, jobs) => {
      if (err) {
        res.send(err);
      }
      res.json(jobs);
    });
  });

  // '/v1/job/:id' - Read by id
  api.get('/:id', (req, res) => {
    Job.findById(req.params.id, (err, job) => {
      if (err) {
        res.send(err);
      }
      res.json(job);
    });
  });

  // '/v1/job/:id' - Updated PUT
  api.put('/:id', (req, res) => {
    newJob.findById(req.params.id, (err, job) => {
      if (err) {
        res.send(err);
      }
      newJob.job = req.body.job;
      newJob.company = req.body.company;
      newJob.image = req.body.image;
      newJob.salary = req.body.salary;
      newJob.location.coordinates.lat = req.body.location.coordinates.lat;
      newJob.location.coordinates.long = req.body.location.coordinates.long;
      newJob.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({message: "Job info Updated"});
      });
    });
  });

  // '/v1/job/:id' - Delete
api.delete('/:id', (req, res) => {
  Job.findById(req.params.id, (err, job) => {
    if(err){
      res.status(500).send(err);
      return;
    }
    if(job == nul){
      res.status(404).send("Job not found");
      return;
    }
    Job.remove({
      _id: req.params.id
    }, (err, job) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      Review.remove({
        _id: req.params.id
      }, (err, review) => {
        if (err) {
          res.send(err);
        }
        res.json({message: "Foodtruck and Reviews succesfully removed"});
      });
    });
  });
});


  //add review for specific job id
  // '/v1/job/reviews/add/:id'

  api.post('/reviews/add/:id', (req, res) => {
    Job.findById(req.params.id, (err, job) => {
      if (err) {
        res.send(err);
      }
      let newReview = new Review();

      newReview.title = req.body.title;
      newReview.text = req.body.text;
      newReview.job = job._id;
      newReview.save((err, review) => {
        if (err) {
          res.send(err);
        }
        job.reviews.push(newReview);
        job.save(err => {
          if (err) {
            res.send(err);
          }
          res.json({message: 'Foodtruck review saved'});
        });
      });
    });
  });

  //get reviews for specific job id
  // '/v1/job/reviews/:id'
  api.get('/reviews/:id', (req, res) => {
    Review.find({
      job: req.params.id
    }, (err, reviews) => {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
  });

  // get job by foodtype
  // ‘/v1/job/foodtype/:foodtype’

  api.get('/foodtype/:foodtype', (req, res) => {
    Job.find({
      foodtype: req.params.foodtype
    }, (err, jobs) => {
      if (err) {
        res.send(err);
      }
      res.json(jobs);
    });
  });



  return api;

}
