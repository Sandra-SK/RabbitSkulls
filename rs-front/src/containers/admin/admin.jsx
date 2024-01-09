import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async'

const Admin = (props) => {
  return (
    <HelmetProvider>
      <main>
        <Helmet>
          <title>Rabbit Skulls e-commerce - menu interface d'administration</title>
          <meta name="description" content="page d'administration du site e-commerce rabbitskulls roller derby avignon, menu interface d'administration, liens vers la gestion des commandes et gestion des fiches produits, authentification requise"/>
        </Helmet>
        <section id="admin-section">
          <h2>Administration</h2>
            <div className="button-bar">
              <Link to="/adminProduct"className="button">Administration des Produits</Link>
              <Link to="/adminOrder"className="button">Administration des Commandes</Link>
            </div>
        </section>
      </main>
    </HelmetProvider>
  );
};

export default Admin;
