const express = require('express');
const app = express();
const productDa = require('./productDa');

app.get('/', async function (req, res) {
  let prod = await productDa.getByName('arroz');
  res.json(prod);
});

app.listen(3000, async function () {
  console.log('Example app listening on port 3000!');
  try{
    let prod = await productDa.upsert({name: 'arroz', price: 12.34});
  } catch(err){
    console.log('err', err);
  }
});