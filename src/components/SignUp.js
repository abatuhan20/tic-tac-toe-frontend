"use client"
import React, {useState} from 'react'
import Axios from "axios";
import Cookies from 'universal-cookie';

const SignUp = ({ onSignUpSuccess }) => {
    const cookies = new Cookies();
    const [user, setUser] = useState('');

    const showPassword = () => {
        const signPassEl = document.getElementById("signPassEl");

        if("password" === signPassEl.getAttribute("type")) {
            signPassEl.setAttribute("type", "text");
          }
          else {
            signPassEl.setAttribute("type","password");
          }
    }

    const signUp = () => {
        Axios.post("http://localhost:3001/signup", user).then((res) => {
         const { token, userID, firstName, lastName, username, hashedPassword } = res.data;
         if(!username || !hashedPassword || !firstName || !lastName){
            alert("You need to fill the form!");
            return;
         }
         cookies.set("token", token);
         cookies.set("userID", userID);
         cookies.set("username", username);
         cookies.set("firstName", firstName);
         cookies.set("lastName", lastName);
         cookies.set("hashedPassword", hashedPassword);
         
         onSignUpSuccess({
            userID,
            username,
            firstName,
            lastName,
            hashedPassword
        });
        });
    };

  return (
    <div className='signUp'>

        <label> Sign Up </label>
        <input placeholder="First Name" onChange={(event) => {
            setUser({...user, firstName: event.target.value });
        }}/>

        <input placeholder="Last Name" onChange={(event) => {
            setUser({...user, lastName: event.target.value });
        }}/>

        <input placeholder="Username" onChange={(event) => {
            setUser({...user, username: event.target.value });
        }}/> 

        <input id='signPassEl' type='password' placeholder="Password" onChange={(event) => {
            setUser({...user, password: event.target.value });
        }}/>

        <button onClick={showPassword}>Show Password</button>
        <button onClick={signUp}>Sign Up</button>

    </div>
  )
}

export default SignUp