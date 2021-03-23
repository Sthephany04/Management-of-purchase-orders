const express = require('express');
const cors = require("cors");
const app = express();
const PORT = 3001;
const orderOperations = require('./orderOperations');
const shippingMethods = require('./shippingMethods');

app.use(express.json());
app.use(cors());

app.get('/api/method', (_, res) => {
  shippingMethods.getMethods()
    .then(data => res.json(data))
});

app.get('/api/getorders', (_, res) => {res.json(orderOperations.getAllOrders())});

app.get('/api/detailsorder/:id', (req, res) => {
  res.json(orderOperations.getOrder(req.params.id)); 
});

app.post('/api/create', (req, res) => {
  orderOperations.createOrder(req.body);
  res.json({ok: true});
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));