import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: "Bob",
      messages: [],
      totalUsers: '',
      websocket: null
    }
   
    
    this.sendMessage = this.sendMessage.bind(this)
    this.updateUserName = this.updateUserName.bind(this)
    
  }
  
  updateUserName(e) {
    var info = {
      type: "postNotification",
      content: `${this.state.currentUser} has changed their name to ${e.target.value}`
  }


    if (e.key === "Enter") {
      this.setState({currentUser: e.target.value})
      this.state.websocket.send(JSON.stringify(info))
    }
  }  


  sendMessage(e) {
    var jsonObject = {
      type: "postMessage",
      username: this.state.currentUser,
      content: e.target.value
    }
    
    if (e.key === "Enter") {
      this.state.websocket.send(JSON.stringify(jsonObject))
  }
  }


  
  componentDidMount() {
    
    const socket = new WebSocket("ws://localhost:3001");

    socket.onopen = function (e) {
      this.setState ({ websocket: socket});
      console.log("Connected to server")
    }.bind(this)

    



    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type) {
        const messages = this.state.messages;
        const data = JSON.parse(e.data);
        messages.push(data)
        this.setState({messages})
  
        console.log(this.state.messages);
      } else {
        // add this set time out animation to offset weired user exp when loading time is milisecond
        setTimeout(() => {
          this.setState({totalUsers: data})
        }, 400)
      }
    }
  

    socket.onclose = (e) => {
      console.log(e)
    }
    

    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      
      this.setState({messages: messages})
     
    }, 3000);
  }
  render() {
    return (
      <div>
        <NavBar totalUsers={this.state.totalUsers}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name} sendMessage={this.sendMessage} updateUserName={this.updateUserName}/>
      </div>
    );
  }
}
export default App;

