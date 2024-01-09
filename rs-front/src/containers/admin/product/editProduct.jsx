import React, {useState,useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import {selectUser} from '../../../slices/userSlice'
import {loadProducts} from '../../../slices/productSlice'
import {Navigate} from 'react-router-dom'

import {takeOneProduct, updateOneProduct} from '../../../api/product'
import {displayProducts} from '../../../api/product'

import axios from 'axios'
import {config} from '../../../config'

const EditProduct = (props) =>{
    
    const product_id =  props.params.product_id
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    
    const [productName, setProductName] = useState("")
    const [productType, setProductType] = useState("")
    const [productDescription, setProductDescription] = useState("")
    const [stock, setStock] = useState("")
    const [sellingPrice, setSellingPrice] = useState("")
    const [selectedFile, setFile] = useState(null)
    const [oldPict, setOldPict] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(null)
    
    const addProd = (datas) =>{
        updateOneProduct(datas, product_id)
        .then((res)=>{
            if(res.status === 200){
                displayProducts()
                .then((response)=>{
                    dispatch(loadProducts(response.result))
                    setRedirect(true)
                })
                .catch(err=>console.log(err))
            } else {
                console.log(res)
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
                picture: oldPict
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
        if(productName === "" ||productType === "" || productDescription === "" || sellingPrice === "" || stock === ""){
            setError("Merci de compléter tous les champs!")
        } else if(isNaN(stock) || isNaN(sellingPrice)){
            setError("Les champs prix et quantités doivent obligatoirement être des chiffres!")
        } else {
            saveProduct()
        }
    }
    
    useEffect(() => {
        takeOneProduct(product_id)
        .then((res)=>{
            setProductName(res.result.productName)
            setProductType(res.result.productType)
            setProductDescription(res.result.productDescription)
            setStock(res.result.stock)
            setOldPict(res.result.picture)
            setSellingPrice(res.result.sellingPrice)
        })
        .catch(err=>console.log(err))
    }, [product_id])
    
     if(redirect){
        return <Navigate to="/adminProduct" />
    }
    return (
        <HelmetProvider>
            <main>
                <Helmet>
                    <title>Rabbit Skulls e-commerce - administration modification produits</title>
                    <meta name="description" content="page d'administration du site e-commerce des RabbitSkulls Roller Derby Avignon, formulaire de modification de fiches produits, authentification requise"/>
                </Helmet>
                <section id="editProduct-section">
                    <h2>Modifier un produit</h2>
                    {error !== null && <p>{error}</p>}
                    <form id="editProduct-form"
                        onSubmit={onSubmitForm}
                    >
                        <label htmlFor="productName">Nom du produit:</label>
                        <input
                            type="text"
                            defaultValue={productName}
                            onChange={(e)=>{
                                setProductName(e.currentTarget.value)
                            }}
                        />
                        
                        <label htmlFor="file">Image:</label>
                        <input
                            type="file"
                            onChange={(e)=>{
                                setFile(e.currentTarget.files[0])
                            }}
                        />
                        
                        <label htmlFor="productType">Type de produit:</label>
                        <input
                            type="text"
                            defaultValue={productType}
                            onChange={(e)=>{
                                setProductType(e.currentTarget.value)
                            }}
                        />
        
                        <label htmlFor="description">Description:</label>
                        <textarea
                            name="description"
                            defaultValue={productDescription}
                            onChange={(e)=>{
                                setProductDescription(e.currentTarget.value)   
                            }}
                        >
                        </textarea>
                        
                        <label htmlFor="stock">Stock:</label>
                        <input
                            type="text"
                            defaultValue={stock}
                            onChange={(e)=>{
                                setStock(e.currentTarget.value)
                            }}
                        />
                        
                        <label htmlFor="sellingPrice">Prix-TTC:</label>
                        <input
                            type="text"
                            defaultValue={sellingPrice}
                            onChange={(e)=>{
                                setSellingPrice(e.currentTarget.value)
                            }}
                        />
                        
                        <button className="submit">Modifier</button>
                    </form>
                </section>
            </main>
        </HelmetProvider>
    )
    
}

export default EditProduct