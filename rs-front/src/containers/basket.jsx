import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async'

import { selectUser } from '../slices/userSlice';
import { selectBasket, modifyBasket, cleanBasket } from '../slices/basketSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { saveOneOrder, sendOrderStatusMail } from '../api/order';

const Basket = (props) => {
  const basket = useSelector(selectBasket);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const [redirect2, setRedirect2] = useState(false);
  const [order_id, setOrder_id] = useState(null);
  const [totalBasket, setTotalBasket] = useState(0);

  // Calcul du total du panier
  useEffect(() => {
    setTotalBasket(calculateTotalBasket(basket.basket));
  }, [basket.basket]);

  const calculateTotalBasket = (basket) => {
    let totalBasket = 0;
    basket.forEach((product) => {
      totalBasket += parseFloat(product.sellingPrice) * parseInt(product.quantityInCart);
    });
    return totalBasket;
  };

  // Au clic sur "Valider votre commande"
const onClickSaveOrder = (e) => {
  e.stopPropagation();
  if (user.isLogged) {
    let datas = {
      user_id: user.infos.user_id,
      basket: basket.basket,
    };
    saveOneOrder(datas)
      .then((res) => {
        const { order_id } = res;
        const orderStatus = "validée";
        setOrder_id(order_id);
        setRedirect(true);
        sendOrderStatusMail(user.infos.email, order_id, orderStatus);
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    setRedirect2(true);
  }
};
  

  // Supprimer un produit du panier
  const removeFromBasket = (myProduct) => {
    let newBasket = basket.basket.filter((b) => b.product_id !== myProduct.product_id);
    dispatch(modifyBasket(newBasket));
  };

  // Ajouter une quantité
  const addQuantity = (myProduct) => {
    let newBasket = basket.basket.map((b) => {
      if (b.product_id === myProduct.product_id) {
        return {
          ...b,
          quantityInCart: b.quantityInCart + 1,
        };
      }
      return b;
    });
    dispatch(modifyBasket(newBasket));
  };

  // Supprimer une quantité
  const removeQuantity = (myProduct) => {
    let newBasket = basket.basket.map((b) => {
      if (b.product_id === myProduct.product_id && b.quantityInCart > 1) {
        return {
          ...b,
          quantityInCart: b.quantityInCart - 1,
        };
      }
      return b;
    });
    dispatch(modifyBasket(newBasket));
  };

  // Vider le panier
  const vider = () => {
    window.localStorage.removeItem('rs-basket');
    dispatch(cleanBasket());
  };

  const listBasket = () => {
    return basket.basket.map((product) => {
      let total = parseFloat(product.sellingPrice) * parseInt(product.quantityInCart);
      return (
        <tr key={product.product_id}>
          <td>
            <button onClick={() => removeQuantity(product)}>-</button>
          </td>
          <td>{product.quantityInCart}</td>
          <td>
            <button onClick={() => addQuantity(product)}>+</button>
          </td>
          <td>{product.productName}</td>
          <td>{product.sellingPrice}</td>
          <td>{total}</td>
          <td>
            <button onClick={() => removeFromBasket(product)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </td>
        </tr>
      );
    });
  };

  if (redirect) {
    return <Navigate to={`/success`} />;
  }
  if (redirect2) {
    return <Navigate to={`/login`} />;
  }

  return (
    <HelmetProvider>
      <main>
        <Helmet>
          <title>Rabbit Skulls e-commerce - panier</title>
          <meta name="description" content="page panier du site e-commerce des RabbitSkulls Roller Derby Avignon, visualisez votre selection, modifiez les quantités, supprimez des articles, valider vos achats"/>    
        </Helmet>
        <section id="basket-section">
          <h2>Le panier du lapin</h2>
          {basket.basket.length > 0 ? (
            <table className="basketTable">
              <thead>
                <tr>
                  <th></th>
                  <th>Qté</th>
                  <th></th>
                  <th>Article</th>
                  <th>Prix unitaire</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{listBasket()}</tbody>
              <tfoot>
                <tr>
                  <td colSpan={5}>
                  </td>
                </tr>
              </tfoot>
            </table>
          ) : (
            <p>Votre panier est vide.</p>
          )}
    
          <p className="totalBasket">Total Panier : {totalBasket}€</p>
          <div className="button-bar">
            <button className="button" onClick={vider}>Reset</button>
              {basket.basket.length > 0 && (
              <button className="button" onClick={onClickSaveOrder}>Valider votre commande</button>
              )}
          </div>    
        </section>
      </main>
    </HelmetProvider>
  );
};

export default Basket;
