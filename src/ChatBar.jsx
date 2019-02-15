import React, {Component} from 'react';

const uuidv1 = require('uuid/v1');

class ChatBar extends Component {
    
   


  render () {
    
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)"   onKeyPress={this.props.updateUserName} onChange={this.props.onUserChange}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER"  onKeyPress={this.props.sendMessage} onChange={this.props.onChange}/>
        
      </footer>
     );
  }
}

export default ChatBar; 