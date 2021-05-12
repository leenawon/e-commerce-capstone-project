import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  const productDetails = useSelector(state => state.productDetails);
  const {loading, error, product} = productDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    if(!product || (product._id !== productId)) {
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
    }
  }, [product, dispatch, productId]);

  const submitHandler = (e) => {
    e.preventDefault();
    //TODO: dispatch update product
  }
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>상품 수정 {productId}</h1>
        </div>
        {
          loading ? <LoadingBox></LoadingBox>
          : error ? <MessageBox variant="danger">{error}</MessageBox>
          :
          <>
            <div>
              <label htmlFor="name">상품명</label>
              <input id="name" type="text" placeholder="상품명을 입력하세요" value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="price">상품 가격</label>
              <input id="price" type="text" placeholder="가격을 입력하세요" value={price} onChange={(e) => setPrice(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="image">상품 이미지</label>
              <input id="image" type="text" placeholder="상품 이미지를 입력하세요" value={image} onChange={(e) => setImage(e.target.value)}></input>
            </div> 
            <div>
              <label htmlFor="category">상품 카테고리</label>
              <input id="category" type="text" placeholder="상품 카테고리를 입력하세요" value={category} onChange={(e) => setCategory(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="brand">상품 브랜드</label>
              <input id="brand" type="text" placeholder="상품 브랜드 입력하세요" value={brand} onChange={(e) => setBrand(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="countInStock">상품 수량</label>
              <input id="countInStock" type="text" placeholder="상품 수량을 입력하세요" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="description">상품 설명</label>
              <textarea id="description" rows="3" type="text" placeholder="상품 설명을 입력하세요" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">수정하기</button>
            </div>
          </>
        }
      </form>
    </div>
  )
}
