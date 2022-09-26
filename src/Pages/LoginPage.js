import React from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/Auth";
import {useState} from "react"
// import AuthUser from "../Styles/AuthUser.css"
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate()
  const { login } = useAuth();
  return (
    <div className='auth-cont'>
      <h1>Login</h1>
      <div className='login-message'>{loginMessage}</div>
      <div className="auth-details">
        <label>Username</label>
      <input
        type="text"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <label>Password</label>
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        onClick={async () => {
          const loginResult = await login(username, password);
          if (!loginResult.success) {
            setLoginMessage(loginResult.message)
          }
        }}
      >
        Login
      </button>
      <button onClick={()=> navigate('/users/forgot-password')}>Forgot Password?</button>
      </div>
      
    </div>
  );
};

export default LoginPage