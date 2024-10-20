import jwt from 'jsonwebtoken';

export const createjwtToken = (payload,expirytime)=>{
    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:expirytime});
}