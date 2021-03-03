import React from 'react';
import '../AppoinType/AppoinType.css';
import {Modal, Button} from 'react-bootstrap';
import { useState } from 'react';

const AppoinType = (props) => {
    const { id, name, time, description } = props.item;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const date = new Date();
    const newDate = date.toDateString();

    return (
        <div className="appoint-container">
            <div className="col-md-12" id="appointId">
                <h6>{name}</h6>
                <p>{time}</p>
                <p><small>{description}</small></p>
                <button className="book-btn" onClick={handleShow}>Book Appoinment</button>
            </div>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-name">{name}</Modal.Title>
                </Modal.Header>
                <div className="modal-input">
                    <input type="text" name="name" id="" placeholder="Your Name"/>
                    <br/>
                    <input type="text" name="name" id="" placeholder="Phone Number"/>
                    <br/>
                    <input type="text" name="name" id="" placeholder="Email"/>
                    <br/>
                    <input type="text" value={newDate} name="name" id="" placeholder="mm/dd/yy"/>
                </div>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Send
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AppoinType;