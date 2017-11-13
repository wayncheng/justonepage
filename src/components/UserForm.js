import React, {Component} from 'react';
import API from "../utils/API";

class UserForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			
		}
	}

	handleFormSubmit = (event) => {
		event.preventDefault();
		const username = document.getElementById('username').value;
		const password = document.getElementById('password').value;
		const newUser = document.getElementById('new-user-flag').checked;

		console.log('username',username);
		console.log('password',password);

		if (newUser){
			console.log('---- SIGNUP --->');
			////////////////////////////////////////////////////
			// Sign Up Process Starts Here
			////////////////////////////////////////////////////
		}
		else {
			console.log('---- LOGIN --->');
			////////////////////////////////////////////////////
			// Login Process Starts Here
			////////////////////////////////////////////////////

		}
	}

	render(){
		return (
			<form className="user-form">
				<input id="username" type="text" placeholder="username"/>
				<input id="password" type="text" placeholder="password"/>
				<div>
					<label htmlFor="new-user-flag">New User?</label>
					<input id="new-user-flag" type="checkbox" />
				</div>
				<div>

					<button 
						id="submit-form"
						className="submit-btn"
						onClick={this.handleFormSubmit}
					>
						Submit
					</button>
					{/* <button 
						id="submit-login"
						className="submit-btn"
						onClick={this.handleLoginSubmit}
					>
						Login
					</button> */}
				</div>
			</form>
		)
	}
}
export default UserForm;