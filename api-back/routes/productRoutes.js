const fs = require('fs')//va nous permettre de supprimer des images locales
const auth = require('../auth')

module.exports = (app,db)=>{
    const productModel = require('../models/ProductModel')(db)
    
    //route permettant de récupérer tous les produits
    app.get('/api/rsv1/product/all', async (req, res, next)=>{
        let products = await productModel.getAllProducts()
        if(products.code){
            res.json({status: 500, msg: "erreur lors de la récupération des produits", err: products})
        }
        res.json({status: 200, result: products})
    })
    
    //route permettant de récuperer un produit
    app.get('/api/rsv1/product/one/:product_id', async (req, res, next)=>{
        let product_id = req.params.product_id
        let product = await productModel.getOneProduct(product_id)
        if(product.code){
            res.json({status: 500, msg: "erreur lors de la récupération du produit", err: product})
        }
        res.json({status: 200, result: product[0]})
    })

    
    //route permettant d'enregistrer un produit
    app.post('/api/rsv1/product/save', auth, async (req, res, next) =>{
        let product = await productModel.saveOneProduct(req)
        if(product.code){
            res.json({status: 500, msg: "erreur lors de l'enregistrement du produit", err: product})
        };
        res.json({status: 200, msg: "Le produit a bien été enregistré!", result: product})
    })
    
    //route d'ajout d'une image dans l'api (stock une image et retourne au front le nom de l'image stocké)
    app.post('/api/rsv1/product/picture', auth, (req, res, next) =>{
        //si on a pas envoyé de req.files via le front ou que cet objet ne possède aucune propriété
		if (!req.files || Object.keys(req.files).length === 0) {
			//on envoi une réponse d'erreur
	    	 res.json({status: 400, msg: "erreur lors de la récuperation de l'image"});
	    }
	    //la fonction mv va envoyer l'image dans le dossier que l'on souhaite.
	    req.files.image.mv('public/images/'+req.files.image.name, function(err) {

		    if (err) {
		    //renvoi d'un message d'erreur
		      res.json({status: 500, msg: "La photo n'a pas pu être enregistrée"})
		    }
		 });
	    //si c'est good on retourne un json avec le nom de la photo vers le front
        res.json({status: 200, msg: "photo bien enregistrée!", url: req.files.image.name})
    })
    
    //route permettant de modifier un produit
    app.put('/api/rsv1/product/update/:product_id', auth, async (req, res, next) => {
        let product_id = req.params.product_id
        let product = await productModel.updateOneProduct(req, product_id)
        if(product.code){
            res.json({status: 500, msg: "erreur lors de l'enregistrement de la modification", err: product})
        }
        res.json({status: 200, msg: "Produit modifié", result: product})
    })
    
    //route permettant de supprimer un produit
    app.delete('/api/rsv1/product/delete/:product_id', auth, async (req, res, next) => {
        let product_id = req.params.product_id
        let product= await productModel.getOneProduct(product_id)
        if(product.code){
            res.json({status: 500, msg: "erreur lors de la récuperation du produit", err: product})
        }
        let deleteProduct = await productModel.deleteOneProduct(product_id)
        if(deleteProduct.code){
            res.json({status: 500, msg: "erreur lors de la suppression du produit", err: deleteProduct})
        }
        //suppression de l'image correspondant à l'article
        if(product[0].picture !== "no-pict.jpg"){
            //supprime le fichier (photo) correspondant au nom de la photo enregistrée pour le produit dans la bdd, il supprime la photo dans le dossier static ou son stockées les images
    		fs.unlink(`public/images/${product[0].picture}`, function(err){
    			if(err){
    				res.json({status: 500, msg: "Problème lors de la suppression de l'image liée au produit"})
    			}
    		})
        }
        res.json({status: 200, result: deleteProduct})
    })
    
}