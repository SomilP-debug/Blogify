const JWT = require("jsonwebtoken");
const secret = "$oMi!!s@ERv%r3!2";
 
function createtokenforuser(user){
     const payload = {
        _id : user._id,
        email : user.email,
        role: user.role,
        fullname : user.fullname
     };
     const token = JWT.sign(payload,secret);
     return(token);
}
function verifyuserwithtoken(token){
    const payload = JWT.verify(token,secret);
    return(payload);
}
module.exports = {createtokenforuser,verifyuserwithtoken};

