if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require('express');
const app = express();

const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate')
const ExpressError = require('./utils/ExpressError')
const mongoose = require('mongoose');
const petRoutes = require('./routes/pets')
const userRoutes = require('./routes/users')
const volunteerRoutes = require('./routes/volunteers')
const donateRoutes = require('./routes/donate')
const adoptionRoutes = require('./routes/adoptions')
const cookieParser = require('cookie-parser') //don't need for session
const session = require('express-session')
const MongoStore = require('connect-mongo');
const flash = require('connect-flash')
const dbUrl = process.env.DB_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));//accept any type of form data
//false: only string or arrays

app.use(methodOverride('_method'))

app.set('views',path.join(__dirname,'/views'));
app.use('/public', express.static(path.join(__dirname,"public")))


//Authentication
const passport = require('passport')
const passportLocal = require('passport-local');
const User = require('./Models/users');

 mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"))
db.once('open', () => {
  console.log("connection open!!");
})

const store = MongoStore.create({
  mongoUrl:dbUrl,
  touchAfter:24*60*60,
  crypto:{
    secret: 'thisisabadsecret',
  }
})

store.on("error", function(e){
  console.log("SESSION STORE ERROR", e)
})

//use session
const sessionConfig = {
  name:"session",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized:true,
  cookie: {
    //expires in one week
    httpOnly:true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}
app.use(session(sessionConfig))
app.use(flash())

//use passport to authenticate user
app.use(passport.initialize())
app.use(passport.session())
passport.use(new passportLocal(User.authenticate()))

//add&delete user in the session
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.engine('ejs', ejsMate)
app.set("view engine","ejs");

app.use(cookieParser(process.env.COOKIE_SECRET))

app.use((req, res, next) => {
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  res.locals.currentUser = req.user
  next()
})

// use petRoutes to handle all request base /pets
app.use('/pets', petRoutes)
app.use('/users', userRoutes)
app.use('/volunteers', volunteerRoutes)
app.use('/donate', donateRoutes)
app.use('/adoptions', adoptionRoutes)

app.get("/",(req, res)=>{
  res.render('home.ejs');
})

//handle page not found
app.all("*",(req, res, next)=>{
  next(new ExpressError(`Page Not Found`, 404))
})

//handle error
app.use((err, req, res, next)=>{
  const { statusCode = 500} = err
  if(!err.message) message = 'Something went wrong'
  res.status(statusCode).render('error.ejs', {err})
})

app.listen(3000,()=>{
  console.log("Listening 3000!");
})