import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import SearchBox from './components/SearchBox';
import SellerRoute from './components/SellerRouter';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderListScreen from './screens/OrderlistScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import SearchScreen from './screens/SearchScreen';
import SellerScreen from './screens/SellerScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';


function App() {
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const {userInfo} = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };


  return (
    <BrowserRouter>
      <div className="grid-container">
        {/* Header */}
        <header className="row-sorting">
          <div>
            <Link to="/" className="brand">
            Thinket</Link>
          </div>
          <div>
            <Route render={({history}) => <SearchBox history={history}></SearchBox>}></Route>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">
                  {cartItems.length}
                </span>
              )}
            </Link>
            {
              userInfo ? (
                <div className="dropdown">
                  <Link to="#">{userInfo.name} <i className = "fa fa-caret-down"></i></Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/profile">내 프로필</Link>
                    </li>
                    <li>
                      <Link to="/orderhistory">주문내역</Link>
                    </li>
                    <li>
                      <Link to="#signout" onClick={signoutHandler}>
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                </div>
              ) :
              (
                <Link to="/signin">Sign In</Link>
              )
            }
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
              <Link to="#admin">
                Seller {' '}<i className="fa fa-caret-down"></i>
              </Link>
              <ul className ="dropdown-content">
                <li>
                  <Link to="/productlist/seller">상품 목록</Link>
                </li>
                <li>
                  <Link to="/orderlist/seller">주문 내역</Link>
                </li>
              </ul>
            </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin {' '}<i className="fa fa-caret-down"></i>
                </Link>
                <ul className ="dropdown-content">
                  <li>
                    <Link to="/dashboard">대시보드</Link>
                  </li>
                  <li>
                    <Link to="/productlist">상품 목록</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">주문 내역</Link>
                  </li>
                  <li>
                    <Link to="/userlist">사용자 목록</Link>
                  </li>
                </ul>
              </div>
            )}
            
          </div>
        </header>
        {/* Main */}
        <main>
          <Route path="/seller/:id" component={SellerScreen}></Route>
          <Route path="/cart/:id?" component = {CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route exact path="/search/name/:name?" component={SearchScreen}></Route>
          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
          <AdminRoute path="/productlist" component={ProductListScreen} exact></AdminRoute>
          <AdminRoute path="/orderlist" component={OrderListScreen} exact></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
          <SellerRoute path="/productlist/seller" component={ProductListScreen}></SellerRoute>
          <SellerRoute path="/orderlist/seller" component={OrderListScreen}></SellerRoute>

          <Route path="/" component={HomeScreen} exact></Route>
          
        </main>
        <footer className="row-sorting center">
          All right reserved
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
