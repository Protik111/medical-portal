import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import '../Login/Login.css';
import photo from '../Group140.png';

firebase.initializeApp(firebaseConfig);

const Login = () => {

    
    const [user, setUser] = useState({
        isSignedIn: false,
        firstName: '',
        lastName: '',
        displayName: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false,
        confirmPassword: ''
    })


    const [passStatus, setPassStatus] = useState('');
    const [newUser, setNewUser] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const {displayName, email} = result.user;
                const newUserInfo = {name: displayName, email};
                // const newUserInfo = {...user};
                // setUser(newUserInfo);
                setLoggedInUser(newUserInfo);
                history.replace(from);
                console.log(newUserInfo);

            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    }

    const handleSubmit = (e) => {
        console.log(user.email, user.password, user.firstName);
        if(newUser && user.email && user.password && user.password === user.confirmPassword){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then( res => {
                    const newUserInfo = {...user}
                    // console.log(newUserInfo.name);
                    const name = user.firstName+ ' ' +user.lastName;
                    newUserInfo.displayName = name;
                    updateUserProfile(name);
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setLoggedInUser(newUserInfo);
                    setUser(newUserInfo);
                    // console.log(loggedInUser);
                    console.log(user.displayName);
                    setPassStatus('');
                    console.log(newUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    // var errorCode = error.code;
                    // var errorMessage = error.message;
                    // console.log(errorCode, errorMessage);
    
                    const newUserInfo = {...user}
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
            }
            if(newUser && user.password != user.confirmPassword){
                setPassStatus('Password does not match');
            }if(user.name){
                setLoggedInUser(e.target.value);
            }
    
            if(!newUser && user.email && user.password){
                firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = {...user}
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setLoggedInUser(newUserInfo);
                    setUser(newUserInfo);
                    history.replace(from);
                    // console.log(res);
                    
                })
                .catch((error) => {
                    const newUserInfo = {...user}
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
            }
            e.preventDefault();
        }

        const updateUserProfile = (name) => {
            const newUser = firebase.auth().currentUser;
            newUser.updateProfile({
                displayName: name,
            })
            .then(function() {
                console.log('Updated profile');
                console.log(user.displayName);
            })
            .catch(function(error) {
                console.log(error)
            });
        }

    const handleBlur = (event) => {
        let isFormValid = true;
        if (event.target.name === 'email') {
            isFormValid = /\S+@\S+|.S+/.test(event.target.value);
        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            const hasPasswordNumber = /\d{1}/.test(event.target.value);
            isFormValid = isPasswordValid && hasPasswordNumber;
        }

        // if(event.target.name === 'password2'){
        //     const confrimPassword = event.target.value;
        //     // console.log(confrimPassword);
        //     if(event.target.value === password) {
        //         console.log('matched');
        //     }
        // }

        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            // console.log(newUserInfo);
            setUser(newUserInfo);
        }
    }

    return (
        <div className="main-container">
            {/* <h2>this is login</h2>
            <button onClick={handleGoogleSignIn}>Continue With Google</button> */}

            <div className="log-container">
                <div className="log-container2">
                    <div className="header">
                        <h3>{newUser? 'Sign Up' : 'Log In'}</h3>
                    </div>
                    <form action="" onSubmit={handleSubmit}>
                        {newUser && <input onBlur={handleBlur} type="text" name="firstName" id="" className="all-input" placeholder="First Name" required />}
                        <br />
                        {newUser && <input onBlur={handleBlur} type="text" name="lastName" id="" className="all-input" placeholder="Last Name" required />}
                        <br />
                        <input onBlur={handleBlur} type="text" name="email" id="" className="all-input" placeholder="Username or Email" required />
                        <br />
                        <input onBlur={handleBlur} type="password" name="password" id="" className="all-input" placeholder="Password" required />
                        <br/>
                        {/* <input type="checkbox" name="" id=""/>
                        <label htmlFor="forget">Remember Me</label>
                        <br /> */}
                        {newUser && <input onBlur={handleBlur} type="password" name="confirmPassword" id=""className="all-input"  placeholder="Confirm Password" required />}
                        <br />
                        <input type="submit" className="logbtn" value={newUser? 'Sign Up' : 'Sign In'}/>
                    </form>
                    <div className="new-user">
                        <label htmlFor="newUser">{newUser? "Already have an account?" : "Don't have an account?"}</label>
                        <button onClick={() => setNewUser(!newUser)} name="newUser">{newUser? 'Login' :'Create an account'}</button>
                    </div>
                </div>
            </div>

            <div className="col-md-6 photo">
                <img src={photo} alt=""/>
            </div>
        </div>
    );
};

export default Login;