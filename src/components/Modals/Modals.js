import React, { useContext, useEffect } from 'react';
import '../AppoinType/AppoinType.css';
import {Modal, Button} from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { UserContext } from '../../App';
import '../Modals/Modals.css';
import AppoinType from '../AppoinType/AppoinType';
import data from '../../Data/data.json';
import Calendar from 'react-calendar';
import { Nav } from 'react-bootstrap';
import chair from '../MaskGroup1.png';


const Modals = () => {

    
    // const [input, setInput] = useContext(UserContext);
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const date = new Date();
    const newDate = date.toDateString();
    const [dates, setDate] = useState([]);
    const [value, onChange] = useState(new Date()); 

    

    const [input, setInput] = useState({
        name: '',
        email: '',
        phone: '',
        date: ''
    });

    const handleData = (event) => {
        // console.log(loggedInUser);
        const user = {...input};
        user[event.target.name] = event.target.value;
        setInput(user);
        fetch('http://localhost:5000/sendAppoinment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }



    return (
        <div className="appoint-container">
           
           <div className="container">
            <div className="menu">
                {/* <img src={logo} alt=""/> */}
                <Nav className="justify-content-end" activeKey="/home">
                    <Nav.Item>
                        <Nav.Link eventKey="home" className="nav">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="home" className="nav">About</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="dentalServices" className="nav">Dental Services</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="reviews" className="nav">Reviews</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="blog" className="nav">Blog</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="contact" className="nav">Contact Us</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>

            <div className="calender-chair">
                <div className="col-md-6 appoinment">
                    <h1>Appoinment</h1>
                    <div className="calendar">
                        <Calendar className="calendar-style"
                            onChange={onChange}
                            value={value}

                        />
                    </div>
                </div>
                <div className="col-md-6 chair">
                    <img src={chair} alt="" />
                </div>
            </div>

            <div className="appointed-date">
                <h5>Available Appoinments on {value.toDateString()}</h5>
            </div>

            <div className="appoinmentType">
                {
                    data.map(item => <AppoinType item={item}></AppoinType>)
                }
            </div>
        </div>


            <Modal show={show} onHide={handleShow} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-name"></Modal.Title>
                </Modal.Header>
                <div className="modal-input">
                        <form action="" method="">
                            <input onChange={handleData} type="text" name="name" id="" placeholder="Your Name"/>
                            <br/>
                            <input onChange={handleData} type="number" name="phone" id="" placeholder="Phone Number"/>
                            <br/>
                            <input onChange={handleData} type="text" name="email" id="" placeholder="Email"/>
                            <br/>
                            <input onChange={handleData} type="text" name="date" id="" placeholder="mm/dd/yy"/>
                        </form>
                </div>
                <Modal.Footer>
                    <Link to = {`/appoinment`}>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </Link>

                    
                    <Link to = {`/appoinment`}>
                        <Button variant="primary" onClick={handleData}>Send</Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Modals;