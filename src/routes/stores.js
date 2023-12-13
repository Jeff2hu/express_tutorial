const { Router } = require('express');

const router = Router();

const stores = [
    {
        id:1,
        store: 'Whole Foods',
        miles: 0.5,
    },
    {
        id:2,
        store: 'Trader Joes',
        miles: 2.5,
    },
    {
        id:3,
        store: 'Albertsons',
        miles: 3.2,
    },
    {
        id:4,
        store: 'Apple Store',
        miles: 4.2,
    }
]

router.get('/', (req, res) => {
    const { miles } = req.query;
    if(miles){
        const _filterStores = stores.filter(store => store.miles <= parseInt(miles))
        res.send(_filterStores)
    }else res.send(stores)
})

router.get('/cookie', (req, res) => {
    console.log(req?.cookies)
    res.cookie('name', 'express', { maxAge: 1000 * 60 * 3 }).send('cookie set');
})

router.post('/cookie', (req, res) => {
    res.send(req?.cookies);
})

router.get('/session', (req, res) => {
    const { cart } = req.session;
    if(!cart) res.status(404).send('Cart not found')
    else res.status(200).send(cart)
})

router.post('/session', (req, res) => {
    const { item, quantity } = req.body;
    const { cart } = req.session;
    if(item && quantity){
        if(cart){
            req.session.cart = [...cart, { item, quantity }]
        }else{
            req.session.cart = [{ item, quantity }]
        }
        res.status(200).send(req.session.cart)
    }else res.send('Item not found', 404)
})

module.exports = router;