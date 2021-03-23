import React from 'react';
import { Link } from 'wouter';
import DetailsOrder from '../components/DetailsOrder';

import './SellOrderDetails.css';

const SellOrderDetails = ({ params }) => {  
  
  return (
    <div>
      <div className="containerBanner"></div>
      <div className="containerTitle">
        <h1 className="titleDetails">
          Detalles de orden de venta
        </h1>
        <button type="button" className="btn btn-light">
          <Link to={ '/' }>
            Regresar
          </Link>
        </button>
      </div>
      <DetailsOrder id_order= {params.id} />     
    </div>
  )
} 



export default SellOrderDetails;