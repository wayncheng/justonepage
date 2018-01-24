import React, { Component } from "react";
import API from "../utils/API";

class UserForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authType: "Login",
			uuid: "",
			password: "",
			newUser: false
		};
	}
	//==================================================
	handleChange = event => {
		const { name, value } = event.target;

		this.setState({
			[name]: value
		});
	};
	//==================================================
	handleAuthType = event => {
		this.setState({ newUser: event.target.checked });
	};
	//==================================================

	handleFormSubmit = event => {
		event.preventDefault();
		// const username = document.getElementById("username").value;
		// const password = document.getElementById("password").value;
		// const newUser = document.getElementById("new-user-flag").checked;

		const { uuid, password, newUser } = this.state;

		if (newUser) {
			console.log("---- CREATE --->");
			////////////////////////////////////////////////////
			// Sign Up Process Starts Here
			////////////////////////////////////////////////////
		} else {
			console.log("---- LOGIN --->");
			////////////////////////////////////////////////////
			// Login Process Starts Here
			////////////////////////////////////////////////////
		}

		console.log("> uuid:", uuid);
		console.log("> password:", password);
		console.log("> newUser:", newUser);
	};

	handleFormClose = event => {
		event.preventDefault();
		// this.closeModal();

		const { target } = event;
		const validTargets = ["modal-root", "close-form"];

		if (validTargets.indexOf(target.id) !== -1) {
			this.closeModal();
		} else {
			console.log("not closing modal");
		}
	};

	closeModal = () => {
		const formRoot = document.getElementById("modal-root");
		formRoot.classList.add("closed");
		
		// const mainEl = document.querySelector('main');
		const mainEl = document.querySelector('#doc');
		mainEl.classList.remove('blurred-out');
	};

	render() {
		return (
			<div
				id="modal-root"
				// className="modal-layer"
				className="modal-layer closed"
				// onClick={this.handleFormClose}
			>
				<form className="user-form">
					<input
						id="username"
						type="text"
						placeholder="username"
						name="uuid"
						onChange={this.handleChange}
					/>
					<input
						id="password"
						type="text"
						placeholder="password"
						name="password"
						onChange={this.handleChange}
					/>
					<div>
						<label htmlFor="new-user-flag">New User?</label>
						<input
							id="new-user-flag"
							type="checkbox"
							name="newUser"
							onChange={this.handleAuthType}
						/>
					</div>
					<div>
						<button
							id="submit-form"
							className="submit-btn ws-btn ws-blue"
							onClick={this.handleFormSubmit}
						>
							{this.state.newUser ? "Create" : "Login"}
						</button>
					</div>
				</form>

				<button
					id="close-form"
					className="close-btn ws-btn"
					onClick={this.handleFormClose}
				>
					Close
				</button>

				{this.props.children}
			</div>
		);
	}
}
export default UserForm;
