import React, { useState } from 'react'
import { Channel } from 'stream-chat-react'
import { StreamChat } from 'stream-chat'
import Board from './Board'
import { Window, MessageList, MessageInput } from 'stream-chat-react'
import "./Chat.css";
import { DM_Sans } from 'next/font/google'
// CSS stream kütüphanesi ici componentlere vuruyo

const Game = ({channel, setChannel}) => {
    const  [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
    // user.watching.start user o sayfaya ne zaman baglanırsa
    // channel.on fonksiyonu 2 kiside de sayfanin yenilenmesini sagliyor.
    const [result, setResult] = useState({ winner: "none", state: "none" });
   
    channel.on("user.watching.start", (event) => {
        setPlayersJoined(event.watcher_count === 2)
    });
    // channel.state.watcher_count baglanti sayisini trackliyor
    // Oyuncularin baglanip baglanmadigina bu kisimda bakabiliyorum.
    if(!playersJoined) {
        return <div className='loading'>Waiting for other player to join...</div>
    }

  return (
    <div className='gameContainer'>
      
        <Board result={result} setResult={setResult} />
        <div className='chatContainer'>
        <Window>
          <MessageList
          disableDateSeparator 
          closeReactionSelectorOnClick 
          messageActions={["react","delete"]}
          hideDeletedMessages
          />
          <MessageInput noFiles/>
        </Window>
        </div>
        <button id='leaveBtn'
        onClick={async () => {
          await channel.stopWatching();
          setChannel(null);
        }}
      >
        {" "}
        Leave Game
      </button>
      {/* <button onClick={async () => {
        await channel.disableSlowMode();
      }}>Disable Slow Mode</button> */}
      {result.state === "won" && <div className='result'> {result.winner} Won The Game</div>}
      {result.state === "tie" && <div className='result'> Game Tieds</div>}
    </div>
  )
}

export default Game