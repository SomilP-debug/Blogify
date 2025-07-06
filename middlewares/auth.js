const { verifyuserwithtoken } = require("../services/auth");

function checkForAuthenthicationCookie(cookieName){
     return(
        (req,res,next)=>{
        const tokencookie = req.cookies[cookieName];
        
        if(!tokencookie){
            return(next());
        }
        try{
            const payload = verifyuserwithtoken(tokencookie);
            req.user = payload;
            return(next());
        }
        catch{
            return(next());
        }
        }
     )
}
module.exports = {checkForAuthenthicationCookie,};