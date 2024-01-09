import './App.css';
import Header from './components/header'
import Footer from './components/footer'
import Home from './containers/home'
import Register from './containers/user/register'
import Login from './containers/user/login'
import Logout from './containers/user/logout'
import Profil from './containers/user/profil'
import Product from './containers/product'
import Detail from './containers/detail'
import Admin from './containers/admin/admin'
import AdminProduct from './containers/admin/product/adminProduct'
import AddProduct from './containers/admin/product/addProduct'
import EditProduct from './containers/admin/product/editProduct'
import OrderDetail from './containers/admin/order/orderDetail'
import AdminOrder from './containers/admin/order/adminOrder'
import Basket from './containers/basket'
import Success from './containers/success'
import { Routes, Route } from 'react-router-dom'
import RequireDataAuth from './helpers/require-data-auth'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          exact
          path="/"
          element={<RequireDataAuth child={Home} auth={false} />}
        />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/logout"
          element={<RequireDataAuth child={Logout} auth={true} />}
        />
        <Route
          exact
          path="/profil"
          element={<RequireDataAuth child={Profil} auth={true} />}
        />
        <Route
          exact
          path="/product"
          element={<RequireDataAuth child={Product} auth={false} />}
        />
        <Route
          exact
          path="/detail/:product_id"
          element={<RequireDataAuth child={Detail} auth={false} />}
        />
        <Route
          exact path='/admin' element={<RequireDataAuth child={Admin} auth={true} />}/>
        <Route
          exact
          path="/adminProduct"
          element={<RequireDataAuth child={AdminProduct} auth={true} />}
        />
        <Route
          exact
          path="/adminOrder"
          element={<RequireDataAuth child={AdminOrder} auth={true} />}
        />
        <Route
          exact
          path="/addProduct"
          element={<RequireDataAuth child={AddProduct} auth={true} />}
        />
        <Route
          exact
          path="/editProduct/:product_id"
          element={<RequireDataAuth child={EditProduct} auth={true} />}
        />
        <Route
          exact
          path="/orderDetail/:order_id"
          element={<RequireDataAuth child={OrderDetail} auth={true} />}
        />
        <Route
          exact
          path="/basket"
          element={<RequireDataAuth child={Basket} auth={true} />}
        />

        <Route
          exact
          path="/success"
          element={<RequireDataAuth child={Success} auth={true} />}
        />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
