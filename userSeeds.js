const mongoose = require('mongoose')
const User =require('./Models/users');
mongoose.connect('mongodb://127.0.0.1:27017/purrfect')
.then(()=>{
  console.log("user connection open!!");
})

User.insertMany([
  {username: 'lele',email: 'lele@gmail.com', firstname:'Jiaying', lastname:'Qiu', age: 28,  gender: 'female', phone: '17666586531',job: 'teacher', isAdministrator:true},
  {username: 'togi', email: 'togi@gmail.com', firstname:'Yali', lastname:'Liu', age: 27,  gender: 'female', phone: '18366586531',job: 'student', isAdministrator:true},
  {username: 'xian', email: 'xian@gmail.com', firstname:'Xian', lastname:'Liu', age: 27,  gender: 'female', phone: '1382086531',job: 'programmer', isAdministrator:false},
  {username: 'liang', email: 'liang@gmail.com', firstname:'Jingyi', lastname:'Shen', age: 27,  gender: 'female', phone: '15980130815',job: 'rapper', isAdministrator:false}
])
.catch(err=>{
  console.log("ERROR:");
  console.log(err);
})