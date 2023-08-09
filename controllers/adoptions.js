const Adoption = require('../Models/adoptions')
const Pet = require('../Models/pets')


module.exports.viewAdoptions = async(req, res, next)=>{
  const adoptions = await Adoption.find({}).populate('pet')
  res.render('adoptions/manage',{adoptions})
  // res.render('pets/index.ejs')
}

module.exports.approveAdoption = async(req, res, next)=>{
  const {id}= req.params
  const adoption = await Adoption.findOneAndUpdate({_id:id, },{status:"accepted"})
  const pet = await Pet.findOneAndUpdate({_id:adoption.pet},{status: "adopted"})

  await pet.save()
  await adoption.save()

  res.redirect('/adoptions/manage')
}

module.exports.rejectAdoption = async(req, res, next)=>{
  const {id}= req.params
  const adoption = await Adoption.findOneAndUpdate({_id:id, },{status:"rejected"})
  const pet = await Pet.findOneAndUpdate({_id:adoption.pet},{status: "available"})

  await pet.save()
  await adoption.save()

  res.redirect('/adoptions/manage')
}
