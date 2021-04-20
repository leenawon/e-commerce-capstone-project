import bcrypt from 'bcryptjs';

// Product Data
const data = {
  users: [
    {
      name:'dawon',
      email: 'dawon@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    },
    {
      name:'nawon',
      email: 'nawon@example.com',
      password: bcrypt.hashSync('5678', 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Denim Pants',
      category: 'Pants',
      image: '/images/product-1.jpg',
      price: 20000,
      countInStock: 10,
      brand: 'Thinket',
      rating: 5,
      numReviews: 15,
      description: 'high quality pants'
    },
    {
      name: 'Flower Dress',
      category: 'Dress',
      image: '/images/product-2.jpg',
      price: 25000,
      countInStock: 20,
      brand: 'Thinket',
      rating: 4.5,
      numReviews: 20,
      description: 'high quality dress'
    },
    {
      name: 'Flower Long Dress',
      category: 'Dress',
      image: '/images/product-2.jpg',
      price: 28000,
      countInStock: 0,
      brand: 'Thinket',
      rating: 4.0,
      numReviews: 20,
      description: 'high quality dress'
    }
  ]
};

export default data;