const {petSchema} = require('./schemas')
const ExpressError = require('./utils/ExpressError')
const Pet =require('./Models/pets');



module.exports.isLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()){
    req.session.returnTo = req.originalUrl
    req.flash('error', 'You must be signed in!')
    return res.redirect('/users/login')
  }
  next()
}

module.exports.isAdmin = (req, res, next) => {
  if(req.user.isAdministrator && req.user.isAdministrator === false){
    req.flash('error', 'No permission!')
    return res.redirect('/pets')
  }
  next()
}


module.exports.isOwner = async (req, res, next) => {
  const {id} = req.params;
  const pet = await Pet.findById(id)
  if(!pet.owner.equals(req.user._id)){
    req.flash('error', 'No permission!')
    return res.redirect('/pets')
  }
  next()
}



module.exports.validatePet = (req, res, next) => {
  //test
  const pet = req.body.pet
  // const {error} = petSchema.validate(...req.body);
  const {error} = petSchema.validate(pet);
  console.log(req.body)

  if(error){
    const msg = error.details.map(el =>el.message).join(',')
    throw new ExpressError(msg, 400)
  } else{
    next()
  }
}