import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config();

const secretKey = "vjnuafunsui";

const authenticateTokenOrganization = (req,res,next) => {
    const token = req.cookies.bloodBankTokenOrganization;
    
    if(!token){
        return res.json({loginStatus: false});
    }

    jwt.verify(token, secretKey, (err,user) => {
        if(err){
            return res.status(403).json({loginStatus:false});
        }
        const {registrationNumber,userType} = user;

        if (["donor", "organization", "admin"].includes(userType)) {
            res.status(200).json({ registrationNumber, userType, loginStatus: true });
        } else {
            return res.status(403).json({ loginStatus: false });
        }        

        req.user = user;
        next();
    });
}

const generateTokenOrganization = (registrationNumber,userType) => {
    const token = jwt.sign({registrationNumber,userType},secretKey, {expiresIn: '1hr'});
    return token;
}
export {
    authenticateTokenOrganization,
    generateTokenOrganization
}