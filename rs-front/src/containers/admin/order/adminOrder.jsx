import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getAllOrders } from '../../../api/order';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons';
import { Helmet, HelmetProvider } from 'react-helmet-async'


const AdminOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders()
      .then((res) => {
        setOrders(res.result);
      })
      .catch((err) => console.log(err));
  }, []);

  const filterOrdersByStatus = (status) => {
    return orders.filter((o) => o.orderStatus === status);
  };

  return (

      <HelmetProvider>
        <main>
          <Helmet>
            <title>Rabbit Skulls e-commerce - Administration Commandes</title>
            <meta name="description" content="page d'administration de commande, visualisation globale des status de commandes du site e-commerce rabbitskulls roller derby avignon, authentification requise"/>
          </Helmet>
          <section id="admin-order-section">
            <Link className="comeBack" to="/admin"><FontAwesomeIcon icon={faArrowCircleLeft}/> MENU ADMIN</Link>
            <h2> Liste des Commandes </h2>
              <div className="filtered-orderStatus-part">
                <h3>Validées</h3>
                <table className="tableProduct">
                  <thead>
                    <tr>
                      <th>Numéro</th>
                      <th>Total</th>
                      <th>Date de confirmation</th>
                      <th>Etat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterOrdersByStatus('validée').map((o) => (
                      <tr key={o.order_id}>
                        <td>
                          <Link to={`/orderDetail/${o.order_id}`}>{o.order_id} <FontAwesomeIcon className="icon" icon={faEye}/></Link>
                        </td>
                        <td>{o.total} €</td>
                        <td>{moment(o.creationTimestamp).format('DD-MM-YYYY')}</td>
                        <td>{o.orderStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
        
              
              <div className="filtered-orderStatus-part">
                <h3>Prètes - à payer</h3>
                <table className="tableProduct">
                  <thead>
                    <tr>
                      <th>Numéro</th>
                      <th>Total</th>
                      <th>Date de confirmation</th>
                      <th>Etat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterOrdersByStatus('prète').map((o) => (
                      <tr key={o.order_id}>
                        <td>
                          <Link to={`/orderDetail/${o.order_id}`}>{o.order_id} <FontAwesomeIcon className="icon" icon={faEye}/></Link>
                        </td>
                        <td>{o.total} €</td>
                        <td>{moment(o.creationTimestamp).format('DD-MM-YYYY')}</td>
                        <td>{o.orderStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>  
        
              <div className="filtered-orderStatus-part">
                <h3>Payées - à récupérer</h3>
                <table className="tableProduct">
                  <thead>
                    <tr>
                      <th>Numéro</th>
                      <th>Total</th>
                      <th>Date de confirmation</th>
                      <th>Etat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterOrdersByStatus('payée').map((o) => (
                      <tr key={o.order_id}>
                        <td>
                          <Link to={`/orderDetail/${o.order_id}`}>{o.order_id} <FontAwesomeIcon className="icon" icon={faEye}/></Link>
                        </td>
                        <td>{o.total} €</td>
                        <td>{moment(o.creationTimestamp).format('DD-MM-YYYY')}</td>
                        <td>{o.orderStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>  
        
              <div className="filtered-orderStatus-part">
                <h3>Retirées par le client</h3>
                <table className="tableProduct">
                  <thead>
                    <tr>
                      <th>Numéro</th>
                      <th>Total</th>
                      <th>Date de confirmation</th>
                      <th>Etat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterOrdersByStatus('retirée').map((o) => (
                      <tr key={o.order_id}>
                        <td>
                          <Link to={`/orderDetail/${o.order_id}`}>{o.order_id} <FontAwesomeIcon className="icon" icon={faEye}/></Link>
                        </td>
                        <td>{o.total} €</td>
                        <td>{moment(o.creationTimestamp).format('DD-MM-YYYY')}</td>
                        <td>{o.orderStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>  
          </section>
        </main>
      </HelmetProvider>
   
  );
};

export default AdminOrder;
