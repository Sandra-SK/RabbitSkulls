import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux' 
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getOneOrder, updateOrder, sendOrderStatusMail } from '../../../api/order';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons';
import { Helmet, HelmetProvider } from 'react-helmet-async'

const OrderDetail = (props) => {
  const [order, setOrder] = useState(null);
  const [orderDetail, setOrderDetail] = useState([]);
  const [user, setUser] = useState(null);

  const changeStatus = (newStatus) => {
    let datas = {
      order_id: props.params.order_id,
      orderStatus: newStatus,
    };
    updateOrder(datas)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          recupOrder();
          sendOrderStatusMail(user.email, props.params.order_id, newStatus);
        } else {
          console.log(res);
        }
      });
  };
  
   

  const recupOrder = () => {
    getOneOrder(props.params.order_id)
      .then((res) => {
        setOrder(res.order);
        setOrderDetail(res.orderDetail);
        setUser(res.user);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    recupOrder();
  }, []);
  

  return (
    <HelmetProvider>
      <main>
        <Helmet>
          <title>Rabbit Skulls e-commerce - administration détails commande</title>
          <meta name="description" content="page d'administration de commandes du site e-commerce des rabbitskulls roller derby avignon, détail et gestion status de commandes , authentification requise"/>
        </Helmet>
        <section id="order-detail"> 
          <h2>Commande numéro {props.params.order_id}</h2>
          {user !== null && (
            <article>
              <h3>{user.firstName} {user.lastName.toUpperCase()}</h3>
              <p>{user.street}, {user.zip} {user.city}</p>
              <p>tel: {user.phone}</p>
              <p>email: {user.email}</p>
            </article>
          )}
          <div>
            <h4>Détails de la commande</h4>
            <table className="tableProduct">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Quantité</th>
                  <th>Prix</th>
                </tr>
              </thead>
              {order !== null && (
                <tfoot>
                  <tr>
                    <td></td>
                    <td></td>
                    <td id="price-text">Total</td>
                    <td className="price">{order.total} €</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Etat</td>
                    <td>{order.orderStatus}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Date</td>
                    <td>{moment(order.orderCreationTimestamp).format("DD/MM/YYYY")}</td>
                  </tr>
                </tfoot>
              )}
              <tbody>
                {orderDetail.length > 0 &&
                  orderDetail.map((o) => {
                    return (
                      <tr key={o.orderDetail_id}>
                        <td>{o.productName}</td>
                        <td>{o.quantity}</td>
                        <td>{o.totalOrderLine} €</td>
                        <td></td>
                      </tr>
                      
                    );
                  })}
                </tbody>
            </table>
          </div>
    
          <div className="button-bar">
          <button className="button"
              onClick={() => {
                changeStatus("prète");
              }}
            >
              Prète
            </button>
            <button className="button"
              onClick={() => {
                changeStatus("payée");
              }}
            >
              Payée 
            </button>
            <button className="button"
              onClick={() => {
                changeStatus("retirée");
              }}
            >
              Retirée
            </button>
          </div>
          <Link className="comeBack" to="/adminOrder"><FontAwesomeIcon icon={faArrowCircleLeft}/> RETOUR LISTE</Link>
        </section>
      </main>
    </HelmetProvider>
  );
};

export default OrderDetail;
