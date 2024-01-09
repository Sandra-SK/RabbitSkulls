const auth = require('../auth')

module.exports = (app, db) => {
    const orderModel = require('../models/OrderModel')(db)
    const productModel = require('../models/ProductModel')(db)
    const userModel = require('../models/UserModel')(db)
    
    //route de sauvegarde d'une commande
app.post('/api/rsv1/order/save', auth, async (req, res, next) => {
  let total = 0;
  let orderInfos = await orderModel.saveOneOrder(req.body.user_id, total)
  let order_id = orderInfos.insertId

  try {
    await Promise.all(req.body.basket.map(async (b, index) => {
      let product = await productModel.getOneProduct(b.product_id)
      console.log(product)
      if (product && product[0] && product[0].sellingPrice) {
        b.safePrice = parseFloat(product[0].sellingPrice)
        let detail = await orderModel.saveOneOrderDetail(order_id, b)
        total += parseInt(b.quantityInCart) * parseFloat(b.safePrice)
      } else {
        console.log("y a un probleme dans la fonction saveOneOrder")
      }
    }));

    let update = await orderModel.updateOrderTotal(order_id, total)
    res.json({ status: 200, order_id: order_id });
  } catch (error) {
    // Gestion des erreurs
    next(error);
  }
});
    
    
    //route de modification du statut de la commande
    app.put('/api/rsv1/order/validate', auth, async (req, res, next) => {
      try {
        //fonction de modification du statut de la commande
        await orderModel.updateStatus(req.body.order_id, req.body.orderStatus);
        res.json({ status: 200, msg: "Statut de la commande mis à jour." });
      } catch (err) {
        res.json({ status: 500, msg: "Erreur lors de la mise à jour du statut de la commande.", err: err });
      }
    });

    //route de récupération de toutes les commandes
    app.get('/api/rsv1/order/all', auth, async (req, res, next)=>{
        let orders = await orderModel.getAllOrders()
        if(orders.code){
            res.json({status: 500, msg: "Erreur lors de la récupération des commandes", err: orders})
        }
        res.json({status: 200, result: orders})
    })
    
    //route de récupération d'une commande
    app.get('/api/rsv1/order/getOneOrder/:order_id', auth, async (req, res, next) =>{
        let order_id = req.params.order_id
        let order = await orderModel.getOneOrder(order_id)
        if(order.code){
            res.json({status: 500, msg: "Erreur lors de la recuperation de la commande", err: order})
        }else{
             //on peut récupérer les infos de l'utilisateur
            let user = await userModel.getOneUser(order[0].user_id)
             if(user.code){
                res.json({status: 500, msg: "Erreur lors de la récupération des infos utilisateur", err: user})
             }else{
                 let myUser = {
                    firstName: user[0].firstName,
                    lastName: user[0].lastName,
                    street: user[0].street,
                    zip: user[0].zip,
                    city: user[0].city,
                    phone: user[0].phone,
                    email: user[0].email
                 }
                 //récupération des détails de la commande
                let details = await orderModel.getAllDetails(order_id)
                if(details.code){
                    res.json({status: 500, msg: "Erreur lors de la récupération des détails de la commande", err: details})
                }
                res.json({status: 200, order: order[0], user: myUser, orderDetail: details})
             }
        }
    })
}