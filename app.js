if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}


const express = require('express');
const app = express();


const path = require('path');
// const { v4:uuid } = require('uuid');
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
const helmet = require('helmet');
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


// mongoose.connect('mongodb://127.0.0.1:27017/purrfect', {
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
  secret: 'thisismysecret',
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


const scriptSrcUrls = [
  "https://stackpath.bootstrapcdn.com/",
  "https://api.tiles.mapbox.com/",
  "https://api.mapbox.com/",
  "https://kit.fontawesome.com/",
  "https://cdnjs.cloudflare.com/",
  "https://cdn.jsdelivr.net/",
  "https://res.cloudinary.com/diufwxakx/",

];
const styleSrcUrls = [
  "https://kit-free.fontawesome.com/",
  "https://stackpath.bootstrapcdn.com/",
  "https://api.mapbox.com/",
  "https://api.tiles.mapbox.com/",
  "https://fonts.googleapis.com/",
  "https://use.fontawesome.com/",
  "https://ka-f.fontawesome.com",
  "https://cdn.jsdelivr.net/",
  "https://res.cloudinary.com/diufwxakx/"
];
const connectSrcUrls = [
  "https://*.tiles.mapbox.com",
  "https://api.mapbox.com",
  "https://events.mapbox.com",
  "https://use.fontawesome.com/",
  "https://ka-f.fontawesome.com",
  "https://res.cloudinary.com/diufwxakx/"
];
const fontSrcUrls = ["https://res.cloudinary.com/diufwxakx/",
 "https://use.fontawesome.com/",
 "https://ka-f.fontawesome.com"];

app.use(
  helmet.contentSecurityPolicy({
      directives: {
          defaultSrc: [],
          connectSrc: ["'self'", ...connectSrcUrls],
          scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
          styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
          workerSrc: ["'self'", "blob:"],
          objectSrc: [],
          imgSrc: [
              "'self'",
              "blob:",
              "data:",
              "https://res.cloudinary.com/diufwxakx/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
              "https://source.unsplash.com/random/",
              "https://images.unsplash.com/photo-1559521783-1d1599583485?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
          ],
          fontSrc: ["'self'", ...fontSrcUrls],
          mediaSrc: ["https://res.cloudinary.com/diufwxakx/"],
          childSrc: ["blob:"]
      }
  })
);


//use passport to authenticate user
app.use(passport.initialize())
app.use(passport.session())
passport.use(new passportLocal(User.authenticate()))

//add&delete user in the session
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.engine('ejs', ejsMate)
app.set("view engine","ejs");

app.use(cookieParser('this is my signed secret'))


/* app.use(bodyParser.urlencoded({
  extended: true
})) */


app.use((req, res, next) => {
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  res.locals.currentUser = req.user
  next()
})

app.use('/pets', petRoutes)
app.use('/users', userRoutes)
app.use('/volunteers', volunteerRoutes)
app.use('/donate', donateRoutes)
app.use('/adoptions', adoptionRoutes)

app.get("/",(req, res)=>{
  res.render('home.ejs');
})

app.all("*",(req, res, next)=>{
  next(new ExpressError(`Page Not Found`, 404))
})

app.use((err, req, res, next)=>{
  const { statusCode = 500} = err
  if(!err.message) message = 'Something went wrong'
  res.status(statusCode).render('error.ejs', {err})
})

app.listen(3000,()=>{
  console.log("Listening 3000!");
})