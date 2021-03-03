import React from 'react';
import { Nav } from 'react-bootstrap';
import '../Appoinment/Appoinment.css';
import chair from '../MaskGroup1.png';
// import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import data from '../../Data/data.json';
import AppoinType from '../AppoinType/AppoinType';



const Appoinment = () => {
    const [value, onChange] = useState(new Date());
    const [date, setDate] = useState([]);
    // const handleDate = () => {
    //     // setDate(new Date());
    //     const newDate = new Date().toLocaleString()
    //     setDate(newDate);
    // }

    return (
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
    );
};

export default Appoinment;