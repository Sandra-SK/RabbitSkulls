import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { selectUser} from '../../slices/userSlice';
import { updateProfil } from '../../api/user';

const Profil = (props) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [msg, setMsg] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [street, setStreet] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    setFirstName(user.infos.firstName);
    setLastName(user.infos.lastName);
    setStreet(user.infos.street);
    setZip(user.infos.zip);
    setCity(user.infos.city);
    setPhone(user.infos.phone);
  }, [user]);

  const onSubmitForm = (event) => {
    event.preventDefault()  
      
    let datas = {
      firstName: firstName,
      lastName: lastName,
      address: street,
      zip: zip,
      city: city,
      phone: phone,
    };

  updateProfil(datas, user.infos.user_id)
    .then((res) => {
      console.log(res);
      if (res.status !== 200) {
        setErrorMessage('Erreur lors de la modification');
        setShowMessage(true);
        return Promise.reject('Erreur lors de la modification');
      }
      setMsg('Profil modifié avec succès!');
      setShowMessage(true);
      return Promise.resolve();
    })
    .catch((err) => {
      console.log(err);
  
    });
};

  useEffect(() => {
    let errorTimeout;
    if (errorMessage) {
      setShowMessage(true);
      errorTimeout = setTimeout(() => {
        setErrorMessage('');
        setShowMessage(false);
      }, 5000);
    }
    return () => clearTimeout(errorTimeout);
  }, [errorMessage]);

  useEffect(() => {
    let msgTimeout;
    if (msg) {
      setShowMessage(true);
      msgTimeout = setTimeout(() => {
        setMsg('');
        setShowMessage(false);
      }, 5000);
    }
    return () => clearTimeout(msgTimeout);
  }, [msg]);

  return (
    <HelmetProvider>
      <main>
        <Helmet>
          <title>Rabbit Skulls e-commerce - profil utilisateur</title>
          <meta
            name="description"
            content="page profil utilisateur du site e-commerce des RabbitSkulls Roller Derby Avignon: visualisation, gestion et modification des données personnelles du compte utilisateur"
          />
        </Helmet>
        <section id="profil-section">
          <h1>Mon profil</h1>
          <form id="profil-form" onSubmit={onSubmitForm}>
            <label htmlFor="firstName">Prénom:</label>
            <input type="text"
                defaultValue={user.infos.firstName}
                onChange={(e)=>{
                    setFirstName(e.currentTarget.value)
                }}
            />
            
            <label htmlFor="lastName">Nom:</label>
            <input type="text"
                defaultValue={user.infos.lastName}
                onChange={(e)=>{
                    setLastName(e.currentTarget.value)
                }}
            />
            
            <label htmlFor="street">Adresse:</label>
            <input type="text"
                defaultValue={user.infos.street}
                onChange={(e)=>{
                    setStreet(e.currentTarget.value)
                }}
            />
            
            <label htmlFor="Zip">Code Postal:</label>
            <input type="text"
                defaultValue={user.infos.zip}
                onChange={(e)=>{
                    setZip(e.currentTarget.value)
                }}
            />
            
            <label htmlFor="city">Ville:</label>
            <input type="text"
                defaultValue={user.infos.city}
                onChange={(e)=>{
                    setCity(e.currentTarget.value)
                }}
            />
            
            <label htmlFor="phone">Téléphone:</label>
            <input type="text"
                defaultValue={user.infos.phone}
                onChange={(e)=>{
                    setPhone(e.currentTarget.value)
                }}
            />
            <input type="submit" value="Modifier le Profil" name="Enregistrer" className="submit" />
          </form>
          <p>
            Vos informations de profil ont changé?<br /> Saisir vos nouvelles informations dans les
            champs concernés, puis cliquer sur "Modifier le Profil".
          </p>
          {showMessage && (
            <div>
              {msg && <p className="okMessage">{msg}</p>}
              {errorMessage && <p className="errorMessage">{errorMessage}</p>}
            </div>
          )}
        </section>
      </main>
    </HelmetProvider>
  );
};

export default Profil;
