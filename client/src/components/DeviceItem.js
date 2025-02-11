import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
const DeviceItem = ({device}) => {
    const history = useNavigate();
    return (
        <Card style={{ width: '12rem' }} md={3} className="mt-3 ms-2 me-2" onClick={() => history(DEVICE_ROUTE + '/' + device.id)}>
            <Card.Img variant="top" src={process.env.REACT_APP_API_URL + device.img}  />
            <Card.Body>
                <Card.Title>{device.name}</Card.Title>
                <Card.Text>От {device.price} рублей</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default DeviceItem;