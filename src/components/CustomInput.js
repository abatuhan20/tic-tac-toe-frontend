import React from "react";
import { ChatAutoComplete, useMessageInputContext, useChannelStateContext, useChatContext } from "stream-chat-react";

function CustomInput() {
  const { handleSubmit } = useMessageInputContext();

  const { client } = useChatContext();
  const { channel } = useChannelStateContext();
  
  // const isUser = (messageUserId) => {
  //   const currentUserID = client.userID;
  //   return messageUserId === currentUserID;
  // };

  // Simulate chat messages
  // const chatMessages = [
  //   { text: "Hello!", isUser: true },
  //   { text: "Hi there!", isUser: false },
  //   { text: "How are you?", isUser: true },
  //   { text: "I'm good, thanks!", isUser: false },
  // ];

  return (
    <div className="str-chat__input-flat str-chat__input-flat--send-button-active">
      <div className="str-chat__input-flat-wrapper">
        <div className="str-chat__input-flat--textarea-wrapper">
          <ChatAutoComplete />
        </div>
        <button onClick={handleSubmit}> Send Message</button>
      </div>

      {/* Simulated chat messages */}
      {/* <ul className="str-chat__list">
        {chatMessages.map((message, index) => (
          <li
            key={index}
            className={`${
              message.isUser ? "right-message" : "left-message"
            } str-chat__message-data`}
          >
            <div className="str-chat__message-text-inner">{message.text}</div>
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default CustomInput;