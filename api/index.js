const express = require('express');
const app = express();
const productDa = require('./productDa');

let status = "";

app.get('/', async function (req, res) {
  try{
    let prod = await productDa.getByName('arroz');
    res.json(prod);
  } catch(err){
    res.send("Error getByName")
  }
});

app.get('/status', async function (req, res) {
  res.send("API Status OK!" + status)
});

app.listen(3000, async function () {
  console.log('Example app listening on port 3000!');
  status += ". listen OK!";
  try{
    let prod = await productDa.upsert({name: 'arroz', price: 12.34});
    status += ". product upsert OK!";
  } catch(err){
    status += ". Error upsert a db";
    console.log('err', err);
  }
});