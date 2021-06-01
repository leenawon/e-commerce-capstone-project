import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if(!cart.paymentMethod) {
    props.history.push('/payment');
  }
  const orderCreate = useSelector(state => state.orderCreate);
  const {loading, success, error, order} = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice;

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({...cart, orderItems: cart.cartItems}));
  };

  useEffect(()=> {
    if(success) {
      props.history.push(`/order/${order._id}`);
      dispatch({type: ORDER_CREATE_RESET});
    }
  },[dispatch, order, props.history, success]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="product-card card-content">
                <h2>배송지</h2>
                <p>
                  <strong>이름:</strong> {cart.shippingAddress.fullName} <br/>
                  <strong>주소:</strong> {cart.shippingAddress.city}, {cart.shippingAddress.country}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.address}
                </p>
              </div>
            </li>
            <li>
              <div className="product-card card-content">
                <h2>결제</h2>
                <p>
                  <strong>결제 수단:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="product-card card-content">
                <h2>주문 상품</h2>
                <ul>
                  {
                    cart.cartItems.map((item) => (
                      <li key={item.product}>
                        <div className="row">
                            <div>
                                <img src={item.image} alt={item.name} className="small" />
                            </div>
                            <div className="min-30">
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </div> 
                            <div>
                                {item.qty} x {item.price}원 = {item.qty * item.price}원
                            </div> 
                        </div>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="product-card card-content">
            <ul>
              <li>
                <h2>결제 금액 합계</h2>
              </li>
              <li>
                <div className="row">
                  <div>상품 금액</div>
                  <div>${cart.itemsPrice.toFixed}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>배송비</div>
                  <div>${cart.shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>총 결제 금액</strong>
                  </div>
                  <div>
                    <strong>${cart.totalPrice}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button type="button" onClick={placeOrderHandler} className="primary block" disabled={cart.cartItems.length === 0}>주문하기</button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
