import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config();

const secretKey = "vjnuafunsui";

const authenticateTokenDonor = (req,res,next) => {
    const token = req.cookies.bloodBankTokenDonor;
    
    if(!token){
        return res.json({loginStatus: false});
    }

    jwt.verify(token, secretKey, (err,user) => {
        if(err){
            return res.status(403).json({loginStatus:false});
        }
        const {nic,userType} = user;

        if (["donor", "organization", "admin"].includes(userType)) {
            res.status(200).json({ nic, userType, loginStatus: true });
        } else {
            return res.status(403).json({ loginStatus: false });
        }        

        req.user = user;
        next();
    });
}

const generateTokenDonor = (nic,userType) => {
    const token = jwt.sign({nic,userType},secretKey, {expiresIn: '1hr'});
    return token;
}
export {
    authenticateTokenDonor,
    generateTokenDonor
}