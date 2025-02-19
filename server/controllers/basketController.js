const { message } = require('statuses')
const {BasketDevice, Device} = require('../models/models')

class BasketController {
    async addToBasket(req, res, next) {
        try {
            const user = req.user
            const {deviceId} = req.body
            const basket = await BasketDevice.create({basketId: user.id, deviceId: deviceId})
            return res.json(basket)
        } catch (error) {
            res.status(500).json({message: "Ошибка при добавлении в корзину: ", error})
        }
    }

    async getBasketUser(req, res) {
        try {
            const {id} = req.user
            const basket = await BasketDevice.findAll({include: {
                model: Device
            }, where: {basketId: id}})
            return res.json(basket)
        } catch (error) {
            res.status(500).json({message: "Ошибка в загрузке корзины: ", error})
        }
    }

    async deleteFrombasket(req, res) {
        try {
            const {id} = req.user
            const {deviceId} = req.body

            if (!deviceId) {
                return res.status(400).json({message: "deviceId не найден"})
            }

            const basketItem = await BasketDevice.findOne({
                where: {
                    deviceId: deviceId,
                    basketId: id
                }
            })

            if (!basketItem) {
                return res.status(404).json({message: "Товар не найден в корзине"})
            }

            await basketItem.destroy()
            return res.json(basketItem)
        } catch (error) {
            res.status(500).json({message: "Ошибка при удалении товара из корзины: ", error})
        }
    }
}

module.exports = new BasketController()