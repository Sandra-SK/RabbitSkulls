import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux' 
//import des actions qui chargeront les produits venant du back
import {selectUser, connectUser} from '../slices/userSlice'
import {selectProducts, loadProducts} from '../slices/productSlice'
import {Navigate, useParams} from 'react-router-dom'
import {checkMyToken} from '../api/user'
import {displayProducts} from '../api/product'

//HOC de controle des datas et de la sécurité
const RequireDataAuth = (props) =>{
    //on récup les params de la route
    const params = useParams()
    //on récupère la state user dans le store en mode lecture
    const user = useSelector(selectUser)
    //on récupère la state beers dans le store en mode lecture
    const allProducts = useSelector(selectProducts)
    //on prépare la fonctionnalité pour dispatcher notre action dans le store
    const dispatch = useDispatch()
    //on récupère le composant à afficher qui a été passé en tant que props via App.js
    const Child = props.child
    //gestion de la redirection
    const [redirect, setRedirect] = useState(false)
    
    //au chargement de chaque composant
    useEffect(()=>{
        //si les produits ne sont pas chargés dans redux, on les charge (action du store)
        if(allProducts.products.length === 0){
            displayProducts()
            .then((res)=>{
                if(res.status === 200){
                    dispatch(loadProducts(res.result))
                }
            })
            .catch(err=>console.log(err))
        }
        
        //on va tester si on est connecté via les infos de redux
        //si l'utilisateur n'est pas logged (store)
        if(user.isLogged === false){
            //on récup le token dans le localStore
            const token = window.localStorage.getItem(process.env.REACT_APP_TOKEN_SECRET)
            //si le storagee répond null (pas trouvé) et que la props auth est true (route protégée)
            if(token === null && props.auth){
                //on demande une redirection
                setRedirect(true)
            //sinon
            }else{
                if(token !== null){
                    //on appel notre requète axios qui va vérifier le token dans le back checkToken
                    checkMyToken()
                    .then((res)=>{
                        //si le status de la réponse n'est pas 200
                        if(res.status !== 200){
                            //si la route est protégée
                            if(props.auth){
                                 //on demande la redirection
                                 setRedirect(true)
                            }   
                        //sinon
                        }else{
                            //on stock la réponse de la requète axios dans une variable user (retourne un objet)
                            let user = res.user
                            //on peut rajouter une propriété token à user avec le token dedans
                            user.token = token
                            //appel l'action de connexion de l'utilisateur (store)
                            dispatch(connectUser(user))
                        }
                    })
                    .catch(err=>console.log(err))
                }
            }
        }
    }, [props])
    
    if(redirect){
        return <Navigate to="/login"/>
    }
    return (<Child {...props} params={params}/>)
}

export default RequireDataAuth