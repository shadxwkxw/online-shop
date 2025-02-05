import React, { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import bigStar from '../assets/bigStar.png';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { fetchOneDevice, addToBasket } from "../http/deviceAPI";

const DevicePage = () => {
    const [device, setDevice] = useState({info: []});
    const {id} = useParams();

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])

    const addBasket = () => {
        const formData = new FormData()
        formData.append('deviceId', id)
        addToBasket(formData).then(data => alert(`Товар ${device.name} был добавлен в Вашу корзину`))
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image src={process.env.REACT_APP_API_URL + device.img} width={300} height={300}/>
                </Col>
                <Col md={4}>
                    <Col className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <div className="d-flex align-items-center justify-content-center" style={{background: `url(${bigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64}}>
                            {device.rating}
                        </div>  
                    </Col>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '2px solid lightgray'}}
                    >
                        <h3>От: {device.price} руб.</h3>
                        <Button onClick={addBasket} variant={"outline-dark"}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики:</h1>
                {device.info.map((info, index) => 
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;