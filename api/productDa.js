const db = require('neode')
    .fromEnv()
    .with({
        Product: require('./product')
    });

const PRODUCT = 'Product';

module.exports = {
    create,
    getByName,
    upsert
};

async function create(product){
   let prod = await db.create(PRODUCT, product);
   return await prod.toJson();
}

async function getByName(name){
    let prod = await db.first(PRODUCT, {name});
    if(!prod)
        return prod;
    return await prod.toJson();
}

async function upsert(product){
    let prod = await db.first(PRODUCT, {name: product.name});
    if(prod){
        delete product.id;
        prod = await prod.update(product);
        return await prod.toJson();
    } else{
        return await create(product);
    }
}


    