import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { detailsProduct } from '../actions/productActions';

export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const {loading, error, product} = productDetails;

    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    };

    return  (
        <div>
            {loading? (
                <LoadingBox></LoadingBox>
                ) : error ? ( 
                <MessageBox variant="danger">{error}</MessageBox>
                ) : (
            <div>
            <Link to="/" className="back"><i className="fas fa-arrow-left"></i>이전 페이지로</Link>
            <div className="row top">
                <div className="col-2">
                    <img className="large" src={product.image} alt={product.name}></img>
                </div>
                    <div className="col-1 card-content">
                        <ul>
                            <li>
                                <h1>{product.name}</h1>
                            </li>
                            <li>
                            <Rating
                                rating={product.rating}
                                numReviews={product.numReviews}
                            ></Rating>    
                            </li>
                            <li>가격 : {product.price}원</li>
                            <li>
                                상품설명:
                                <p>{product.description}</p>
                            </li>
                        </ul>
                    </div>
                    <div className="col-1">
                        <div className="product-card card-content">
                            <ul>
                                <li> 
                                    <h2>
                                        셀러 : <Link to={`/seller/${product.seller._id}`}>
                                            {product.seller.seller.name}
                                        </Link>
                                    </h2>
                                    <Rating rating={product.seller.seller.rating} numReviews={product.seller.seller.numReviews}></Rating>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>가격</div>
                                        <div className="price">{product.price}원</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>구매가능여부</div>
                                        <div>{product.countInStock > 0 ? ( <span className="success">구매가능</span> ) : (
                                        <span className="danger">품절</span>)}
                                        </div>
                                    </div>
                                </li>
                                {product.countInStock > 0 && (
                                    <>
                                        <li>
                                            <div className="row">
                                                <div>수량</div>
                                                <div>
                                                    <select className="select"
                                                        value={qty} 
                                                        onChange={(e) => setQty(e.target.value)}>
                                                        {
                                                            [...Array(product.countInStock).keys()].map( (x) => (
                                                                <option key={x+1} value={x+1}>{x+1}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                                <button onClick={addToCartHandler}  className="primary block"> 장바구니에 담기</button>
                                        </li>
                                    </>
                                    
                                )}
                                
                                
                            </ul>
                            
                        </div>
                    </div>
                </div>
            </div>
    )}
    </div>
        
    )
}