module.exports = (_db)=>{
    db = _db
    return OrderModel
}

class OrderModel {
    //validation d'une commande
    static saveOneOrder(user_id, total){
        return db.query('INSERT INTO orders (user_id, total, orderCreationTimestamp, orderStatus) VALUES (?, ?, NOW(), "validée")', [user_id, total])
        .then((response)=>{
            return response
        })
        .catch((err) => {
            return err
        })
    }
    
    //sauvegarde d'un orderDetail 
    static saveOneOrderDetail(order_id, product){
        let total = parseInt(product.quantityInCart)*parseFloat(product.sellingPrice)
        return db.query('INSERT INTO orderDetails (order_id, product_id,productName, quantity, totalOrderLine) VALUES (?,?,?,?,?)', [order_id, product.product_id, product.productName, product.quantityInCart, total])
        .then((response)=>{
            return response
        })
        .catch((err) => {
            return err
        })
    }
    
    //modification du montant total
    static updateOrderTotal(order_id, orderTotal){
        return db.query('UPDATE orders SET total = ? WHERE order_id = ?', [orderTotal, order_id])
        .then((response)=>{
            return response
        })
        .catch((err) => {
            return err
        })
    }
    
    //récupération d'une commande en fonction d'un id
    static getOneOrder(order_id){
        return db.query('SELECT * FROM orders WHERE order_id = ?', [order_id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            return err
        })
    }
    
    //modification d'un status de commande
    static updateStatus(order_id, orderStatus) {
        return db
          .query('UPDATE orders SET orderStatus = ? WHERE order_id = ?', [orderStatus, order_id])
          .then((response) => {
            return response;
          })
          .catch((err) => {
            return err;
          });
      }

    
    //récupération de toutes les commandes
    static getAllOrders(){
        return db.query('SELECT * FROM orders')
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            return err
        })
    }
 
 
 
    //récupération des détails d'une commande
    static getAllDetails(order_id){
        let order = 'SELECT orderDetails.orderDetail_id, orderDetails.quantity, orderDetails.totalOrderLine, orderDetails.productName FROM orderDetails INNER JOIN products ON products.product_id = orderDetails.product_id WHERE order_id = ?'
        return db.query(order, [order_id])
        .then((response)=>{
            return response
        })
        .catch((err) => {
            return err
        })
    }
}