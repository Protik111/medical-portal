import React, { useContext } from 'react';
import '../AppoinType/AppoinType.css';
// import {Modal, Button} from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const AppoinType = (props) => {
    const { id, name, time, description } = props.item;

    // const [input, setInput] = useState({
    //     name : '',
    //     phone : '',
    //     email: '',
    //     date: ''
    // });

    const [input, setInput] = useContext(UserContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const date = new Date();
    const newDate = date.toDateString();

    // const handleSend = (event) => {
    //     const inputValues = {...input};
    //     inputValues[event.target.name] = event.target.value;
    //     setInput(inputValues);
    //     console.log(inputValues);
    // }

    return (
        <div className="appoint-container">
            <div className="col-md-12" id="appointId">
                <h6>{name}</h6>
                <p>{time}</p>
                <p><small>{description}</small></p>
                <Link to = {`/modal`}>
                <button className="book-btn">Book Appoinment</button>
                </Link>
            </div>

            {/* <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-name">{name}</Modal.Title>
                </Modal.Header>
                <div className="modal-input">
                        <form action="" method="">
                            <input type="text" name="name" id="" placeholder="Your Name"/>
                            <br/>
                            <input type="number" name="phone" id="" placeholder="Phone Number"/>
                            <br/>
                            <input type="text" name="email" id="" placeholder="Email"/>
                            <br/>
                            <input type="date" value="" name="date" id="" placeholder="mm/dd/yy"/>
                        </form>
                </div>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Link to = {`/appoinment`}>
                        <Button variant="primary">Send</Button>
                    </Link>
                </Modal.Footer>
            </Modal> */}
        </div>
    );
};

export default AppoinType;