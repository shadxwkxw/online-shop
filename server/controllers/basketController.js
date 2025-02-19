const {BasketDevice, Device} = require('../models/models')

class BasketController {
    async addToBasket(req, res, next) {
        const user = req.user
        const {deviceId} = req.body
        const basket = await BasketDevice.create({basketId: user.id, deviceId: deviceId})
        return res.json(basket)
    }

    async getBasketUser(req, res) {
        const {id} = req.user
        const basket = await BasketDevice.findAll({include: {
            model: Device
        }, where: {basketId: id}})
        return res.json(basket)
    }

    async deleteFrombasket(req, res) {
        const {id} = req.user
        const {deviceId} = req.body
        const basketItem = await BasketDevice.findOne({
            where: {
                deviceId: deviceId,
                basketId: id
            }
        })
        await basketItem.destroy()
        return res.json(basketItem)
    }
}

module.exports = new BasketController()