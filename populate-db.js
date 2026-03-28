import fs from 'fs';

async function generateDb() {
  const response = await fetch('https://dummyjson.com/products?limit=30');
  const data = await response.json();
  
  const products = data.products.map(p => ({
    id: p.id,
    name: p.title,
    price: p.price,
    description: p.description,
    image: p.thumbnail,
  }));

  const db = {
    products,
    cart: [],
    orders: []
  };

  fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
  console.log('db.json created successfully.');
}

generateDb();
