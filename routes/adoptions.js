const express = require('express')
const router = express.Router()

const catchAsync = require('../utils/catchAsync')
const adoptions = require('../controllers/adoptions')
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

router.get('/manage', catchAsync(adoptions.viewAdoptions))

router.post('/:id/approve', catchAsync(adoptions.approveAdoption))
router.post('/:id/reject',catchAsync(adoptions.rejectAdoption))

module.exports = router