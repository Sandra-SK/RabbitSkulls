require('dotenv').config();

const auth = require('../auth')
const jwt = require('jsonwebtoken')
const secret = process.env.TOKEN_SECRET;

//routes permettant la gestion de la connexion par token (avec le front qui jouera aussi avec redux)
module.exports = (app, db)=>{
    const userModel = require('../models/UserModel')(db)
    
    app.get('/api/rsv1/user/checkToken', auth, async (req, res, next) => {
        let  user = await userModel.getOneUser(req.user_id)
        if(user.code){
            res.json({status: 500, err: user})
        }
        res.json({status: 200, user: user[0]})
    }) 
    
}

