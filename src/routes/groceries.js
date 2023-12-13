const { Router } = require('express');

const router = Router();

const groceryList = [
    {
        item: 'milk',
        quantity: 2
    },
    {
        item: 'careal',
        quantity: 1
    },
    {
        item: 'pop-tarts',
        quantity: 3
    },
]

router.get('/', (req, res) => {
    res.send(groceryList)
})

router.get('/:item', (req, res) => {
    const { item } = req.params;
    const grocery = groceryList.find(grocery => grocery.item === item)
    if(grocery) res.send(grocery, 200)
    else res.send('Item not found', 404)
})

router.post('/', (req, res) => {
    groceryList.push(req.body)
    res.send('POST request to the homepage')
})

module.exports = router;