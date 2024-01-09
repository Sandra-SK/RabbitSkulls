import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { selectProducts } from '../../../slices/productSlice';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons';
import { config } from '../../../config';
import { deleteOneProduct } from '../../../api/product';
import { loadProducts } from '../../../slices/productSlice';
import { displayProducts } from '../../../api/product';


const AdminProduct = () => {
  const product = useSelector(selectProducts);
  const dispatch = useDispatch();

  //suppression d'un produit
  const onClickDeleteProduct = (product_id) => {
    deleteOneProduct(product_id)
      .then((res) => {
        displayProducts()
          .then((response) => {
            dispatch(loadProducts(response.result));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <HelmetProvider>
      <main>
        <Helmet>
          <title>Rabbit Skulls e-commerce - administration produits</title>
          <meta name="description" content="page d'administration de fiches produits du site e-commerce rabbitskulls roller derby avignon, liste des fiches produits, liens vers le formulaire d'ajout ou de modification des fiches, suppression de fiches produits , authentification requise"/>
        </Helmet>
        <section id="admin-product-section">
          <h2>Mes articles</h2>
          <Link className="comeBack" to="/admin"><FontAwesomeIcon icon={faArrowCircleLeft}/> RETOUR</Link>
          <Link className="comeBack"to="/addProduct"><FontAwesomeIcon icon={faCirclePlus} /> NOUVEAU</Link>
          <table className="tableProduct">
            <thead>
              <tr>
                <th>Image</th>
                <th>Nom</th>
                <th>Prix</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {product.products.length > 0 ? (
                product.products.map((p) => (
                  <tr key={p.product_id}>
                    <td className="img-cell">
                      <img src={config.pict_url + p.picture} alt="" />
                    </td>
                    <td>{p.productName}</td>
                    <td className="price">{p.sellingPrice}€</td>
                    <td>
                      <Link to={`/editProduct/${p.product_id}`}>modifier</Link>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          onClickDeleteProduct(p.product_id);
                        }}
                      >
                        supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3"></td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </HelmetProvider>
  );
};

export default AdminProduct;
