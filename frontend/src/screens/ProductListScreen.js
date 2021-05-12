import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductListScreen(props) {
  const productList = useSelector(state => state.productList);
  const {loading, error, products} = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  const deleteHandler = () => {
    // TODO: dispatch delete action
  };

  return (
    <div>
      <h1>상품 목록</h1>
      {
        loading ? <LoadingBox></LoadingBox>
        : 
        error ? <MessageBox variant="danger">{error}</MessageBox>
        :
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>상품명</th>
              <th>가격</th>
              <th>카테고리</th>
              <th>브랜드</th>
              <th>상품 관리</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button type="button" className="small" onClick={()=> props.history.push(`/product/${product._id}/edit`)}>수정</button>
                  <button type="button" className="small" onClick={() => deleteHandler(product)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  )
};