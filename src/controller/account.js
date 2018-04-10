import mongoose from 'mongoose';
import {Router} from 'express';
import Account from '../model/account';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '../config';

import {generateAccessToken, respond, authenticate} from '../middleware/authMiddleware';

export default({config, db}) => {
  let api = Router();


  // '/v1/account'
  api.get('/', (req, res) => {
    res.status(200).send({ user: req.user });
  });

  // 'v1/account/register'
api.post('/register', authenticate, (req, res) => {
  Account.register(new Account({
    username: req.body.email
  }), req.body.password, (err, account) => {
    if(err) {
      return res.send(err); // add return
    }
    passport.authenticate(
      'local', {
        session: false
      })(req, res, () => {
        res.status(200).send('Successfully created new account');
      });
  });
});

  // '/v1/login'
  api.post('/login', passport.authenticate(
    'local',{
      session: false,
      scope: []
    }), generateAccessToken, respond);



  // '/v1/logout'
  api.get('/logout', authenticate, (req,res)=>{
    res.logout();
    res.status(200).send('Succesfully logged out');
  });


  api.get('/me', authenticate, (req, res )=>{
    res.status(200).json(req.user);
  });

  return api;
}
