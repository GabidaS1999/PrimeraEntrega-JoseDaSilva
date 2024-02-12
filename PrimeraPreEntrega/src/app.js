import express, { response } from 'express';

import productsRoutes from './routes/products.routes.js';
import cartRoutes from './routes/cart.routes.js'

const app = express();


app.use(express.json())
app.use(express.urlencoded({extended: true}))


const PORT =8080;

app.get('/ping', (req, res)=>{
    res.send({status: "ok"})
});

app.use('/api/products', productsRoutes)
app.use('/api/carts', cartRoutes);

app.listen(PORT, ()=>{
    console.log(`Server run on port: ${PORT}`);
});