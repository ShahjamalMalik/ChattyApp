import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const message = this.props.messages.map(x => {
      return (<Message
        key={ x.id }
        username={ x.username }
        content={ x.content } />);
    })

    return (
      <main className="messages">
        {message}
      </main>

    );
  }
}

export default MessageList;