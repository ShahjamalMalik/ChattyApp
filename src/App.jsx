import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "Anonymous",
      messages: [],
      amountOfUsers: '',
      websocket: null
    };
   
    
    this.sendMessage = this.sendMessage.bind(this);
    this.updateUserName = this.updateUserName.bind(this);
    
  }
  
  // This is to send the notification data that someone has changed their name
  updateUserName(e) {
    var info = {
      type: "postNotification",
      content: `${this.state.currentUser} has changed their name to ${e.target.value}`
  }


    if (e.key === "Enter") {
      this.setState({currentUser: e.target.value});
      this.state.websocket.send(JSON.stringify(info));
    }
  }  

  // This is to send the message data to the server
  sendMessage(e) {
    var jsonObject = {
      type: "postMessage",
      username: this.state.currentUser,
      content: e.target.value
    };
    
    if (e.key === "Enter") {
      this.state.websocket.send(JSON.stringify(jsonObject));
      e.target.value = '';
  }
  }


  
  componentDidMount() {
    
    const socket = new WebSocket("ws://localhost:3001");

    socket.onopen = function (e) {
      this.setState ({ websocket: socket});
    }.bind(this);

    


    // This is to push the data into the messages array in our state so it can display.
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type) {
        const messages = this.state.messages;
        const data = JSON.parse(e.data);
        messages.push(data);
        this.setState({messages});
  
        
      } else {
        // add this set time out animation to offset weired user exp when loading time is milisecond
        setTimeout(() => {
          this.setState({amountOfUsers: data});
        }, 400);
      }
    };
  
    setTimeout(() => {
      
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      
      this.setState({messages: messages});
     
    }, 3000);
  }
  
  render() {
    return (
      <div>
        <NavBar amountOfUsers={this.state.amountOfUsers}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name} sendMessage={this.sendMessage} updateUserName={this.updateUserName}/>
      </div>
    );
  }
}
export default App;

