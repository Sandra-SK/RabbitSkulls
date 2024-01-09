import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import {selectProducts} from "../slices/productSlice"
import ArticleDetail from '../components/article-product'

const Product = (props)=>{
    
    const articles = useSelector(selectProducts)
    
    return (
        <HelmetProvider>
            <main>
                <Helmet>
                    <title>Rabbit Skulls e-commerce - les Goodies</title>
                    <meta name="description" content=" mozaïque des produits vendus sur le site e-commerce des RabbitSkulls Roller Derby Avignon, parcourez notre selection de merchandising et reservez vos billets pour nos Bootcamps d'entraînements exclusifs"/>    
                </Helmet>
                <section id="products-section">
                    <h2>Les trésors du terrier</h2>
                    {articles.products.length > 0 && <ul id="ulProducts">
                        {articles.products.map((p)=>{
                            return <ArticleDetail key={p.product_id} prod={p}/>
                        })}
                    </ul>}
                  
                </section>
            </main>
        </HelmetProvider>
    )
}

export default Product