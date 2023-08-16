
"use client"
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import { StreamChat } from 'stream-chat' 
import { Chat } from 'stream-chat-react'
import Cookies from "universal-cookie";
import { useState } from 'react';
import JoinGame from '@/components/JoinGame';


export default function Home() {
  const api_key = "my4ee8pwjqvn";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState(null); // State to hold user data
 
  const handleSignUpSuccess = (userData) => {
      setUserData(userData); // Update user data in the state
      setIsAuth(true); // Auth status
  };

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userID");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  }


  if (token) {
    client?.connectUser({
      id: cookies.get("userID"),
      name: cookies.get("username"),
      firstName: cookies.get("firstName"),
      lastName: cookies.get("lastName"),
      hashedPassword: cookies.get("hashedPassword"),
    },
    token
    ).then((userData) => {
        console.log(userData);
        setIsAuth(true);
      });
  }
  return (
    <main className="page">
      {isAuth ? (
        <Chat client={client}>
          {/* Client içindeki user vs alabilmek için hook kullanıyorum */}
        <JoinGame />
        <button onClick={logOut}>Log Out</button>
        </Chat>
      ) : (
      <>
      <Login setIsAuth={setIsAuth} />
      <SignUp onSignUpSuccess={handleSignUpSuccess} />
      </>
      )}
    </main>
  )
}
