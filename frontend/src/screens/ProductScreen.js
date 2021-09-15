import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { createReview, detailsProduct } from '../actions/productActions';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';

export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const {loading, error, product} = productDetails;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const {loading: loadingReviewCreate, error: errorReviewCreate, success: successReviewCreate} = productReviewCreate;

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        if(successReviewCreate) {
            window.alert("리뷰가 성공적으로 작성되었습니다");
            setRating('');
            setComment('');
            dispatch({type: PRODUCT_REVIEW_CREATE_RESET});
        }
        dispatch(detailsProduct(productId));
    }, [dispatch, productId, successReviewCreate]);

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if(comment && rating) {
            dispatch(createReview(productId, {rating, comment, name: userInfo.name}))
        } else {
            alert('별점과 리뷰를 작성해주세요');
        }
    }

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
                <div>
                    <h2 id="reviews">Reviews</h2>
                    {product.reviews.length === 0 && <MessageBox>작성된 리뷰가 없습니다.</MessageBox>}
                    <ul>
                        {product.reviews.map((review) => (
                            <li key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating rating={review.rating} caption=" "></Rating>
                                <p>{review.createdAt.substring(0,10)}</p>
                                <p>{review.comment}</p>
                            </li>
                        ))}
                        <li>
                            {userInfo ? (
                                <form className="form" onSubmit={submitHandler}>
                                    <div>
                                        <h2>리뷰 작성</h2>
                                    </div>
                                    <div>
                                        <label htmlFor="rating">별점</label>
                                        <select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                                            <option value="">선택하세요...</option>
                                            <option value="1">1점</option>
                                            <option value="2">2점</option>
                                            <option value="3">3점</option>
                                            <option value="4">4점</option>
                                            <option value="5">5점</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="comment">리뷰를 작성해주세요</label>
                                        <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                                    </div>
                                    <div>
                                        <label/>
                                        <button type="submit" className="primary">
                                            작성하기
                                        </button>
                                    </div>
                                    <div>
                                        {loadingReviewCreate && <LoadingBox></LoadingBox>}
                                        {errorReviewCreate && <MessageBox variant="danger">{errorReviewCreate}</MessageBox>}
                                    </div>
                                </form>
                            ) : (
                                <MessageBox>
                                    리뷰를 작성하기 위해 <Link to="/signin">로그인</Link> 해주세요
                                </MessageBox>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
    )}
    </div>
        
    )
}