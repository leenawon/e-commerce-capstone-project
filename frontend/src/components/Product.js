import React from "react";
import Rating from "./Rating";

export default function Product(props) {
  const {product} = props;
  return (
    <div key={product.id} className="product-card">
      <a href={`/product/${product.id}`}>
        {/* Product Image */}
        <img className="product-image" src={product.image} alt={product.name}/>
      </a>
      {/* Card Content */}
      <div className="card-content">
        <a href={`/product/${product.id}`}>
          <h2>{product.name}</h2>
        </a>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        {/* Product Price */}
        <div className="product-price">
          {product.price}
        </div>
      </div>
    </div>
  )
}