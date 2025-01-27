import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/Button";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [DeviceVisible, setDeviceVisible] = useState(false);
    return (
        <Container className="d-flex flex-column">
            <Button 
                variant={'outline-dark'} 
                className="mt-4 p-2" 
                onClick={() => setTypeVisible(true)}
            >
                Добавить тип
            </Button>

            <Button 
                variant={'outline-dark'} 
                className="mt-4 p-2" 
                onClick={() => setBrandVisible(true)}
            >
                Добавить бренд
            </Button>

            <Button 
                variant={'outline-dark'} 
                className="mt-4 p-2" 
                onClick={() => setDeviceVisible(true)}
            >
                Добавить устройство
            </Button>
            
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={DeviceVisible} onHide={() => setDeviceVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
        </Container>
    );
};

export default Admin;