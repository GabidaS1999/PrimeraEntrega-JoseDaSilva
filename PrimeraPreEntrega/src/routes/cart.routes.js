import { Router } from "express";
import CartManager from "../Cart-Manager.js";
import ProductManager from "../Product-Manager.js";

let cartManager = new CartManager();
let productManager = new ProductManager();


const router = Router();

let carts = [];

router.get('/', async (req, res) => {
    let todosLosCarritos = await cartManager.getCartsList()

    res.send(todosLosCarritos)
})



router.get('/:cid', async (req, res) => {
    const result = await cartManager.getCartsList()
    let cid = req.params.cid;

    const carrito = await result.find(c => c.id == parseInt(cid))
    if (carrito) {
        res.json(carrito)
    }else{
        res.send({ msg: "Carrito no encontrado" })
    }

    
})

router.post('/', async (req, res) => {
    let cart = await cartManager.createNewCart()
    carts.push(cart)
    res.send({ status: "success", msg: "Carrito creado" })
})

router.post('/:cid/products/:pid', async (req, res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid
    const result = await cartManager.addProductCart(cid, pid);
    result.success ? res.status(200).json(result.cart) : res.status(400).json(result) 
})



export default router;