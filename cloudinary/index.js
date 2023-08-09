const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')


/* cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SCRETE
})
 */
cloudinary.config({ 
  cloud_name: 'diufwxakx', 
  api_key: '776947197299692', 
  api_secret: 'Lp45hJCy7uYtOAm_zoorjLUJmLM' 
});


const storage = new CloudinaryStorage({
  cloudinary,
  folder: 'Purrfect',
   allowedFormats: ['jpeg', 'png', 'jpg']
});

module.exports = {
  cloudinary,
  storage
}


