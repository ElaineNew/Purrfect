const express = require('express')
const router = express.Router({mergeParams:true});
const catchAsync = require('../utils/catchAsync')
const multer = require('multer') //req.body + req.files
const {storage} = require('../cloudinary')
// const upload = multer({dest:'/'})
const upload = multer({storage})

const app = express();
const pets = require('../controllers/pets')

app.use(express.json());
app.use(express.urlencoded({extended:true}));//accept nested form data


const {isLoggedIn, isOwner, isAdmin, validatePet} = require('../middleware')



router.route('/')
.get(catchAsync(pets.index))
.post(isAdmin, upload.array('images'),catchAsync(pets.addPet))
// .post(isAdmin, upload.array('images'), validatePet,catchAsync(pets.addPet))

router.get('/cats', catchAsync(pets.cats))

router.get('/dogs', catchAsync(pets.dogs))

router.get('/others',catchAsync(pets.others))

router.get('/new', isLoggedIn, isAdmin, pets.new)

router.route('/:id')
.get(isLoggedIn, catchAsync(pets.show))
//change patch to put
.put(isLoggedIn, isOwner, upload.array('images'), catchAsync(pets.updatePet))
// .patch(isLoggedIn, isOwner, validatePet, catchAsync(pets.updatePet))
.delete(isLoggedIn, isOwner, catchAsync(pets.delete))

router.get('/:id/edit', isLoggedIn, isOwner, catchAsync(pets.edit))

router.get('/:id/adopt', isLoggedIn, catchAsync(pets.showAdForm))
router.post('/:id/adopt', isLoggedIn, catchAsync(pets.submitAdForm))


router.post('/adopt/manage', isLoggedIn, isOwner, catchAsync(pets.submitAdForm))

module.exports = router