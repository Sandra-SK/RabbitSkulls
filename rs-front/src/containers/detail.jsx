import React, {useState, useEffect} from 'react'
import {config} from '../config'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import {takeOneProduct} from '../api/product'
import PopUp from "../components/popup"

import {useSelector, useDispatch} from 'react-redux' 
import {selectBasket, modifyBasket} from '../slices/basketSlice'

const Detail = (props)=>{
    
    const product_id = props.params.product_id
    const basket = useSelector(selectBasket)
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState("")
    const [error, setError] = useState(null)
    const [isPopUp, setPopUp] = useState(false)
    const [product, setProduct] = useState(null)
    
    useEffect(()=>{
        takeOneProduct(product_id)
        .then((res)=>{
            setProduct(res.result)
        })
        .catch(err=>console.log(err))
    }, [])
    
    const onClickBasket = (oldBasket, newProduct) =>{
        let myQuantity
        if(quantity === ""){
            myQuantity = 1
            setQuantity(1)
        }else{
            myQuantity = parseInt(quantity)
        }
        
        if(isNaN(myQuantity)){
            setError("Veuillez saisir un nombre svp!")
        }else{
            setError(null)
            
            let newBasket = JSON.parse(JSON.stringify(oldBasket))
            
            let same = newBasket.basket.findIndex((b) => b.product_id === newProduct.product_id)
            
            if(same === -1){
                let myProduct = JSON.parse(JSON.stringify(newProduct))
                myProduct.quantityInCart = parseInt(myQuantity)
                let myBasket = [...newBasket.basket, myProduct]
                let lsBasket = JSON.stringify(myBasket)
                window.localStorage.setItem('rs-basket', lsBasket)
                dispatch(modifyBasket(myBasket))
            }else{
                newBasket.basket[same].quantityInCart += parseInt(myQuantity)
                let lsBasket = JSON.stringify(newBasket.basket)
                window.localStorage.setItem('rs-basket', lsBasket)
                dispatch(modifyBasket(newBasket.basket))
            }
            setPopUp(true)
        }
    } 
    
    return (
        <HelmetProvider>
            <main>
                <Helmet>
                    <title>Rabbit Skulls e-commerce - fiche produit détaillée</title>
                    <meta name="description" content="page de détail produit du site e-commerce des RabbitSkulls Roller Derby Avignon, découvrez la fiche complete de votre article, modifiez quantité, ajoutez au panier "/>    
                </Helmet>
                <section id="product-detail-section" >
                    <h2>Détail article {product_id} :</h2>
                    <PopUp
                        isPopUp={isPopUp}
                        msg={`Vous avez ajouté: ${quantity} article(s) dans votre panier`}
                        onClickClose={(e)=>{
                            setPopUp(false)
                            setQuantity("")
                        }}
                    />
                        
                    
                    {product !== null && <div className="productDetail">
                        <div>
                            <h3>{product.productName}</h3>
                            <img src={config.pict_url + product.picture} alt=""/>
                        </div>
                        <div>
                            <p className="productType">catégorie de produit: {product.productType}</p>
                            <p>Description: {product.productDescription}</p>
                            <p className="price">prix: {product.sellingPrice} €</p>
                            <form
                                onSubmit={(e)=>{
                                    e.preventDefault()
                                }}
                            >
                                <label htmlFor="quantity">saisir qté:</label>
                                <input type="text"
                                    value={quantity}
                                    placeholder='1'
                                    onChange={(e)=>{
                                        setQuantity(e.currentTarget.value)
                                    }}
                                />
                                <div className="addToBasket"
                                    onClick={(e)=>{
                                        e.preventDefault()
                                        onClickBasket(basket, product)
                                    }}
                                >
                                    <FontAwesomeIcon className="icon" icon={faCartShopping}/>+
                                </div>
                            
                            </form>
                        </div>
                    </div>}
                    {/*message d'erreur*/}
                    {error !== null && <p>{error}</p>}
                
            
                    <Link className="comeBack" to="/product"><FontAwesomeIcon icon={faArrowCircleLeft}/> RETOUR LISTE</Link>
                </section>
            </main>
        </HelmetProvider>
    )
}

export default Detail