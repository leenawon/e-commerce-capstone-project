import Axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const {order, loading, error} = orderDetails;
  const dispatch = useDispatch();

  useEffect(()=> {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type="text/javascript";
      script.src=`https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if(!order) {
      dispatch(detailsOrder(orderId));
    } else {
      if(!order.isPaid) {
        if(!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  },[dispatch, order, orderId, sdkReady]);

  const successPaymentHandler = () => {
    //TODO: dispatch pay order
  };

  return loading? (<LoadingBox></LoadingBox>) : error? (<MessageBox variant="danger">{error}</MessageBox>) : (
    <div>
      <h1>주문 번호 {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="product-card card-content">
                <h2>배송지</h2>
                <p>
                  <strong>이름:</strong> {order.shippingAddress.fullName} <br/>
                  <strong>주소:</strong> {order.shippingAddress.city}, {order.shippingAddress.country}, {order.shippingAddress.postalCode}, {order.shippingAddress.address}
                </p>
                {order.isDelivered? <MessageBox variant="success">배송 날짜 {order.deliveredAt}</MessageBox> : <MessageBox variant="danger">배송 전</MessageBox>}
              </div>
            </li>
            <li>
              <div className="product-card card-content">
                <h2>결제</h2>
                <p>
                  <strong>결제 수단:</strong> {order.paymentMethod}
                </p>
                {order.isPaid? <MessageBox variant="success">결제 날짜 {order.PaidAt}</MessageBox> : <MessageBox variant="danger">결제 전</MessageBox>}
              </div>
            </li>
            <li>
              <div className="product-card card-content">
                <h2>주문 상품</h2>
                <ul>
                  {
                    order.orderItems.map((item) => (
                      <li key={item.product}>
                        <div className="row">
                            <div>
                                <img src={item.image} alt={item.name} className="small" />
                            </div>
                            <div className="min-30">
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </div> 
                            <div>
                                {item.qty} x ${item.price} = ${item.qty * item.price}
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
                  <div>${order.itemsPrice.toFixed}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>배송비</div>
                  <div>${order.shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>총 결제 금액</strong>
                  </div>
                  <div>
                    <strong>${order.totalPrice}</strong>
                  </div>
                </div>
              </li>
              {
                !order.isPaid && (
                  <li>
                    {!sdkReady? (<LoadingBox></LoadingBox>) : 
                    (
                      <PayPalButton 
                      amount={order.totalPrice} onSuccess={successPaymentHandler}>
                      </PayPalButton>
                    )}
                  </li>
                )
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
