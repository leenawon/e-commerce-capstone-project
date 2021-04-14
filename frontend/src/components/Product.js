import React from "react";
import Rating from "./Rating";
import { Link } from 'react-router-dom';

export default function Product(props) {
  const {product} = props;
  return (
    <div key={product.id} className="product-card">
      <Link to={`/product/${product.id}`}>
        {/* Product Image */}
        <img className="product-image" src={product.image} alt={product.name}/>
      </Link>
      {/* Card Content */}
      <div className="card-content">
        <Link to={`/product/${product.id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        {/* Product Price */}
        <div className="product-price">
          {product.price}
        </div>
      </div>
    </div>
  )
}