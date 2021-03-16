import React, { useEffect } from 'react';
import { useState } from 'react';
import '../UserAppointment/UserAppoinment.css';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PeopleIcon from '@material-ui/icons/People';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SettingsIcon from '@material-ui/icons/Settings';
import Calendar from 'react-calendar';

const UserAppoinment = () => {

    const [appointment, setAppointment] = useState([]);
    const [value, onChange] = useState(new Date()); 

    
    useEffect(() => {
        fetch('http://localhost:5000/showAppointment', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setAppointment(data));
    }, [])

    return (
        <div>
            <div className="dashboard">
                <div className="list col-md-3">
                    <div className="list-p">
                        <p><DashboardIcon></DashboardIcon>      Dashboard</p>
                        <p><CalendarTodayIcon></CalendarTodayIcon>      Appoinment</p>
                        <p><PeopleIcon></PeopleIcon>        Patients</p>
                        <p><ListAltIcon></ListAltIcon>      Prescriptions</p>
                        <p><SettingsIcon></SettingsIcon>        Settings</p>
                    </div>
                </div>
                <div className="col-md-4 calender">
                    <h5>Appoinments</h5>
                    <div className="calendar-2">
                        <Calendar className="calender-style-2"
                            onChange={onChange}
                            value={value}
                        />
                    </div>
                </div>
                <div className="user-appointments col-md-4">
                    <div className="appoint-time">
                    <h6>Appoinments</h6>
                    <p><small>{value.toDateString()}</small></p>
                    </div>
                   <div className="time-sched">
                        <div className="names">
                            <p><bold>Name</bold></p>
                                <div className="nm">{appointment.map(ap => <ul><bold>{ap.name}</bold></ul>)}</div>
                        </div>
                        <div className="schedule">
                            <p>Schedule</p>
                            <div className="sc">{appointment.map(sc => <ul>{sc.date}</ul>)}</div>
                        </div>
                   </div>
                </div>
            </div>
        </div>
    );
};

export default UserAppoinment;