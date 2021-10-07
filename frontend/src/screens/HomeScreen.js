import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {useDispatch, useSelector} from 'react-redux';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import { Link, useParams } from 'react-router-dom';

export default function HomeScreen() {
  const { pageNumber = 1 } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const {loading, error, products, page, pages} = productList;
  
  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {loading : loadingSellers, error : errorSellers, users : sellers} = userTopSellersList;
  
  useEffect(() => {
    dispatch(listProducts({pageNumber}));
    dispatch(listTopSellers());
  }, [dispatch, pageNumber]);

  return  (
    <div>
      <h2>베스트 셀러</h2>
      {loadingSellers ? <LoadingBox></LoadingBox>
      :
      errorSellers ? <MessageBox variant="danger">{errorSellers}</MessageBox>
      :
      <>
        {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
        <Carousel showArrows autoPlay showThumbs={false}>
          {sellers.map((seller) => (
            <div key={seller._id}>
              <Link to={`/seller/${seller._id}`}>
                <img src={seller.seller.logo} alt={seller.seller.name}></img>
                <p className="legend">{seller.seller.name}</p>
              </Link>
            </div>
          ))}
        </Carousel>
      </>
      }
      <h2>전체 상품</h2>
      {loading? <LoadingBox></LoadingBox>
      :
      error?<MessageBox variant="danger">{error}</MessageBox>
      :
      <>
        {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
        <div className="row-sorting center">
        {
          products.map((product) => (
          <Product key={product._id} product={product} />
          ))
        }
      </div>
      </>
      }
      <div className="row center pagination">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === page ? 'active' : ''}
                key={x + 1}
                to={`/pageNumber/${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
    </div>
  );
    
}