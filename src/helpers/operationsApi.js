const getItems = async () => {

  const url = 'http://localhost:3001/api/getorders';
  const resp = await fetch(url, { method: 'get' });
  const data = await resp.json();     
 
  return data; 
}

const getMethods = async () => {

  const url = 'http://localhost:3001/api/method';
  const resp = await fetch(url, { method: 'get' });  
  const data = await resp.json();     
 
  return data; 
}

const getOrderById = async (id) => {

  const url = `http://localhost:3001/api/detailsorder/${ id }`;
  const resp = await fetch(url, { method: 'get' });  
  const data = await resp.json();     
 
  return data; 
}

const createOrder = async ( body ) => {
  
  const url = 'http://localhost:3001/api/create';  
  const resp = await fetch(url, { 
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),      
  });
  const data = await resp.json();     
 
  return data; 
}

export {
  getItems,
  getMethods,
  createOrder,
  getOrderById
}   
