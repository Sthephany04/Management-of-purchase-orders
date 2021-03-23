const fetch = require('node-fetch');

const getMethods = () => {
  return new Promise ((resolve, reject) => {
    fetch('https://yhua9e1l30.execute-api.us-east-1.amazonaws.com/sandbox/shipping-methods', {
      method: 'get',
      headers: { 'x-api-key': 'oNhW2TBOlI1t4kWb3PEad1K1S1KxKuuI3GX6rGvT' }
    })
    .then(response => response.json())
    .then(data => {
      resolve(data);
    });
  })
}

const getOffDays = () => {
  return new Promise ((resolve, reject) => {
    fetch('https://yhua9e1l30.execute-api.us-east-1.amazonaws.com/sandbox/off-days', {
      method: 'get',
      headers: { 'x-api-key': 'oNhW2TBOlI1t4kWb3PEad1K1S1KxKuuI3GX6rGvT' }
    })
    .then(response => response.json())
    .then(data => {
      resolve(data);
    });
  })
}

const getMethodDetails = (shipping_method_id) => {
  return new Promise ((resolve, reject) => {
    fetch(`https://yhua9e1l30.execute-api.us-east-1.amazonaws.com/sandbox/shipping-methods/${shipping_method_id}`, {
      method: 'get',
      headers: { 'x-api-key': 'oNhW2TBOlI1t4kWb3PEad1K1S1KxKuuI3GX6rGvT' }
    })
    .then(response => response.json())
    .then(data => {
      resolve(data);
    });
  })
}

module.exports = {
  getMethods,
  getOffDays,
  getMethodDetails
};