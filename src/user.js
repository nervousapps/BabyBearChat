import React from 'react';
import {render} from 'react-dom';
import 'react-bootstrap';

class User extends React.Component{

	constructor(props, context) {
        super(props, context);
        console.log("USR LOG : " + this.props.name);
  }

  clickFunc(){
		this.props.socket.emit('data', {"usrName": this.props.name, "usrReach": this.props.user, "action": "discussion"});
	}

	render(){
		return(
			<div>
				<ul className="chat">
		            <li onClick={this.clickFunc.bind(this)} >{this.props.user}</li>
		        </ul>
		    </div>
		)
	}
}

export default User;
