import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../assets/picture/Logo-Rabbitskulls.png'
import {useSelector} from 'react-redux' 
import {selectUser} from '../slices/userSlice'
import {selectBasket} from '../slices/basketSlice'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'


const Header = (props) =>{
    const user = useSelector(selectUser)
    const basket = useSelector(selectBasket)
    return (
        <header>
            <nav>
                <div className="list1">
                    <Link to="/">Accueil</Link>
                    <Link to="/product">Les goodies</Link>
                </div>
                {user.isLogged === false ? <div className="list2">
                    <Link to="/basket">mon panier <FontAwesomeIcon className="icon"icon={faCartShopping}/></Link>
                    <Link to="/register">S'enregistrer</Link>
                    <Link to="/login">Se connecter</Link>
                    
                </div> : <div className="list2">
                    <Link to="/basket">mon panier <FontAwesomeIcon className="icon"icon={faCartShopping}/>{basket.basket.length > 0 && <span className="span-basket"> {basket.basket.length}</span>}</Link>
                    {user.infos.role === "admin" && <Link to="/admin" id="nav-admin"> Administration</Link>}
                    <Link to="/profil"> {user.infos.firstName} {user.infos.lastName.toUpperCase()}</Link>
                    <Link to="/logout">déconnexion</Link>
                    
                </div>}
                

            </nav>
            <section className= "site-title">
                <img src={logo} className="headerLogo" alt="logo"/>
                <h1>Rabbit Skulls Roller Derby</h1>
            </section>
        </header>
    )
}

export default Header