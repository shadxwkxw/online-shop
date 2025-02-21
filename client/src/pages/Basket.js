import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Context } from "..";
import { getBasket, deleteFromBasket } from "../http/deviceAPI";

const Basket = observer(() => {
    const {device} = useContext(Context)
    const [groupedBasket, setGroupedBasket] = useState({})
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        fetchBasket()
    }, [])

    const fetchBasket = async () => {
        try {
            const data = await getBasket()
            device.setBaskets(data)
            groupDevices(data)
        } catch (error) {
            console.error("Ошибка получения корзины:", error)
        }
    }

    const groupDevices = (basketItems) => {
        const grouped = {}
        basketItems.forEach(item => {
            const deviceId = item.deviceId
            if (grouped[deviceId]) {
                grouped[deviceId].quantity += 1
            } else {
                grouped[deviceId] = {device: item.device, quantity: 1}
            }
        })
        setGroupedBasket(grouped)
    }

    useEffect(() => {
        let price = 0
        Object.values(groupedBasket).forEach(item => {
            price += item.device.price * item.quantity
        });
        setTotalPrice(price)
    }, [groupedBasket])

    const removeDevice = async (deviceId) => {
        try {
            await deleteFromBasket(deviceId)

            setGroupedBasket(prevGroupedBasket => {
                const newGroupedBasket = {...prevGroupedBasket}
                if (newGroupedBasket[deviceId]) {
                    newGroupedBasket[deviceId].quantity -= 1
                    if (newGroupedBasket[deviceId].quantity === 0) {
                        delete newGroupedBasket[deviceId]
                    }
                }
                return newGroupedBasket
            })
        } catch (error) {
            console.error("Ошибка при удалении товара:", error)
        }
    };
    
    return (
        <div>
            <Container>
                <Row className="mt-3">
                    <h2>Корзина</h2>
                    {Object.entries(groupedBasket).map(([deviceId, item]) => (
                        <Card key={deviceId} className="mb-2">
                            <Row className="align-items-center">
                                <div className="col-md-3">
                                    <img src={process.env.REACT_APP_API_URL + item.device.img} style={{ width: '120px', height: '120px' }} />
                                </div>
                                <div className="col-md-3">
                                    {item.device.name}
                                </div>
                                <div className="col-md-2">
                                    {item.device.price * item.quantity} руб.
                                </div>
                                <div className="col-md-2">
                                    Количество: {item.quantity}
                                </div>
                                <div className="col-md-2">
                                    <Button onClick={() => removeDevice(deviceId)} variant="outline-danger">Удалить</Button>
                                </div>
                            </Row>
                        </Card>
                    ))}
                    <h2>Итого: {totalPrice} рублей</h2>
                </Row>
            </Container>
        </div>
    );
});

export default Basket;