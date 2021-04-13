import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';


function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        {/* Header */}
        <header id="header" className="row-sorting">
          <div>
            <a href="/" className="brand">
            Thinket</a>
          </div>
          <div>
            <a href="/cart">Cart</a>
            <a href="/signin">Sign In</a>
          </div>
        </header>
        {/* Main */}
        <main id="main">
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
          
        </main>
        <footer id="footer" className="row-sorting center">
          All right reserved
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
