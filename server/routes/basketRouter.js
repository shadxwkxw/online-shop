const Router = require('express')
const router = new Router()
const BasketController = require('../controllers/basketController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, BasketController.addToBasket)
router.get('/', authMiddleware, BasketController.getBasketUser)
router.delete('/', authMiddleware, BasketController.deleteFrombasket)

module.exports = router