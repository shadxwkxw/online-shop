import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { Context } from "../..";
import { createDevice, fetchBrands, fetchTypes } from "../../http/deviceAPI";

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, [])
    
    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        try{
            formData.append('name', name)
            formData.append('price', `${price}`)
            formData.append('img', file)
            formData.append('brandId', device.selectedBrand.id)
            formData.append('typeId', device.selectedType.id)
            formData.append('info', JSON.stringify(info))
            createDevice(formData).then(data => onHide())
        } catch(e){
            alert(e)
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-3">
                        <Dropdown.Toggle>{device.selectedType.name || "Выберите бренд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type => 
                                <Dropdown.Item 
                                    onClick={() => device.setSelectedType(type)} 
                                    key={type.id}
                                    >
                                        {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className="mt-2 mb-3">
                        <Dropdown.Toggle>{device.selectedBrand.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand => 
                                <Dropdown.Item 
                                    onClick={() => device.setSelectedBrand(brand)} 
                                    key={brand.id}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control 
                        className="mt-3" 
                        placeholder="Введите название устройства"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Control 
                        className="mt-3" 
                        placeholder="Введите стоимость устройства" type="number"
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                    />
                    <Form.Control 
                        className="mt-3" 
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button onClick={addInfo} variant="outline-dark">Добавить новое свойство</Button>
                    {info.map(i => 
                            <Row className="mt-4" key={i.number}>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.title}
                                        onChange={e => changeInfo('title', e.target.value, i.number)}
                                        placeholder="Введите название свойства"
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.description}
                                        onChange={e => changeInfo('description', e.target.value, i.number)}
                                        placeholder="Введите описание свойства"
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button onClick={() => removeInfo(i.number)} variant="outline-danger">Удалить</Button>
                                </Col>
                            </Row>
                        )
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;