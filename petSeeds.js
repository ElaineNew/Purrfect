const mongoose = require('mongoose')
const Cat =require('./Models/pets');
mongoose.connect('mongodb://127.0.0.1:27017/purrfect')
.then(()=>{
  console.log("pet connection open!!");
})

Cat.insertMany([
  {owner: '64a6c17bd8a27bd8305b034d', category: 'cat', name:'Niuniu', age: 4, color: 'ginger', breed: 'mix',status: 'available', size: 'medium', weight:'11',image:'https://source.unsplash.com/random/300x300?/pets',
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, atque. Maxime optio praesentium quasi laboriosam perferendis vitae, sequi numquam cumque, dignissimos sit rerum voluptas quam eius? Eaque adipisci rem excepturi?'
},
  {owner: '64a6c17bd8a27bd8305b034d', category: 'cat', name:'Snow', age: 3, color: 'gray', breed: 'britsh short',status: 'available', size: 'medium', weight:'12',image:'https://source.unsplash.com/random/300x300?/pets',
  description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, atque. Maxime optio praesentium quasi laboriosam perferendis vitae, sequi numquam cumque, dignissimos sit rerum voluptas quam eius? Eaque adipisci rem excepturi?'
},
  {owner: '64a6c17bd8a27bd8305b034d', category: 'cat', name:'Mei', age: 2, color: 'white', breed: 'toy',status: 'pending', size: 'large', weight:'10',image:'https://source.unsplash.com/random/300x300?/pets',
  description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, atque. Maxime optio praesentium quasi laboriosam perferendis vitae, sequi numquam cumque, dignissimos sit rerum voluptas quam eius? Eaque adipisci rem excepturi?'
},
  {owner: '64a6c17bd8a27bd8305b034d', category: 'cat', name:'Jiujiu', age: 5,  color: 'black', breed: 'mix',status: 'available', size: 'small', weight:'9',image:'https://source.unsplash.com/random/300x300?/pets',
  description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, atque. Maxime optio praesentium quasi laboriosam perferendis vitae, sequi numquam cumque, dignissimos sit rerum voluptas quam eius? Eaque adipisci rem excepturi?'
},
  {owner: '64a6c17bd8a27bd8305b034d', category: 'dog', name:'xiaobai', age: 10,  color: 'white', breed: 'bomei',status: 'available', size: 'small', weight:'25',image:'https://source.unsplash.com/random/300x300?/pets',
  description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, atque. Maxime optio praesentium quasi laboriosam perferendis vitae, sequi numquam cumque, dignissimos sit rerum voluptas quam eius? Eaque adipisci rem excepturi?'
},
  {owner: '64a6c17bd8a27bd8305b034d', category: 'dog', name:'xiaohei', age: 7,  color: 'black', breed: 'teddy',status: 'available', size: 'small', weight:'20',image:'https://source.unsplash.com/random/300x300?/pets',
  description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, atque. Maxime optio praesentium quasi laboriosam perferendis vitae, sequi numquam cumque, dignissimos sit rerum voluptas quam eius? Eaque adipisci rem excepturi?'
},
  {owner: '64a6c17bd8a27bd8305b034d', category: 'other', name:'dingbo', age: 2,  color: 'white', breed: 'mix', status: 'available', size: 'small', weight:'1',image:'https://source.unsplash.com/random/300x300?/pets',
  description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, atque. Maxime optio praesentium quasi laboriosam perferendis vitae, sequi numquam cumque, dignissimos sit rerum voluptas quam eius? Eaque adipisci rem excepturi?'
},
  {owner: '64a6c17bd8a27bd8305b034d', category: 'other', name:'duiji', age: 2,  color: 'white', breed: 'mix', status: 'available', size: 'small', weight:'1',image:'https://source.unsplash.com/random/300x300?/pets',
  description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, atque. Maxime optio praesentium quasi laboriosam perferendis vitae, sequi numquam cumque, dignissimos sit rerum voluptas quam eius? Eaque adipisci rem excepturi?'
},
  {owner: '64a6c17bd8a27bd8305b034d', category: 'other', name:'gongzhu', age: 1,  color: 'white', breed: 'mix', status: 'available', size: 'small', weight:'1',image:'https://source.unsplash.com/random/300x300?/pets',
  description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, atque. Maxime optio praesentium quasi laboriosam perferendis vitae, sequi numquam cumque, dignissimos sit rerum voluptas quam eius? Eaque adipisci rem excepturi?'
}
])
.catch(err=>{
  console.log("ERROR:");
  console.log(err);
})