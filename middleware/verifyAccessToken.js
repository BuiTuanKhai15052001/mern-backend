const JWT = require('jsonwebtoken')
const createError = require('http-errors');


const verifyAccessToken = (req, res, next) =>{
    console.log(req.headers)

    if(!req.headers['authorization']){
        return next(createError.Unauthorized())
    }
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    console.log(token);
     JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload)=>{
        if(err){
            if(err.name === 'JsonWebTokenError'){
                return next(createError.Unauthorized())
            }
            return next(createError.Unauthorized(err.message))
        }
        req.payload = payload;
        console.log(payload);
        next()
        
    })
    
}

module.exports = verifyAccessToken