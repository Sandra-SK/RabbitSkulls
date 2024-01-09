const express = require('express')
const app = express()

const mysql = require('promise-mysql')
const cors = require('cors')

app.use(cors())

const fileUpload = require('express-fileupload')

app.use(fileUpload({
    createParentPath: true
}))

//parse les url
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(__dirname+'/public'))

let config
//on check si l'api est en ligne (sur un server) ou non et on décide quelle bdd on va utiliser
if(!process.env.HOST){
    //nous sommes en local
    config = require("./config-offline")
} else {
    //nous sommes en ligne
    config = require("./config")
}

//connexion à la bdd
const host = process.env.HOST_DB || config.db.host
const database = process.env.DATABASE_DB || config.db.database
const user = process.env.USER_DB || config.db.user
const password = process.env.PASSWORD || config.db.password


//importation des routes
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const mailRoutes = require('./routes/mailRoutes')

mysql.createConnection({
    host: host,
    database: database,
    user: user,
    password: password
    
}).then((db)=>{
    console.log(`bdd ${database} connectée`)
    setInterval(async ()=>{
        let res = await db.query('SELECT 1')
    }, 10000)
    
    app.get('/', async (req, res, next)=>{
        res.json({status: 200, msg: "Hello, bienvenue sur le projet RabbitSkulls RollerDerby e-commerce"})
    })
    
    //appel des routes

    userRoutes(app, db)
    authRoutes(app, db)
    productRoutes(app, db)
    orderRoutes(app, db)
    mailRoutes(app, db)
})
.catch(err=>console.log(err))

const PORT = process.env.PORT || 9500
app.listen(PORT, ()=>{
    console.log(`listening port ${PORT}, OK :-) `)
})