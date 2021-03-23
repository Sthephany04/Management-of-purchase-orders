import React, { useState, useEffect } from 'react';
import DetailItem from './DetailItem';
import { getOrderById } from '../helpers/operationsApi';

const DetailsOrder = ({ id_order }) => {

  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    getOrderById(id_order)
      .then(item => {
        setLoading(false)
        setOrder(item)        
      })    
  },[]) 

  if(loading){
    return <h3>Cargando ...</h3>
  } else {
  return (
    <>
    {
      order.length > 0 ? 
      (
        <>
          <div className="row">
            <div className="col-5">
              <DetailItem
                title="Numero de orden externa:" 
                text={order[0].external_order_number}/>
              <DetailItem 
                title="Fecha de creacion de orden:"
                text={order[0].creation_date}/>                
            </div>
            <div className="col-7">
              <DetailItem 
                title="Numero de orden interna:"
                text={order[0].internal_order_number}/>
            </div>
          </div> 
          <hr />
          <div className="row">
            <div className="col-5">
              <DetailItem
                title="Metodo de envio:" 
                text={order[0].shipping_method_name}/>
                            
            </div>
            <div className="col-7">
              { order[0].pack_promise_min !== null &&
                <DetailItem 
                title="pack_promise_min:"
                text={order[0].pack_promise_min}/>              
              }
              { order[0].pack_promise_max !== null &&
                <DetailItem 
                title="pack_promise_max:"
                text={order[0].pack_promise_max}/>              
              }              
              { order[0].ship_promise_min !== null &&
                <DetailItem 
                title="ship_promise_min:"
                text={order[0].ship_promise_min}/>              
              }
              { order[0].ship_promise_max !== null &&
                <DetailItem 
                title="ship_promise_max:"
                text={order[0].ship_promise_max}/>              
              }
              { order[0].delivery_promise_min !== null &&
                <DetailItem 
                title="delivery_promise_min:"
                text={order[0].delivery_promise_min}/>              
              }
              { order[0].delivery_promise_max !== null &&
                <DetailItem 
                title="delivery_promise_max:"
                text={order[0].delivery_promise_max}/>              
              } 

              { order[0].ready_pickup_promise_min !== null &&
                <DetailItem 
                title="ready_pickup_promise_min:"
                text={order[0].ready_pickup_promise_min}/>              
              }
              { order[0].ready_pickup_promise_max !== null &&
                <DetailItem 
                title="ready_pickup_promise_max:"
                text={order[0].ready_pickup_promise_max}/>              
              }             
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-12">
              <DetailItem 
                title="Nombre del vendedor:"
                text={order[0].seller_store}/>
            </div>
          </div> 
          <hr />  
          <div className="row">
            <div className="col-5">
              <DetailItem 
                title="Datos del comprador:"
                text=""/>
            </div>
            <div className="col-7">
              <DetailItem 
                title="Nombre:"
                text={order[0].buyer_fullname}/>
              <DetailItem 
                title="Telefono:"
                text={order[0].buyer_phone}/>
              <DetailItem 
                title="Correo electronico:"
                text={order[0].buyer_email}/>
            </div>
          </div>
          <div className="row">
            <div className="col-5">
              <DetailItem 
                title="Datos de envio:"
                text=""/>
            </div>
            <div className="col-7">
              <DetailItem 
                title="Direccion:"
                text={order[0].shipping_address}/>
              <DetailItem 
                title="Ciudad:"
                text={order[0].shipping_city}/>
              <DetailItem 
                title="Region:"
                text={order[0].shipping_region}/>
              <DetailItem 
                title="Pais:"
                text={order[0].shipping_country}/>
            </div>
          </div>            
          <hr />
          <h5>Lista de Productos</h5> 
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Cantidad</th>
                <th scope="col">Nombre del producto</th>
                <th scope="col">Peso del producto</th>            
              </tr>
            </thead>
            <tbody>
              {
                order[0].line_items.map((item, index) => (                
                  <tr key={index} className='list_row'>                                 
                    <td>{item.quantity}</td>
                    <td>{item.nameProduct}</td>   
                    <td>{item.weightProduct}</td>
                  </tr>                
                ))
              } 
            </tbody>
          </table>

        </>
      )
      : <h3>La orden de venta numero {id_order} no existe</h3>
    }
    </>
  )}
}

export default DetailsOrder;
