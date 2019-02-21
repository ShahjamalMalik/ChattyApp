import React, {Component} from 'react';

const uuidv1 = require('uuid/v1');

class ChatBar extends Component {
    
   


  render () {
    
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue="Anonymous"  onKeyPress={this.props.updateUserName} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER"  onKeyPress={this.props.sendMessage} />
        
      </footer>
     );
  }
}

export default ChatBar;