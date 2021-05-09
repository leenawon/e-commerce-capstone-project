import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderHistoryScreen(props) {
  const orderMineList = useSelector(state => state.orderMineList);
  const {loading, error, orders} = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <div>
      <h1>주문 내역</h1>
      {loading ? <LoadingBox></LoadingBox>:
      error ? <MessageBox variant="danger">{error}</MessageBox> : (
        <table className="table">
          <thead>
            <tr>
              <th>주문번호</th>
              <th>주문날짜</th>
              <th>총 금액</th>
              <th>결제여부</th>
              <th>배송여부</th>
              <th>상세보기</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10): 'No'}</td>
                <td>{order.isDelivered ? order.deliveredAt.subString(0, 10): 'No'}</td>
                <td>
                  <button type="button" className="small" onClick={() => {props.history.push(`/order/${order._id}`)}}>
                    상세정보
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
      }
    </div>
  )
};
