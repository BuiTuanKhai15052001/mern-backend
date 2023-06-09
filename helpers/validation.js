const Joi = require('joi')
const userValidate = (data) => {
    const userSchema = Joi.object({
        email: Joi.string().lowercase().email().required().pattern(new RegExp('gmail.com$')),
        password: Joi.string().required().min(4).max(32),
        confirmPassword: Joi.string().allow('').min(4).max(32)
        
    })
    return userSchema.validate(data)

}

module.exports = { userValidate }