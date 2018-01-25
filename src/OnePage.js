import React, { Component } from "react";
import API from "./utils/API";
import ContentEditable from "react-contenteditable";
import UserForm from "./components/UserForm";

const breakpoint = 24;


class OnePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: "Just some text.",
			split: []
		};
	}

	//==================================================
	componentDidMount = () => {
		console.log("---- componentDidMount --->");

		let { id } = this.props;
		let { username } = this.props.match.params;
		console.log('username',username);

		// ----------------------
		// 	getUserData
		// ----------------------
		API.getUserData(username).then(response => {
			let content = response.data.text;
			console.log('content',content);

			this.setState({
				username,
				content,
			});
		});

		// API.getUser(username).then(response => {
		// 	let { user, id } = response.data;
		// 	this.setState({
		// 		id: id,
		// 		content: `user ${user} uuid ${id}`
		// 	});
		// });

		
		// API.getOne(id).then(response => {
		// 	// console.log("> response.data", response.data);
		// 	let { id,text } = response.data;
		// 	console.log('> id',id);
		// 	console.log('> text',text);

		// 	this.setState({
		// 		id: id,
		// 		initial: text,
		// 		content: text
		// 	});
		// });
	};

	//==================================================
	handleMenuOpen = event => {
		const modalRootEl = document.getElementById("modal-root");
		modalRootEl.classList.remove("closed");

		// const mainEl = document.querySelector('main');
		const mainEl = document.querySelector('#doc');
		mainEl.classList.add('blurred-out');
	};

	//==================================================
	handleChange = event => {
		this.setState({
			content: event.target.value
		});
	};
	//==================================================
	handleSave = event => {
		event.preventDefault();
		let { id, content } = this.state;

		console.log("id", id);
		console.log("content", content);

		API.update(id, content);
	};
	//==================================================

	render() {
		return (
			<div id="justoneroot">
				<a
					className="sitename-wrap"
					href="https://github.com/wayncheng/justonepage"
				>
					<h1 className="sitename"> justonepage </h1>
				</a>
				<nav className="globalnav">
					<a
						className="gn-burger"
						href="#!"
						onClick={this.handleMenuOpen}
					>
						<img src="icons/burger-black-a-round.svg" />
					</a>
				</nav>
				<main>
					<ContentEditable
						id="doc"
						className="content-wrap"
						html={this.state.content}
						disabled={false}
						onChange={this.handleChange}
						placeholder="Just some placeholder."
					/>
				</main>
				<UserForm>
					<button
						id="save-btn"
						className="ws-btn ws-light pin-top-left"
						onClick={this.handleSave}
					>
						Save
					</button>
				</UserForm>
			</div>
		);
	}
}
export default OnePage;

OnePage.defaultProps = {
	id: "1"
};
