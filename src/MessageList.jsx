import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
    
    const message = this.props.messages.map(x => {
      console.log("this is the type", x)
      if(x.type != "incomingNotification") {
        
        return (
          <Message key={ x.id }
          username={ x.username }
          content={ x.content } />
        ) 
       }
      else {
        return (
          <Notification key={ x.id }
          content={ x.content } />
        ) 
      }
    });

    
    return (
      <main className="messages">
        {message}
      </main>

    );
  }
}

export default MessageList;



