const Pet =require('../Models/pets');
const {cloudinary} = require('../cloudinary')
const User = require('../Models/users')
const Adoption = require('../Models/adoptions')


const pageSize = 2

module.exports.index = async(req, res, next)=>{
  let pets = await Pet.find({}).populate('owner');
/* 
  console.log(req.query.page)
  const page = parseInt(req.query.page) || 1; // 获取请求参数中的页码，默认为第一页
  const startIndex = (page - 1) * pageSize; // 计算数据开始索引
  const endIndex = startIndex + pageSize; // 计算数据结束索引
  pets = pets.slice(startIndex, endIndex); 
 */
  const response = {
    // currentPage: page,
    // totalPages: Math.ceil(pets.length / pageSize),
    pets: pets
  }
  res.render('pets/index.ejs', response)}


module.exports.cats = async(req, res, next)=>{
  const pets = await Pet.find({category:'cat'}).populate('owner');
  res.render('pets/index.ejs', {pets});
}

module.exports.dogs = async(req, res, next)=>{
  const pets = await Pet.find({category:'dog'}).populate('owner');
  res.render('pets/index.ejs', {pets});
}

module.exports.others = async(req, res, next)=>{
  const pets = await Pet.find({category:'other'}).populate('owner');
  res.render('pets/index.ejs', {pets});
}

module.exports.new = (req, res)=>{res.render('pets/new.ejs')}

module.exports.addPet =async(req, res, next)=>{
  if(!req.body)throw new ExpressError('Invalid Pet Data',400)
  //test
  const newPet = new Pet(req.body.pet)
  newPet.owner = req.user._id
  newPet.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
  await newPet.save()
  const category = newPet.category
  req.flash('success', 'Successfully add a pet!')
  res.redirect(`/pets/${category}s`)
}


module.exports.show = async(req, res)=>{
  const {id} = req.params;
  const userId = req.user._id;
  let isMarked = await User.findOne({_id: userId, markedPets: id});
  if(isMarked){
    isMarked = "checked";
  }
  const pet = await Pet.findById(id).populate('owner');
  if(!pet){
    req.flash('error',"Cannot find the pet!")
    return res.redirect('/pets')
  }
  res.render('pets/show', {pet, isMarked});
}

module.exports.edit = async(req, res, next)=>{
  const {id} = req.params;
  const pet = await Pet.findById(id);
  if(!pet){
    req.flash('error',"Cannot find the pet!")
    return res.redirect('/pets')
  }
  res.render('pets/edit', {pet});
}

module.exports.updatePet = async(req, res, next)=>{
  const {id} = req.params;
  const pet = await Pet.findOneAndUpdate({_id:id}, {...req.body.pet})
  const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }))
  pet.images.push(...imgs)
  await pet.save()
  if(req.body.deleteImages){
    for(let filename of req.body.deleteImages){
      await cloudinary.uploader.destroy(filename)
    }
    await pet.updateOne({$pull:{images:{filename:{$in: req.body.deleteImages}}}})
    console.log(pet)
  }
  req.flash('success', 'Successfully update a pet!')
  res.redirect(`/pets/${id}`)
} 
  
  module.exports.delete = async(req, res, next)=>{
    const {id} = req.params;
    const pet =await Pet.findById(id)
    await Pet.findOneAndDelete({_id:id})
    req.flash('success', 'Successfully delete a pet!')
    res.redirect(`/pets/${pet.category}s`)
  }


  module.exports.showAdForm = async(req, res,next)=>{
    const {id} = req.params;
    const pet =await Pet.findById(id)
    res.render("adoptions/adopt",{pet})
  }

  module.exports.submitAdForm = async(req, res,next)=>{
    const {id} = req.params;
    if(!req.body)throw new ExpressError('Invalid Apply Data',400)
    const newAdoption = new Adoption(req.body.adopter)
    newAdoption.adopter = req.user._id
    newAdoption.pet = id
    newAdoption.status = 'pending'

    const pet = await Pet.findOneAndUpdate({_id:id}, {status: "pending"})

    await newAdoption.save()

    req.flash('success', 'Successfully applied for a pet!');
    res.redirect(`/pets/${id}`);
  }