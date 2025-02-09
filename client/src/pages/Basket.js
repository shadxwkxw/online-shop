import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Context } from "..";
import { getBasket } from "../http/deviceAPI";

const Basket = observer(() => {
    const {device} = useContext(Context)
    const [basketDevice, setBasketDevice] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        getBasket().then(data => {
            device.setBaskets(data)
            setBasketDevice(data)
        })
    }, [])

    useEffect(() => {
        let price = 0
        basketDevice.forEach(item => {
            price += item.device.price
        })
        setTotalPrice(price)
    }, [basketDevice])

    console.table(basketDevice)

    return (
        <div>
            <Container>
                <Row className="mt-3">
                    <h2>Корзина</h2>
                    {basketDevice.map(device => (
                        <Card key={device.id}>
                            <Row>
                                <div className="col-md-4">
                                    {device.device.name}
                                </div>
                                <div className="col-md-4">
                                    {device.device.price}
                                </div>
                                <div className="col-md-4">
                                    <img src={process.env.REACT_APP_API_URL + device.device.img} style={{width: '50px'}}/>
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
