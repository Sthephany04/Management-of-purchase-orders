import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import ListOfProducts from '../components/ListOfProducts';
import { getMethods, createOrder } from '../helpers/operationsApi'; 
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { FormGroup, Button, Row, Col, Label } from 'reactstrap';
import * as Yup from 'yup';

import './SellOrderCreation.css';

const formSchema = Yup.object().shape({
  seller_store: Yup.string()
    .required('Campo Requerido')
    .min(5, `Minimo 5 caracteres`)
    .max(255, `Maximo 255 caracteres`),
  shipping_method: Yup.string()
    .required('Campo Requerido'),   
  external_order_number: Yup.string()
    .required('Campo Requerido')    
    .max(255, `Maximo 255 caracteres`),
  buyer_fullname: Yup.string()
    .required('Campo Requerido')
    .min(5, `Minimo 5 caracteres`)
    .max(255, `Maximo 255 caracteres`),
  buyer_phone: Yup.number()
    .required('Campo Requerido')
    .min(8, `Minimo 8 caracteres`),    
  buyer_email: Yup.string()
    .required('Campo Requerido')
    .email('Correo electronico invalido')
    .max(255, `Maximo 255 caracteres`),
  shipping_address: Yup.string()
    .required('Campo Requerido')
    .min(5, `Minimo 5 caracteres`)
    .max(255, `Maximo 255 caracteres`),
  shipping_city: Yup.string()
    .required('Campo Requerido')
    .min(3, `Minimo 5 caracteres`)
    .max(255, `Maximo 255 caracteres`),
  shipping_region: Yup.string()
    .required('Campo Requerido')
    .min(3, `Minimo 5 caracteres`)
    .max(255, `Maximo 255 caracteres`),
  shipping_country: Yup.string()
    .required('Campo Requerido')
    .min(3, `Minimo 5 caracteres`)
    .max(255, `Maximo 255 caracteres`)  
})

const SellOrderCreation = () => {

  const [arrayProducts, setArrayProducts] = useState([]);
  const [methods, setMethods] = useState([]);
  const [validateProducts, setValidateProducts] = useState(false);  
  
  const handleSubmit = (values, resetForm) => {
    if( arrayProducts.length !== 0){
      values.line_items = arrayProducts;      
      createOrder(values)
        .then(res => console.log(res))
      setTimeout(() => {
        window.location="/"
      }, 1000)
      setArrayProducts([]);
      resetForm({});
    } else{      
      setValidateProducts(true)
    }
  }

  useEffect(() => {
    getMethods()
      .then(items => {
        setMethods(items)
      })
  },[])

  return (
    <div>
      <div className="containerBanner"></div>
      <div className="containerTitle">
        <h1 className="titleList">
          Crear orden
        </h1>      
        <button type="button" className="btn btn-light buttonBack">
          <Link to={ '/' }>
            Regresar
          </Link>
        </button>
      </div>
      <hr />
      <Formik
        initialValues={{
          seller_store: '',
          shipping_method: '',
          external_order_number: '',
          buyer_fullname: '',
          buyer_phone: '',
          buyer_email: '',
          shipping_address: '',
          shipping_city: '',
          shipping_region: '',
          shipping_country: ''
        }}
        validationSchema= { formSchema } 
        onSubmit={ (values, { resetForm  }) => handleSubmit(values, resetForm) }     
      >
        <Form>
          <Row>
            <Col className="col-7">
              <FormGroup>
                <Label htmlFor="seller_store">Vendedor: </Label>
                <Field
                  className="form-control"
                  name="seller_store"
                  autoComplete="off"
                  placeholder="Nombre del vendedor"
                  type="text"          
                />
                <ErrorMessage
                  name="seller_store"
                  component="p"
                  className="field-error text-danger"          
                />         
              </FormGroup>
              <FormGroup>
                <Label htmlFor="shipping_method">Metodo de Envio: </Label>
                <Field 
                  as="select" 
                  className="form-control"
                  name="shipping_method"                                           
                >
                  <option defaultValue value="">Selecciona una opción</option>
                  {
                    methods.map((method) => (
                      <option
                        key={method.id}
                        value={method.id}
                      >{ method.name }</option>
                    ))
                  }
                </Field>
                <ErrorMessage
                  name="shipping_method"
                  component="p"
                  className="field-error text-danger"          
                />         
              </FormGroup>
              <FormGroup>
                <Label htmlFor="external_order_number">Numero de Orden: </Label>
                <Field
                  className="form-control"
                  name="external_order_number"
                  autoComplete="off"
                  placeholder="Numero de Orden"
                  type="text"          
                />
                <ErrorMessage
                  name="external_order_number"
                  component="p"
                  className="field-error text-danger"          
                />         
              </FormGroup>
              <FormGroup>
                <Label htmlFor="buyer_fullname">Comprador: </Label>
                <Field
                  className="form-control"
                  name="buyer_fullname"
                  autoComplete="off"
                  placeholder="Nombre del comprador"
                  type="text"          
                />
                <ErrorMessage
                  name="buyer_fullname"
                  component="p"
                  className="field-error text-danger"          
                />         
              </FormGroup>
              <FormGroup>
                <Label htmlFor="buyer_phone">Numero de telefono comprador: </Label>
                <Field
                  className="form-control"
                  name="buyer_phone"
                  autoComplete="off"
                  placeholder="+573054954777"
                  type="text"          
                />
                <ErrorMessage
                  name="buyer_phone"
                  component="p"
                  className="field-error text-danger"          
                />         
              </FormGroup>
            </Col>
            <Col className="col-5">
              <FormGroup>
                <Label htmlFor="buyer_email">Correo electronico comprador: </Label>
                <Field
                  className="form-control"
                  name="buyer_email"
                  autoComplete="off"
                  placeholder="Email"
                  type="text"          
                />
                <ErrorMessage
                  name="buyer_email"
                  component="p"
                  className="field-error text-danger"          
                />         
              </FormGroup>
              <FormGroup>
                <Label htmlFor="shipping_address">Direccion de Envio: </Label>
                <Field
                  className="form-control"
                  name="shipping_address"
                  autoComplete="off"
                  placeholder="Calle 8C # 88B - 12"
                  type="text"          
                />
                <ErrorMessage
                  name="shipping_address"
                  component="p"
                  className="field-error text-danger"          
                />         
              </FormGroup>
              <FormGroup>
                <Label htmlFor="shipping_city">Ciudad de Envio: </Label>
                <Field
                  className="form-control"
                  name="shipping_city"
                  autoComplete="off"
                  placeholder="Ciudad de Envio"
                  type="text"          
                />
                <ErrorMessage
                  name="shipping_city"
                  component="p"
                  className="field-error text-danger"          
                />         
              </FormGroup>
              <FormGroup>
                <Label htmlFor="shipping_region">Region de Envio: </Label>
                <Field
                  className="form-control"
                  name="shipping_region"
                  autoComplete="off"
                  placeholder="Region de Envio"
                  type="text"          
                />
                <ErrorMessage
                  name="shipping_region"
                  component="p"
                  className="field-error text-danger"          
                />         
              </FormGroup>
              <FormGroup> 
                <Label htmlFor="shipping_country">Pais de Envio: </Label>
                <Field
                  className="form-control"
                  name="shipping_country"
                  autoComplete="off"
                  placeholder="Pais de Envio"
                  type="text"          
                />
                <ErrorMessage
                  name="shipping_country"
                  component="p"
                  className="field-error text-danger"          
                />         
              </FormGroup>           
            </Col>
          </Row> 
          <hr />          
          <ListOfProducts
            arrayProducts= {arrayProducts}
            setArrayProducts= {setArrayProducts}
            setValidateProducts= {setValidateProducts}
            validateProducts= {validateProducts}
          />         
          <Row>
            <Col className="col-12">
              <Button                
                className="mt-5 btn-secondary btn-block"
                type="submit"                
              >
                Guardar
              </Button>
            </Col>
          </Row>
        </Form>        
      </Formik>
    </div>
  )
}

export default SellOrderCreation;