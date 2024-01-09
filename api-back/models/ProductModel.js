module.exports = (_db)=>{
    db = _db
    return ProductModel
}

class ProductModel {
    
    //récupération des produits
    static getAllProducts(){
        return db.query('SELECT * FROM products')
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            return err
        })
    }

    
    //récupération d'un produit par son id
    static getOneProduct(product_id){
        return db.query('SELECT * FROM products WHERE product_id = ?', [product_id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            return err
        })
    }

    
    //sauvegarde d'un produit
    static saveOneProduct(req){
        return db.query('INSERT INTO products (productName, productType, productDescription, sellingPrice, picture, stock, creationTimestamp) VALUES (?, ?, ?, ?, ?, ?,NOW())', [ req.body.productName, req.body.productType,req.body.productDescription, req.body.sellingPrice, req.body.picture, req.body.stock])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            return err
        })
    }
    //modification du produit
    static updateOneProduct(req, product_id){
        return db.query('UPDATE products SET productName=? , productType=?, productDescription=?, sellingPrice=?, picture=?, stock=? WHERE product_id=?', [req.body.productName, req.body.productType, req.body.productDescription, req.body.sellingPrice, req.body.picture, req.body.stock, product_id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            return err
        })
    }
    //suppression d'un produit
    static deleteOneProduct(product_id){
        return db.query('DELETE FROM products WHERE product_id=?', [product_id])
        .then((response)=>{
            return response
        })
        .catch((err)=>{
            return err
        })
    }
}