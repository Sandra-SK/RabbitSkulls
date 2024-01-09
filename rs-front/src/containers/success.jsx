import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { cleanBasket } from '../slices/basketSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons';

const Success = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.localStorage.removeItem('rs-basket');
    dispatch(cleanBasket());
  }, [dispatch]);

  return (
    <HelmetProvider>
      <main>
        <Helmet>
          <title>Rabbit Skulls e-commerce - commande validée</title>
          <meta name="description" content="Votre commande est confirmée ! Découvrez nos offres spéciales et notre gamme complète de produits Roller Derby chez RabbitSkulls Roller Derby Avignon. Explorez notre collection de merchandising, et réservez vos places pour nos événements à venir. "/>    
        </Helmet>
        <section id="success-section">
          <h2>Le terrier vous félicite <span className="heart"> ♥</span></h2>
          <p>Votre commande a été enregistrée avec succès.</p>
          <p>Un mail vous sera envoyé dès que votre commande sera disponible sur le point de retrait.</p>
          <p>Règlement sur place par CB SumUp, PAYPAL ou Espèces.</p>
          <Link className="comeBack" to="/"><FontAwesomeIcon icon={faArrowCircleLeft}/> RETOUR ACCUEIL</Link>
        </section>
      </main>
    </HelmetProvider>
  );
};

export default Success;






