import React from 'react';
import {render} from 'react-dom';
import 'react-bootstrap';

class Group extends React.Component{

	constructor(props, context) {
        super(props, context);
        console.log("GROUP LOG : " + this.props.name);
    }

  clickFunc(){
		this.props.socket.emit('data', {"usrName": this.props.name, "usrReach": this.props.group, "action": "discussion"});
	}

	render(){
		return(
			<div>
				<ul className="chat">
		            <li onClick={this.clickFunc.bind(this)} >{this.props.group}</li>
		        </ul>
		    </div>
		)
	}
}

export default Group;
