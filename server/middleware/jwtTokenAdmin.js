import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config();

const secretKey = "vjnuafunsui";

const authenticateTokenAdmin = (req,res,next) => {
    const token = req.cookies.bloodBankTokenAdmin;
    
    if(!token){
        return res.json({loginStatus: false});
    }

    jwt.verify(token, secretKey, (err,user) => {
        if(err){
            return res.status(403).json({loginStatus:false});
        }
        const {username,userType} = user;

        if (["donor", "organization", "admin"].includes(userType)) {
            res.status(200).json({ username, userType, loginStatus: true });
        } else {
            return res.status(403).json({ loginStatus: false });
        }        

        req.user = user;
        next();
    });
}

const generateTokenAdmin = (username,userType) => {
    const token = jwt.sign({username,userType},secretKey, {expiresIn: '1hr'});
    return token;
}
export {
    authenticateTokenAdmin,
    generateTokenAdmin
}