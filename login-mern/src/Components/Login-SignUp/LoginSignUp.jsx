import React, { useState } from 'react'
import './LoginSignUp.css'
import user_icon from '../Assests/person.png'
import email_icon from '../Assests/email.png'
import password_icon from '../Assests/password.png'
import axios from 'axios';

const LoginSignUp = () => {
    
    const [action,setAction] = useState("Login");
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    });


    const handleAuth = async () => {
        const endpoint = action === 'Sign Up' ? '/auth/register' : '/auth/login';

        try {
            await axios.post(`http://localhost:5000${endpoint}`, userData);
            alert(`${action} successful!`);

            if (action === 'Login') {
                window.location.href = '/dashboard';
            }
        } catch (error) {
            alert('Error: ' + error.response.data.error);
        }
    };
    
    return (
        <div className='container'>

        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>


        <div className="inputs">
            {action === 'Login' ? <div></div> : (
                <div className="input">
                    <img src={user_icon} alt="" />
                    <input 
                        type="text" 
                        placeholder='Name'
                        name="username"
                        value={userData.username}
                        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                    />
                </div>
            )}

            <div className="input">
                <img src={email_icon} alt="" />
                <input 
                    type="email" 
                    placeholder='Email ID'
                    name="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
            </div>

            <div className="input">
                <img src={password_icon} alt="" />
                <input 
                    type="password" 
                    placeholder='Password'
                    name="password"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                />
            </div>
        </div>

        
        <div className="submit-container">
            <div 
                className={action === 'Login' ? 'submit gray' : 'submit'} 
                onClick={() => {
                    setAction('Sign Up');
                    handleAuth();  
                }}>
                Sign Up
            </div>

            <div 
                className={action === 'Sign Up' ? 'submit gray' : 'submit'} 
                onClick={() => {
                    setAction('Login');
                    handleAuth();  
                }}>
                Login
            </div>
        </div>
        </div>
  )
}

export default LoginSignUp
