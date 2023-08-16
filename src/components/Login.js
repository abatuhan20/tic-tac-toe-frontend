"use client"
import axios from 'axios';
import React, {useState} from 'react'
import Cookies from 'universal-cookie';
//Axios importunu küçük harfle yapmamı istedi Axios olunca
//post functionunu kabul etmedi.

const Login = ({ setIsAuth }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const cookies = new Cookies();

    const login = () => {
      axios.post("http://localhost:3001/login",{
        username,
        password,
      }).then((res) => {
        const {firstName, lastName, username, token, userID} = res.data;
        cookies.set("token", token);
        cookies.set("userID", userID);
        cookies.set("username", username);
        cookies.set("firstName", firstName);
        cookies.set("lastName", lastName);

        setIsAuth(true);
      });

    }

  return (
    <div className='login'>

        <label> Login </label>

        <input placeholder="Username" onChange={(event) => {
            setUsername(event.target.value);
        }}/> 

        <input placeholder="Password" onChange={(event) => {
            setPassword(event.target.value);
        }}/>

        <button onClick={login}>Login</button>

    </div>
  )
}

export default Login