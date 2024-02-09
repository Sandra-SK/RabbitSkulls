require('dotenv').config();
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const secret = process.env.TOKEN_SECRET;
const auth = require('../auth')

module.exports = (app, db)=>{
    const userModel = require('../models/UserModel')(db)
    
    //route d'enregistrement d'un utilisateur
    app.post('/api/rsv1/user/save', async (req, res, next) => {
        //vérification si mail existant
        let check = await userModel.getUserByEmail(req.body.email)
        
        if(check.code){
            return res.json({status: 500, msg: "Erreur email.",err: check})
        }
        //le mail existe déjà :alerte
        if(check.length > 0){
            if(check[0].email === req.body.email){
               return res.json({status: 401, msg: "Email déjà utilisé."})
            }
        } else {
            //ajout d'un regex pour contrôler la qualité minimum du mot de passe choisi
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*-_])(?=.{8,})/
            if (!passwordRegex.test(req.body.password)){
                return res.json({status:400, msg:"Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre, un caractère spécial (!@#$%^&*-_) et comporter 8 caractères minimum."})
            }    
            //si mail inexistant et regex ok: enregistrement de l'utilisateur
            let user = await userModel.saveOneUser(req)
            if(user.code){
               return res.json({status: 500, msg: "erreur lors de l'enregistrement de l'utilisateur", err: user})
            }
            return res.json({status: 200, msg: "L'utilisateur a bien été enregistré!"})
        }
    })
    
    
    //route de connexion d'un utilisateur (création token)
    app.post('/api/rsv1/user/login', async (req, res, next)=>{
        if(req.body.email === ""){
            return res.json({status: 401, msg: "Entrez un email..."})
        }
        //recherche de l' utilisateur dans la bdd avec le mail saisi pour se connecter
        let user = await userModel.getUserByEmail(req.body.email)
        if(user.code){
            return res.json({status: 500, msg: "Erreur lors de la vérification d'email.",err: user})
        }
        //si il n'existe pas
        if(user.length === 0){
            return res.json({status: 404, msg: "aucun utilisateur ne correspond au mail saisi."})
        } else {
            //on compare les password avec bcrypt
            let same = await bcrypt.compare(req.body.password, user[0].password)
            //si c'est true, les mdp sont identiques
            if(same){
                //dans payload on stocke les valeurs qu'on va glisser dans le token 
                const payload = {email: req.body.email, user_id: user[0].user_id}
                //on crée notre token avec sa signature (secret)
                const token = jwt.sign(payload, secret)
                let connect = await userModel.updateConnexion(user[0].user_id)
                if(connect.code){
                    return res.json({status: 500, err: connect})
                }
                return res.json({status: 200, token: token, user_id: user[0].user_id})
            }else{
                //on retourne un json d'erreur
                return res.json({status: 401, error: "Votre mot de passe est incorrect !"})
            }
        }
    })
    
    
    //route de modification des utilisateurs
    app.put('/api/rsv1/user/update/:user_id', auth, async (req, res, next)=>{
        let userId = req.params.user_id
        let user = await userModel.updateUser(req, userId)
        if(user.code){
            return res.json({status: 500, msg: "erreur lors de la modification du profil", err: user})
        }
        //mon profil est modifié je renvoi les infos de profil mis à jour vers le front
        let newUser = await userModel.getOneUser(userId)
        if(newUser.code){
            return res.json({status: 500, msg: "erreur lors de l'enregistrement du nouveau profil", err: newUser})
        }
        return res.json({status: 200, result: user, newUser: newUser[0]})
    })
    
}