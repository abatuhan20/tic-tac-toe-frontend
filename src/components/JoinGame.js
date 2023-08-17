import React, { useState } from 'react'
import {useChatContext, Channel} from 'stream-chat-react'
import Game from './Game';
import CustomInput from './CustomInput';

const JoinGame = () => {
  const [rivalUsername, setRivalUsername] = useState("");
  const {client} = useChatContext();
  const [channel, setChannel] = useState(null);
  // Oyuncuların birbiriyle eşleşip sadece eşleşen oyuncuların aynı chatte olmasını sağlamak için
  const createChannel = async () => {
    const response = await client.queryUsers({name: { $eq: rivalUsername }});
    if(response.users.length=== 0) {
      alert("User not found!");
      return;
    }

    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });

    await newChannel.watch();
    setChannel(newChannel);
    // Dinlemesi için
  }
  return (
    <>
    {channel ? (
      <Channel channel={channel} Input={CustomInput}>
      <Game channel={channel} setChannel={setChannel}/>
      {/* Bağlanıp bağlanmadıklarını anlamak için */}
      </Channel>
      // Channel olarak oyunu dinlemesini istiyorum o yüzden wraplayıp prop veriyorum
    ) : (
      <div className='joinGame'>
      <h4>Create Game</h4>
      <input 
      placeholder='Username of your opponent:' 
      onChange={(event) =>{
        setRivalUsername(event.target.value)
      }} 
      />
      <button onClick={createChannel}>Join/Start Game</button>
    </div>
    )}
    
  </>
  );
}

export default JoinGame