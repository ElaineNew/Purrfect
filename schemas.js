//using joi to validate form
/* 参数的类型、必填等；
字符串，是否可以为空、该符合什么规则等；
数字，最大值最小值是什么等等等等。 */
const Joi = require('joi')

module.exports.petSchema = Joi.object({
  pet: Joi.object({
    category: Joi.string().required(),
    name: Joi.string().required(),
    age: Joi.number().required(),
    weight: Joi.number().required(),
    description: Joi.string().required()
  }).required(),
  deleteImages: Joi.array()
})



/* module.exports.petSchema = Joi.object({
  category: Joi.string().required(),
  name: Joi.string().required(),
  age: Joi.number().required(),
  weight: Joi.number().required(),
  // image: Joi.string().required(),
  description: Joi.string().required()
}).required() */
