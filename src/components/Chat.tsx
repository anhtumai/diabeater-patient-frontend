import React from 'react';
import { CSSTransition } from 'react-transition-group';
import '../layout.css'; // import the CSS file

function ChatBubble({ message, isIncoming }) {
  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={1300}
      classNames="slide"
    >
      <div className={`chat-bubble ${isIncoming ? 'incoming' : 'outgoing'}`}>
        {message}
      </div>
    </CSSTransition>
  );
}

export default ChatBubble;