import React, { useState, useEffect } from 'react';
import { loginUser } from '../../api/user';
import { Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async'

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmitForm = (e) => {
    e.preventDefault();

    let datas = {
      email: email,
      password: password,
    };

    loginUser(datas)
      .then((res) => {
        if (res.status === 200) {
          window.localStorage.setItem(process.env.REACT_APP_TOKEN_SECRET, res.token);
          setShowMessage(true);
        } else {
          setErrorMessage('Erreur de connexion. Veuillez vérifier vos identifiants.');
          console.log(res);
        }
      })
      .catch((err) => {
        setErrorMessage('Une erreur est survenue lors de la connexion.');
        console.log('CATCH', err);
      });
  };

  useEffect(() => {
    let errorTimeout;
    if (errorMessage) {
      errorTimeout = setTimeout(() => {
        setErrorMessage('');
      }, 3000); 
    }
    return () => clearTimeout(errorTimeout);
  }, [errorMessage]);
  
  
  useEffect(() => {
    let timeout;
    if (showMessage) {
      timeout = setTimeout(() => {
        setRedirect(true);
      }, 2000); 
    }
    return () => clearTimeout(timeout);
  }, [showMessage]);
  
  if (redirect) {
    window.location.href = "/"; //Rafraîchi la page après connexion actualisation du rendu du header
  }
  

  return (
    <HelmetProvider>
      <main>
        <Helmet>
          <title>Rabbit Skulls e-commerce - page de connexion</title>
          <meta name="description" content="Connectez vous à votre espace utilisateur du site e-commerce des RabbitSkulls Roller Derby Avignon, retrouvez notre selection de merchandising et reservez vos billets pour nos Bootcamps d'entraînements exclusifs."/>
        </Helmet>
        <section id="login-section">
          <h2>Se connecter</h2>
    
          <form id="login-form" onSubmit={onSubmitForm}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              autoComplete="email"
              placeholder="Votre mail"
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
              required
            />
            <label htmlFor="password">Mot de Passe</label>
            <input
              type="password"
              autoComplete="current-password"
              placeholder="Votre mot de passe"
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
              required
            />
    
            <input type="submit" name="log" className="submit" />
          </form>
          
          {showMessage && <p className = "okMessage">Connexion réussie ! Redirection vers la page d'accueil en cours...</p>}
          {errorMessage && <p className = "errorMessage">{errorMessage}</p>}
        </section>
      </main>
    </HelmetProvider>
  );
};

export default Login;

