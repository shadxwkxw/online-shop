import { observer } from "mobx-react-lite";
import React, { useContext, useState, useEffect } from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Context } from "..";
import { getBasket } from "../http/deviceAPI";
import Card from "react-bootstrap/Card";

const Basket = observer(() => {
    const {device} = useContext(Context)

    useEffect(() => {
        getBasket().then(data => device.setBaskets(data))
    }, [])

    let prices = 0;
    {device.basket.map(price => 
        prices += Number(price.device.price)
    )}
    console.log(device)
    return (
        <div>
            <Container>
                <Row className="mt-3">
                    <Col>
                        <h2>Корзина</h2>                      
                        <h2>Итого: {prices} рублей</h2>
                        
                    </Col>
                </Row>
            </Container>
        </div>
    );
});

export default Basket;
