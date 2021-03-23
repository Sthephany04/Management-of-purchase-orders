import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { getItems } from '../helpers/operationsApi';

import './SellOrderList.css';

const SellOrderList = () => {

  const [orders, setOrders] = useState([]);  

  useEffect(() => {
    getItems()
      .then(item => {
        setOrders(item)        
      })    
  },[]) 

  return (
    <div>
      <div className="containerBanner"></div>
      <h1 className="titleList">
        Lista de pedidos 
      </h1>
      <hr />

      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Orden de venta</th>
            <th scope="col">Vendedor</th>
            <th scope="col">Fecha de creación</th>
            <th scope="col">Metodo de envío</th>
          </tr>
        </thead>
        <tbody>          
          {
            orders.map((item) => (                
              <Link key={item.external_order_number} to={`/orderdetails/${item.external_order_number}`}>
                <tr className='list_row'>
                  <th scope="row">{item.external_order_number}</th>                  
                  <td>{item.seller_store}</td>
                  <td>{item.creation_date}</td>                   
                  <td>{item.shipping_method_name}</td>
                </tr>             
              </Link>
            ))
          }                  
        </tbody>
      </table>
      <div className="button_create">
        <button type="button" className="btn btn-light btn-lg">
          <Link to={ `/ordercreation/` }>
            Crear orden
          </Link>
        </button>
      </div>
    </div>
  )
}

export default SellOrderList;