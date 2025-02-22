import { observer } from 'mobx-react-lite';
import React, { useContext } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import { Context } from "..";

const TypeBar = observer(() => {
    const {device} = useContext(Context);
    return (
        <ListGroup>
            {device.types.map(type => 
                <ListGroup.Item
                    className='m-1'
                    style={{cursor: 'pointer'}}
                    active={type.id === device.selectedType.id}
                    onClick={() => device.setSelectedType(type)}
                    key={type.id}
                    variant="light"
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;