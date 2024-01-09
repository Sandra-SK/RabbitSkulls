
require('dotenv').config();

const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET;
// middleware permettant de contrôler la validité du token
const auth = (req, res, next)=>{
    // on récupère les information du token stockées dans la partie headers de la requete axios
    const token = req.headers['x-access-token'];
    // si pas de token, c'est mort
    if(token === undefined) {
        res.json({status: 404, msg:"Attention: Token d'identification undefined"})
        
    } else {
        //si il y a un token on vérifie qu'il est bon
        jwt.verify(token, secret, (err, decode)=>{
            if(err){
                // mauvais token !
                res.json({status: 401, msg: "Attention: Token d'identification invalide"});
            } else {
                req.user_id = decode.user_id;
                next()
            }
        })   
    }   
}

// export du middleware
module.exports = auth