import React from 'react';
import data from '../data';
import Product from '../components/Product';

export default function HomeScreen() {
    return  (
        <div className="row-sorting center">
            {
              // data.js에서 받아온 데이터
              data.products.map((product) => (
                <Product key={product.id} product={product} />
              ))
            }
        </div>
    );
    
}