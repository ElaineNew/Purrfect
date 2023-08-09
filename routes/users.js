const express = require('express')
const router = express.Router({mergeParams:true});
const User = require('../Models/users')
const catchAsync = require('../utils/catchAsync')
const passport = require('passport')
const users = require('../controllers/users')

const {isLoggedIn, isOwner, isAdmin, validatePet} = require('../middleware')



const Pet =require('../Models/pets');



router.route('/register')
.get(users.registerPage)
.post(catchAsync(users.register))

router.route('/login')
.get(users.loginPage)
.post(passport.authenticate('local',{failureFlash: true, failureRedirect: '/users/login'}) ,catchAsync(users.login))

router.get('/logout', users.logout)

router.get('/list', isLoggedIn, users.showMarkedPets)
router.post('/list',isLoggedIn, catchAsync(users.markPets))
router.delete('/list/:petId',isLoggedIn, catchAsync(users.unMarkPets))

module.exports = router;