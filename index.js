import React from 'react';
import ReactDOM from 'react-dom';
import SocketIOClient from 'socket.io-client';
import Msgcontainer from './src/msgcontainer.js';
import Paneluser from './src/paneluser.js';
import Panelgroup from './src/panelgroup.js';
import Navbar from './src/navbar.js';
import 'react-bootstrap';
import './src/css/container.css';

var date = new Date();

const uri = 'https://localhost:3000';
const options = { transports: ['websocket'] };

class Index extends React.Component{

	constructor(props, context) {
		super(props, context);
		this.client = SocketIOClient(uri, options);
		this.state = {
			messages:[],
			users:[],
			groups:[],
			desti:"BabyBearChannel",
			name:""
		};

		console.log(this.state.desti);

		this.htmlspecialchars = this.htmlspecialchars.bind(this);

		this.connect = this.connect.bind(this);
		this.wrongUsr = this.wrongUsr.bind(this);
		this.rightUsr = this.rightUsr.bind(this);
		this.updateUserList = this.updateUserList.bind(this);
		this.updateGroupList = this.updateGroupList.bind(this);
		this.updateUserMess = this.updateUserMess.bind(this);
		this.clearMsg = this.clearMsg.bind(this);
		this.msgReceived = this.msgReceived.bind(this);
		this.onUnload = this.onUnload.bind(this);
	}

	onUnload(event) { // the method that will be used for both add and remove event
		this.client.emit('data', {"name": name, "action": "quit"});
	}

	componentWillUnmount() {
		window.removeEventListener("beforeunload", this.onUnload)
	}

	componentDidMount() {
		this.client.on('connect', this.connect);
		this.client.on('wrongusr', this.wrongUsr);
		this.client.on('rightusr', this.rightUsr);
		this.client.on('updateUserList', this.updateUserList);
		this.client.on('updateGroupList', this.updateGroupList);
		this.client.on('updateUserMess', this.updateUserMess);
		this.client.on('clearMsg', this.clearMsg);
		this.client.on('data', this.msgReceived);
	}

	htmlspecialchars(str) {
		if (typeof(str) == "string") {
			str = str.replace(/&/g, "&amp;");
			str = str.replace(/"/g, "&quot;");
			str = str.replace(/'/g, "&#039;");
			str = str.replace(/</g, "&lt;");
			str = str.replace(/>/g, "&gt;");
		}
		return str;
	}


	connect(){
		var {name} = this.state;
		var person = this.htmlspecialchars(prompt("Please enter your name", "HarryPotter"));
		if (person != null) {
			name = person;
			this.setState({name});
			var passwd = this.htmlspecialchars(prompt("Please enter your password", "*********"));
			if(passwd != null){
				this.client.emit('data', {"name": name, "passwd": passwd, "action": "connection"});
			}
		}
	}

	wrongUsr(){
		var {name} = this.state;
		var person = this.htmlspecialchars(prompt("Please choose another user name, this one is already taken ! Or your password is wrong ", "HarryPotter"));
		if (person != null) {
			name = person;
			this.setState({name});
			var passwd = this.htmlspecialchars(prompt("Please enter your password", "*********"));
			if(passwd != null){
				this.client.emit('data', {"name": name, "passwd": passwd, "action": "connection"});
			}
		}
	}

	rightUsr(chunk){
		var {messages} = this.state;
		messages.push(chunk);
		console.log("MSGCONTAINER LOG : " + messages);
		console.log(chunk);
		this.setState({messages});
	}

	updateUserList(chunk, rm){
		var {users} = this.state;
		if(rm){
			var idx = users.indexOf(chunk);
			users.splice(idx);
		}else{
			users.push(chunk);
		}
		this.setState({users})
	}

	updateGroupList(chunk, rm){
		var {groups} = this.state;
		if(rm){
			var idx = groups.indexOf(chunk);
			groups.splice(idx);
		}else{
			groups.push(chunk);
		}
		this.setState({groups});
	}

	updateUserMess(chunk){
		var {messages} = this.state;
		messages.push(chunk);
		console.log("MSGCONTAINER LOG updateUserMess : " + messages);
		this.setState({messages});
	}

	clearMsg(chunk){
		var {messages} = this.state;
		messages = [];
		this.setState({messages});

		var {name} = this.state;
		if(chunk != name){
			var {desti} = this.state;
			desti = chunk;
			this.setState({desti});
		}

		console.log(" clearMsg LOG : " + messages);
	}

	msgReceived(chunk){
		var {desti} = this.state;
		var {name} = this.state;
		if((chunk.from === desti && chunk.to == name) || (chunk.from === name && chunk.to == desti) || (chunk.to === desti && chunk.to === "BabyBearChannel")){
			var {messages} = this.state;
			messages.push(chunk);
			console.log("MSGCONTAINER LOG msgReceived : " + messages);
			this.setState({messages});
		}
	}

	render(){
		return(
			<div>
				<Navbar name={this.state.name}/>
				<div className="container">
					<div className="row">
						<div className="col-md-8">
							<Msgcontainer
							socket={this.client}
							messages={this.state.messages}
							name={this.state.name}
							desti={this.state.desti}
							/>
						</div>
						<div className="col-md-4">
							<Paneluser socket={this.client} users={this.state.users} name={this.state.name}/>
							<Panelgroup socket={this.client} groups={this.state.groups} name={this.state.name}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

ReactDOM.render(<Index />, document.getElementById('container'));
