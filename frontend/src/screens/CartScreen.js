import React from 'react';

export default function CartScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split('=')[1]) : 1;
    return (
        <div>
            <h1>Cart Screen</h1>
            <p>장바구니에 담기: 상품아이디: {productId} Qty: {qty} </p>
        </div>
    );
}
