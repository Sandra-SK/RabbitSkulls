import React from 'react'
import {Link} from 'react-router-dom'
import homePict from '../assets/picture/home-picture.jpg'
import { Helmet, HelmetProvider } from 'react-helmet-async'


const Home = (props) =>{
    return (
        <HelmetProvider> 
            <main>
                <Helmet>
                    <title>Rabbit Skulls e-commerce - page d'accueil</title>
                    <meta name="description" content="Page d'accueil du site e-commerce des RabbitSkulls Roller Derby Avignon, retrouvez notre selection de merchandising et reservez vos billets pour nos Bootcamps d'entraînements exclusifs."/>
                </Helmet>
                <section id="home-section">        
                    <p>e-commerce des Rabbit Skulls Roller Derby, tous les goodies du club et les billets pour vos events préférés</p>
                    <Link to="/product" className="button">La Boutique<span className="heart"> ♥</span></Link>
                    <img src={homePict} id="home-picture" alt=""/>
                    <h2> le club</h2>
                    <p> L'équipe est affiliée FFRS depuis ses début, notre philosophie appartient au Roller Derby : "Par les joueuses, pour les joueuses". La section derby est donc gérée par un bureau, élu chaque année par tous les membres de l'équipe, afin de prendre les décisions importantes relatives à notre sport, et d'organiser le fonctionnement de l'équipe à l'image des aspirations de tous.</p>
                    <p> Ce site à pour but de nous aider à générer des revenus pour financer nos déplacements pour nos Matchs amicaux et Championnat de France</p>
                    <Link to="/product" className="button">Je repère mes coups de coeurs<span className="heart icon"> ♥</span></Link>
                </section>
            </main> 
        </HelmetProvider>
      
    )
}

export default Home 
//