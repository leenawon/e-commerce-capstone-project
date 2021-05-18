import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderListScreen(props) {
    const orderList = useSelector (state => state.orderList);
    const { loading, error, orders } = orderList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrders());
    }, [dispatch]);
    const deleteHandler = (order) => {
        //TODO: delete handler
    }
    return (
        <div>
            <div>
                <h1>주문</h1>
                    {loading ? <LoadingBox></LoadingBox>:
                    error ? <MessageBox variant="danger">{error}</MessageBox> : (
                <table className="table">
                <thead>
                    <tr>
                    <th>주문번호</th>
                    <th>고객</th>
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
                        <td>{order.user.name}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.isPaid ? order.paidAt.substring(0, 10): '결제 전'}</td>
                        <td>{order.isDelivered ? order.deliveredAt.subString(0, 10): '배송 전'}</td>
                        <td>
                        <button type="button" className="small" onClick={() => {props.history.push(`/order/${order._id}`)}}>
                            상세정보
                        </button>
                        <button type="button" className="small" onClick={()=> deleteHandler(order)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            )}
            </div>
        </div>
    )
}
