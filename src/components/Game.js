import React, { useState } from 'react'
import { Channel } from 'stream-chat-react'
import { StreamChat } from 'stream-chat'
import Board from './Board'
import { Window, MessageList, MessageInput } from 'stream-chat-react'
import "./Chat.css";
import { DM_Sans } from 'next/font/google'
// CSS stream kütüphanesi içi componentlere vuruyo

const Game = ({channel, setChannel}) => {
    const  [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
    // user.watching.start user o sayfaya ne zaman bağlanırsa
    // channel.on fonksiyonu 2 kişide de sayfanın yenilenmesini sağlıyor.
    const [result, setResult] = useState({ winner: "none", state: "none" });
    
    channel.on("user.watching.start", (event) => {
        setPlayersJoined(event.watcher_count === 2)
    });
    // channel.state.watcher_count bağlantı sayısını trackliyor
    // Oyuncuların bağlanıp bağlanmadığına bu kısımda bakabiliyorum.
    if(!playersJoined) {
        return <div className='loading'>Waiting for other player to join...</div>
    }

  return (
    <div className='gameContainer'>
        <Board result={result} setResult={setResult} />
        <Window>
          <MessageList 
          disableDateSeparator 
          closeReactionSelectorOnClick 
          messageActions={["react","delete"]}
          hideDeletedMessages
          />
          <MessageInput noFiles/>
        </Window>
        <button id='leaveBtn'
        onClick={async () => {
          await channel.stopWatching();
          setChannel(null);
        }}
      >
        {" "}
        Leave Game
      </button>
      {result.state === "won" && <div> {result.winner} Won The Game</div>}
      {result.state === "tie" && <div> Game Tieds</div>}
    </div>
  )
}

export default Game