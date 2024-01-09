import React, {useState,useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux' 
import { Helmet, HelmetProvider } from 'react-helmet-async'
import {selectUser} from '../../../slices/userSlice'
import {loadProducts} from '../../../slices/productSlice'
import {Navigate} from 'react-router-dom'
import {addOneProduct} from '../../../api/product'
import {displayProducts} from '../../../api/product'
import axios from 'axios'
import {config} from '../../../config'


const AddProduct = (props) =>{
    
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    
    const [productName, setProductName] = useState("")
    const [productType, setProductType] = useState("")
    const [productDescription, setProductDescription] = useState("")
    const [stock, setStock] = useState("")
    const [sellingPrice, setSellingPrice] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(null)
    
    
    const addProd = (datas) =>{
        addOneProduct(datas)
        .then((res)=>{
            if(res.status === 200){
                displayProducts()
                .then((response)=>{
                    dispatch(loadProducts(response.result))
                    setRedirect(true)
                })
                .catch(err=>console.log(err))
            }
        })
        .catch(err=>console.log(err))
    }
    
    //sauvegarder un produit
    const saveProduct = () =>{
        if(selectedFile === null){
            let datas = {
                productName: productName,
                productType: productType,
                productDescription: productDescription,
                sellingPrice: sellingPrice,
                stock: stock,
                picture: "no-pict.jpg"
            }
            
            addProd(datas)
        } else {
            let formData = new FormData()
            formData.append('image', selectedFile)
            
            axios({
                method: "post",
                url: `${config.api_url}/api/rsv1/product/picture`,
                data: formData,
                headers: {
                    'Content-type': 'multipart/form-data',
                    'x-access-token': user.infos.token
                }
            })
            .then((res)=>{
                if(res.data.status === 200){
                    let datas = {
                        productName: productName,
                        productType: productType,
                        productDescription: productDescription,
                        sellingPrice: sellingPrice,
                        stock: stock,
                        picture: res.data.url
                    }
                    addProd(datas)
                }
            })
            .catch(err=>console.log(err))
        }
    }
    
    const onSubmitForm = (e)=>{
        e.preventDefault()
        setError(null)
        if(productName === "" || productType === "" || productDescription === "" || sellingPrice === "" || stock === ""){
            setError("merci de compléter tous les champs!")
        } else if(isNaN(stock) || isNaN(sellingPrice)){
            setError("Les champs prix et quantités doivent obligatoirement être des chiffres!")
        } else {
            saveProduct()
        }
    }
    
    if(redirect){
        return <Navigate to="/adminProduct" />
    }
    return (
        <HelmetProvider>
            <main>
                <Helmet>
                    <title>Rabbit Skulls e-commerce - administration ajout produits</title>
                    <meta name="description" content="page d'administration du site e-commerce des RabbitSkulls Roller Derby Avignon, formulaire d'ajout de fiches produits, authentification requise"/>
                </Helmet>
                <section id="addProduct-section">
                    <h2>Ajouter un produit</h2>
                    {error !== null && <p>{error}</p>}
                    
                    <form id="addProduct-form"
                        onSubmit={onSubmitForm}
                    >
                        <label htmlFor="productName">Produit</label>
                        <input
                            type="text"
                            placeholder="Nom du produit"
                            onChange={(e)=>{
                                setProductName(e.currentTarget.value)
                            }}
                        />
        
                        <label htmlFor="file">fichier joint</label>
                        <input
                            type="file"
                            onChange={(e)=>{
                                setSelectedFile(e.currentTarget.files[0])
                            }}
                        />
        
                        <label htmlFor="productType">Type</label>
                        <input
                            type="text"
                            placeholder="type de produit"
                            onChange={(e)=>{
                                setProductType(e.currentTarget.value)
                            }}
                        /> 
                                      
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            placeholder="Description du produit"
                            onChange={(e)=>{
                                setProductDescription(e.currentTarget.value)   
                            }}
                        >
                        </textarea>
        
                        <label htmlFor="quantity">Stock</label>
                        <input
                            type="text"
                            placeholder="Quantité disponible"
                            onChange={(e)=>{
                                setStock(e.currentTarget.value)
                            }}
                        />
                        
                        <label htmlFor="sellinPrice">Prix-TTC</label>
                        <input
                            type="text"
                            placeholder="Prix de vente du produit en euros"
                            onChange={(e)=>{
                                setSellingPrice(e.currentTarget.value)
                            }}
                        />
                        
                        <button className="submit">Enregistrer</button>
                    </form>
                </section>
            </main>
        </HelmetProvider>
    )
    
}
export default AddProduct