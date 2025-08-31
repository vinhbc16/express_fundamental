const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config();
app.use(express.json());
// import router
const peopleRouter = require('./routes/people');

// gắn router
app.use('/api/people', peopleRouter);

const { people, product } = require('./data');

const logger = require('./middleware/logger');
const authorize = require('./middleware/authorize');

app.use('/login',express.static('./public'));
app.use('/login',express.urlencoded({ extended: false }));
// Fake data
const products = [
  { id: 1, name: 'iPhone', price: 1000 },
  { id: 2, name: 'Samsung', price: 800 },
  { id: 3, name: 'Xiaomi', price: 500 },
  { id: 4, name: 'Oppo', price: 400 },
  { id: 5, name: 'Huawei', price: 450 },
];


// Route: Home
app.get('/', (req, res) => {
  res.send(`<h1>Home Page</h1><a href="/api/products">Products</a>`);
});

// Route: Lấy toàn bộ products
app.get('/api/products', (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name } = product;
    return { id, name };
  });
  res.json(newProducts);
});

// Route: Lấy product theo ID
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params; // Lấy id từ URL
  const singleProduct = products.find(
    (product) => product.id === Number(id)
  );

  if (!singleProduct) {
    return res.status(404).send('Product not found');
  }

  res.json(singleProduct);
});

// Route: Query search + limit
app.get('/api/v1/query', (req, res) => {
  const { search, limit } = req.query;
  let sortedProducts = [...products]; // copy mảng gốc

  // Nếu có search → lọc theo tên
  if (search) {
    sortedProducts = sortedProducts.filter((product) =>
      product.name.toLowerCase().startsWith(search.toLowerCase())
    );
  }

  // Nếu có limit → chỉ lấy limit phần tử đầu tiên
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }

  // Nếu không có sản phẩm nào
  if (sortedProducts.length < 1) {
    return res.status(200).json({ success: true, data: [] });
  }

  res.status(200).json(sortedProducts);
});

app.post('/login', (req, res) => {
  const { name , email } = req.body;
  console.log(req.body);
  if(name && email){
    return res.status(200).json(req.body);
  }
  res.status(401).send('Please provide credentials');
});

// Start server
app.listen(process.env.PORT , () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
