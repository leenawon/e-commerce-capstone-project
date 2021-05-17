import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

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
  const productUpdate = useSelector((state) => state.productUpdate);
  const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if(successUpdate) {
      props.history.push('/productlist');
    }
    if(!product || product._id !== productId || successUpdate) {
      dispatch({type: PRODUCT_UPDATE_RESET});
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
  }, [product, dispatch, productId, successUpdate, props.history]);

  const submitHandler = (e) => {
    e.preventDefault();
    //TODO: dispatch update product
    dispatch(updateProduct({_id: productId, name, price, image,category, brand, countInStock,description}));
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const {userInfo} = userSignin;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const {data} = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      setImage(data);
      setLoadingUpload(false);
    } catch(error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>상품 수정 {productId}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? <LoadingBox></LoadingBox>
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
              <label htmlFor="imageFile">상품 이미지 파일 </label>
              <input id="imageFile" type="file" label="이미지를 골라주세요" onChange={uploadFileHandler}></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
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
