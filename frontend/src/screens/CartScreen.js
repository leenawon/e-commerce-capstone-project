import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';

export default function CartScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split('=')[1]) : 1;
    
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const dispatch = useDispatch();
    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        //delete action
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping');
    }

    return (
        <div className="row top">
            <div className="col-2">
                <h1>장바구니</h1>
                {cartItems.length === 0 ? <MessageBox>장바구니가 비었습니다 <Link to="/">쇼핑 하러가기</Link></MessageBox>
                :
                (
                    <ul>
                        {
                            cartItems.map((item) => (
                                <li key={item.product}>
                                    <div className="row">
                                        <div>
                                            <img src={item.image} alt={item.name} className="small" />
                                        </div>
                                        <div className="min-30">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div>
                                            <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                {
                                                    [...Array(item.countInStock).keys()].map( (x) => (
                                                        <option key={x+1} value={x+1}>{x+1}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div>
                                            ${item.price}
                                        </div>
                                        <div>
                                            <button type="button" onClick={() => removeFromCartHandler(item.product)}>삭제</button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                )
                }
            </div>
            <div className="col-1">
                <div className="product-card card-content">
                    <ul>
                        <li>
                            <h2>
                                결제예상금액 ({cartItems.reduce((a,c) => a + c.qty, 0)} items): ${cartItems.reduce((a,c) => a + c.price * c.qty, 0)}
                            </h2>
                        </li>
                        <li>
                            <button type="button" onClick={checkoutHandler} className="primary block" disabled={cartItems.length === 0}>주문하기</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
