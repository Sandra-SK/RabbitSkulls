import React, {useState} from 'react'
import {config} from '../config'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import PopUp from './popup'

import {useSelector, useDispatch} from 'react-redux' 
import {selectBasket, modifyBasket} from '../slices/basketSlice'

const ArticleDetail = (props)=>{
    
    const basket = useSelector(selectBasket)
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState("")
    const [error, setError] = useState(null)
    const [isPopUp, setPopUp] = useState(false)
    
    
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
        <li className="product-mosaic">
            {/*popup*/}
            <PopUp
                isPopUp={isPopUp}
                msg={`Vous avez ajouté: ${quantity} produit(s) dans votre panier`}
                onClickClose={(e)=>{
                    setPopUp(false)
                    setQuantity("")
                }}
            />
            {/*message d'erreur*/}
            {error !== null && <p>{error}</p>}
            <Link to={`/detail/${props.prod.product_id}`}>
                <div>
                    <h3>{props.prod.productName}</h3>
                    <img src={config.pict_url + props.prod.picture} alt="" />
                    <p>{props.prod.productDescription.substr(0,60)}...</p>
                    <p className="price">prix: {props.prod.sellingPrice} €</p>
                </div>
            </Link>
            <form
                onSubmit={(e)=>{
                    e.preventDefault()
                }}
            >
                <label htmlFor="quantity">qté </label>
                <input type="text"
                    placeholder="1"
                    value={quantity}
                    onChange={(e)=>{
                        setQuantity(e.currentTarget.value)
                    }}
                />
                <div className="addToBasket"
                    onClick={(e)=>{
                        e.preventDefault()
                        onClickBasket(basket, props.prod)
                    }}
                >
                    <FontAwesomeIcon className="icon" icon={faCartShopping}/> +
                </div>
            
            </form>
        </li>
    )
    
    
}

export default ArticleDetail