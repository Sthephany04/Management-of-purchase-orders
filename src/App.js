import React from 'react'
import { Route } from 'wouter';
import SellOrderList from './pages/SellOrderList';
import SellOrderDetails from './pages/SellOrderDetails';
import SellOrderCreation from './pages/SellOrderCreation';

import './index.css';

function App() {
  return (
    <div>
      <Route path='/' component={SellOrderList} />
      <Route path='/orderdetails/:id' component={SellOrderDetails} />
      <Route path='/ordercreation/' component={SellOrderCreation} />
    </div>
  );
}

export default App;
