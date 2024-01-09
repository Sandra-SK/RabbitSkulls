const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = (_db)=>{
    db=_db
    return UserModel
}

class UserModel {
    //sauvegarde d'un membre
    static saveOneUser(req){
        let sql = "INSERT INTO users (firstName, lastName, email, password,  role, street, zip, city, phone, creationTimestamp) VALUES (?,?,?,?,'user',?,?,?,?, NOW())"
        return bcrypt.hash(req.body.password,saltRounds)
        .then((hash)=>{
            return db.query(sql,[req.body.firstName, req.body.lastName, req.body.email, hash, req.body.street, req.body.zip, req.body.city, req.body.phone])
            .then((res)=>{
                return res
            })
            .catch((err)=>{
                return err
            })
        })
        .catch((err)=>{
            return err
        })
    }
    
    //récupération d'un utilisateur en fonction de son mail
    static getUserByEmail(email){
            let sql = "SELECT * FROM users WHERE email = ?"
            
            return db.query(sql, [email])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
        
    }
    
    //récupération d'un utilisateur par son id
    static getOneUser(user_id){
        let sql = "SELECT * FROM users WHERE user_id = ?"
        return db.query(sql, [user_id])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
        
    }
    
    //modification d'un utilisateur
    static updateUser(req, user_id){
        return db.query("UPDATE users SET firstName = ?, lastName = ?, street = ?, zip = ?, city = ?, phone = ? WHERE user_id = ?", [req.body.firstName, req.body.lastName, req.body.address, req.body.zip, req.body.city, req.body.phone, user_id])
        .then((res)=>{
                return res
            })
        .catch((err)=>{
            return err
        })
    }
    
    static updateConnexion(user_id){
        return db.query("UPDATE users SET connexionTimestamp = NOW() WHERE user_id = ?", [user_id])
        .then((res)=>{
                return res
            })
        .catch((err)=>{
            return err
        })
    }
}