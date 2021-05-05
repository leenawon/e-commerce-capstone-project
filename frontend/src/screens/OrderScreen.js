import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const {order, loading, error} = orderDetails;
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(detailsOrder(orderId));
  },[dispatch, orderId]);

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
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
