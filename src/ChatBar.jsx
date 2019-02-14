import React, {Component} from 'react';

const uuidv1 = require('uuid/v1');

class ChatBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: "",
            message: "",
            id: null
        }
        this.onChange = this.onChange.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.onUserChange = this.onUserChange.bind(this)
        
    }
    onChange(e) {
        
        this.setState({message: e.target.value})
        
    }

     onUserChange(e) {
        
        this.setState({currentUser: e.target.value})
        
    }

     handleKeyPress(e) {
        if (e.key === "Enter") {
            this.setState({id: uuidv1()});
            this.props.addMessage(this.state.id, this.state.currentUser, this.state.message)
        }

    }


  render () {
    
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)"  onChange={this.onUserChange} onKeyPress={this.handleKeyPress}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onChange={this.onChange} onKeyPress={this.handleKeyPress}/>
      </footer>
     );
  }
}

export default ChatBar; 