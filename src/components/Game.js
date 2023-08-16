import React, { useState } from 'react'
import { Channel } from 'stream-chat-react'
import { StreamChat } from 'stream-chat'
import Board from './Board'

const Game = ({channel}) => {
    const  [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
    // user.watching.start user o sayfaya ne zaman bağlanırsa
    // channel.on fonksiyonu 2 kişide de sayfanın yenilenmesini sağlıyor.
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
        <Board />
        {/* CHAT */}
        {/* LEAVE GAME BUTTON */}
    </div>
  )
}

export default Game