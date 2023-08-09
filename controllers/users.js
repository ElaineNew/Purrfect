const { use } = require('passport')
const User = require('../Models/users')
const Pet = require('../Models/pets')

module.exports.registerPage = (req, res) => {
  res.render('users/register')
}

module.exports.register = async(req, res) => {
  try{
  const {username, email, password} = await req.body
  const user = new User({email, username})
  const registeredUser = await User.register(user, password)
  req.login(registeredUser, err=>{
    if(err) return next(err)
    req.flash('success', 'Welcome to Purrfect!')
    res.redirect('/pets')
    })
  } catch(e){
    req.flash('error', e.message)
    res.redirect('/users/register')
  }
}

module.exports.loginPage = (req, res) => {
  res.render('users/login')
}

module.exports.login = async(req, res) => {
  req.flash('success', 'Welcome back!')
  const redirectUrl = res.locals.returnTo || '/pets'
  delete req.session.returnTo
  res.redirect(redirectUrl)
}

module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
        return next(err);
    }
    req.flash('success', 'Goodbye!')
    res.redirect('/')
})
}


module.exports.showMarkedPets = async (req, res) => {
  const userId= req.user._id
  const user = await User.findById(userId).populate('markedPets');
  const pets = user.markedPets;
  res.render('users/list',{pets, user})
}

module.exports.markPets = async (req,res)=>{
  const petId  = req.body.petId

  const userId= req.user._id
  const userinfo = await User.findById(userId);
  const markedPets = userinfo.markedPets
  markedPets.push(petId)
  await userinfo.save()
  // res.flash('success',"Added to your list!")
  res.send('success!')

}

module.exports.unMarkPets = async (req,res)=>{
  const petId  = req.params.petId
  const userId= req.user._id
  const user = await User.findById(userId)
  if (!user) {
    console.log('User not found.');
    return;
  }
  user.markedPets = user.markedPets.filter(
    //怎么会删除全部的呢？!!!filter里面函数箭头后面不能用括号括住
    pet => pet.toString()!==petId.toString()
  );
  await user.save();
  // res.send('success!')


  // res.flash('success',"Remove from your  list!")
  // res.render('users/list')

}