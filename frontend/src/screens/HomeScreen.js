import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listProducts } from '../actions/productActions';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const {loading, error, products} = productList;
  
  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);
  return  (
    <div>
      {loading? <LoadingBox></LoadingBox>
      :
      error?<MessageBox variant="danger">{error}</MessageBox>
      :
      <div className="row-sorting center">
        {
          // data.js에서 받아온 데이터
          products.map((product) => (
          <Product key={product._id} product={product} />
          ))
        }
      </div>
      }
      
    </div>
  );
    
}