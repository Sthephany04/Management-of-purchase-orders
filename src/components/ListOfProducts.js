import React, { useState } from 'react';

const ListOfProducts = ({ arrayProducts, setArrayProducts, setValidateProducts, validateProducts }) => {

  const [product, setProduct] = useState({
    quantity: '',
    nameProduct: '',
    weightProduct: ''
  })
  const [buttonAdd, setButtonAdd] = useState(false);
  const [nameButton, setNameButton] = useState('Agregar producto');

  const handleAdd = () => {
    if(buttonAdd){
      setArrayProducts([...arrayProducts, product]);
      setButtonAdd(false);
      setValidateProducts(false);
      setNameButton('Agregar producto');
      setProduct({
        quantity: '',
        nameProduct: '',
        weightProduct: ''
      })
    } else {      
      setButtonAdd(true);
      setNameButton('Guardar producto');
    }
  }

  const handleInputChange = (e) => {    
    setProduct({ 
      ...product,          
      [e.target.name]: e.target.value      
    })
  }

  const  handleDelete = (item) => {
    const newList = [...arrayProducts];    
    const removeIndex = newList.map(i => {
      return i.nameProduct;
    })
    .indexOf(item.nameProduct);
    newList.splice(removeIndex, 1);
    setArrayProducts(newList);
  }

  return (
    <div>
      <h5>Ingresa tus productos aqui: </h5>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Cantidad</th>
            <th scope="col">Nombre del producto</th>
            <th scope="col">Peso del producto (Kg)</th>            
          </tr>
        </thead>
        <tbody>          
          {
            arrayProducts.map((item, index) => (                
              <tr key={index} className='list_row'>                                 
                <td>{item.quantity}</td>
                <td>{item.nameProduct}</td>   
                <td>{item.weightProduct}</td>
                <td><button onClick={() => handleDelete(item) } className="buttonDelete"></button></td>
              </tr>                
            ))
          }   
          {
            buttonAdd &&
              <tr className='list_row'>
                <td>
                  <input
                    type="number"
                    name="quantity"
                    autoComplete="off"
                    value= { product.quantity }
                    onChange={ handleInputChange }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="nameProduct"
                    autoComplete="off"
                    value= { product.nameProduct }
                    onChange={ handleInputChange }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="weightProduct"
                    autoComplete="off"
                    value= { product.weightProduct }
                    onChange={ handleInputChange }
                  />
                </td>
              </tr> 
          }
        </tbody>
      </table>
      {validateProducts && <h5 className="messageValidate">Por favor ingresa productos a la lista</h5>}
      <div className="buttonAddProduct">
        <button
          type="button"
          onClick={ handleAdd }
          className="btn btn-primary mt-3 mb-3"
        >
          { nameButton }</button>
      </div>
    </div>
  )
}

export default ListOfProducts;
