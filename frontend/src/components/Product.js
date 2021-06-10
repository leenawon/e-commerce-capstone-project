import React from "react";
import Rating from "./Rating";
import { Link } from 'react-router-dom';

export default function Product(props) {
  const {product} = props;
  return (
    <div key={product._id} className="product-card">
      <Link to={`/product/${product._id}`}>
        {/* Product Image */}
        <img className="product-image" src={product.image} alt={product.name}/>
      </Link>
      {/* Card Content */}
      <div className="card-content">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        {/* Product Price */}
        <div className="row">
          <div className="product-price">
            {product.price}원
          </div>
          <div>
            <Link to={`/seller/${products.seller._id}`}>
              {product.seller.seller.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}