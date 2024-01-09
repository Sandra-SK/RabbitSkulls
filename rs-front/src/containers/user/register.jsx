import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { addOneUser } from '../../api/user';


const Register = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [street, setStreet] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmitForm = (e) => {
    e.preventDefault();

    let datas = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      street: street,
      zip: zip,
      city: city,
      phone: phone,
    };

    addOneUser(datas)
      .then((res) => {
        if (res.status === 200) {
          setShowMessage(true);
        } else {
          console.log(res);
          setErrorMessage("erreur, merci de verifier que tous les champs soient corrects et au bon format")
        }
      })
      .catch((err) => {
        console.log('CATCH', err);
        setErrorMessage('Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.');
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
    return <Navigate to="/login" />;
  }
  
  


  return (
    <HelmetProvider>
      <main>
        <Helmet>
          <title>Rabbit Skulls e-commerce - formulaire d'enregistrement compte utilisateur</title>
          <meta name="description" content="page d'enregistrement de compte utilisateur du site e-commerce des RabbitSkulls Roller Derby Avignon "/>    
        </Helmet>
        <section id="register-section">
          <h2>S'enregistrer</h2>
          
          <form id="register-form"
                    onSubmit={onSubmitForm}
                >
                    <label htmlFor="firstName">Prénom</label>
                    <input type="text"
                        autoComplete="firstName"
                        placeholder="Votre prénom"
                        onChange={(e)=>{
                            setFirstName(e.currentTarget.value)
                        }}
                        required
                    />
                    <label htmlFor="lastName">Nom</label>
                    <input type="text"
                        autoComplete="lastName"
                        placeholder="Votre nom"
                        onChange={(e)=>{
                            setLastName(e.currentTarget.value)
                        }}
                        required
                    />
                    <label htmlFor="email">Email</label>
                    <input type="email"
                    autoComplete="email"
                        placeholder="Votre mail"
                        onChange={(e)=>{
                            setEmail(e.currentTarget.value)
                        }}
                        required
                    />
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password"
                        autoComplete="current-password"
                        placeholder="Votre mot de passe"
                        onChange={(e)=>{
                            setPassword(e.currentTarget.value)
                        }}
                        required
                    />
                    <label htmlFor="street">Adresse</label>
                    <input type="text"
                        autoComplete="street"
                        placeholder="Votre adresse"
                        onChange={(e)=>{
                            setStreet(e.currentTarget.value)
                        }}
                        required
                    />
                    <label htmlFor="zip">Code postal</label>
                    <input type="text"
                        autoComplete="zip"
                        placeholder="Votre Code postal"
                        onChange={(e)=>{
                            setZip(e.currentTarget.value)
                        }}
                        required
                    />
                    <label htmlFor="city">Ville</label>
                    <input type="text"
                        autoComplete="city"
                        placeholder="Votre ville"
                        onChange={(e)=>{
                            setCity(e.currentTarget.value)
                        }}
                        required
                    />
                    <label htmlFor="phone">Téléphone</label>
                    <input type="text"
                        autoComplete="phone"
                        placeholder="Votre téléphone"
                        onChange={(e)=>{
                            setPhone(e.currentTarget.value)
                        }}
                        required
                    />
                    
                    <input type="submit" name="Enregistrer" className="submit" />
                    
                </form>
          {showMessage &&<p className= "okMessage">Bravo tu es maintenant enregistré.e ! Redirection vers la page login en cours...</p>}
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        </section>
      </main>
    </HelmetProvider>
  );
};
export default Register;

