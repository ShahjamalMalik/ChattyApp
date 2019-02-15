import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: "",
      messages: [],
      
      websocket: null
    }
    this.addMessage = this.addMessage.bind(this)
    this.onChange = this.onChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.onUserChange = this.onUserChange.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    
  }
  
  addMessage(id, username, content) {
    var newMessage = 
    {
      id: id,
      username: username,
      content: content
    }

    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})

  }

  sendMessage(e) {
    var jsonObject = {
      username: this.state.currentUser,
      content: this.state.message
    }
    
    if (e.key === "Enter") {
      this.state.websocket.send(JSON.stringify(jsonObject))
  }
  }

  updateUserName(e) {

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
        this.addMessage(this.state.id, this.state.currentUser, this.state.message)
    }

}

  
  componentDidMount() {
    
    const socket = new WebSocket("ws://localhost:3001");

    socket.onopen = function (e) {
      this.setState ({ websocket: socket});
      console.log("Connected to server")
    }.bind(this)

    



    socket.onmessage = (e) => {
      const messages = this.state.messages;
      const data = JSON.parse(e.data);
      messages.push(data)
      this.setState({messages})

      console.log(this.state.messages);
      
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
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name} sendMessage={this.sendMessage} updateUserName={this.updateUserName} onChange={this.onChange} onUserChange={this.onUserChange}/>
      </div>
    );
  }
}
export default App;