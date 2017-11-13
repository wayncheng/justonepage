import React, { Component } from "react";
import API from "./utils/API";
import ContentEditable from 'react-contenteditable';
import UserForm from './components/UserForm';

const breakpoint = 24;

let content =
	"High Life stumptown pork belly bicycle rights sustainable shabby chic cliche Vice Tumblr artisan selfies kale chips ethical blog gentrify swag pug next level raw denim polaroid sartorial leggings Carles DIY Kickstarter fingerstache dreamcatcher literally single-origin coffee biodiesel banh mi.";

class OnePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: "",
			split: [],

		};
	}

	//==================================================
	componentDidMount = () => {
		console.log("---- componentDidMount --->");

		let {id} = this.props;
		console.log('id',id);

		API.getOne(id).then(response => {
			console.log("response", response);
			console.log("response.data", response.data);
			let { text } = response.data;

			this.setState({
				id: id,
				initial: text,
				content: text,
			});
		});

		// <article id="doc" className="content-wrap" contentEditable="true" onKeyUp={this.handleChange} >


		// this.setState({
		// 	content
		// });
	};

	//==================================================
	handleChange = event => {
		this.setState({
			content: event.target.value
		})
	};
	//==================================================
	handleSave = event => {
		event.preventDefault();
		let { id, content } = this.state;

		console.log('id',id);
		console.log('content',content);		

		
		API.update(id,content)
		
	}
	//==================================================

	render() {
		return (
			<div id="justoneroot">
				<a className="sitename-wrap" href="https://github.com/wayncheng/justonepage" >
					<h1 className="sitename"> justonepage </h1>
				</a>
				<nav className="globalnav">
				<a className="gn-burger" href="#!">
					<img src="icons/burger-black-a-round.svg"/>
				</a>
					<button 
						id="save-btn" 
						className="ws-btn ws-light ws-mini"
						onClick={this.handleSave}
					>
						Save
					</button>
				</nav>
				<main>
					<ContentEditable
						id="doc" 
						className="content-wrap"
						html={this.state.content}
						disabled={false} 
						onChange={this.handleChange}
					/>
				</main>
				{/* <UserForm /> */}
				
			</div>
		);
	}
}
export default OnePage;

OnePage.defaultProps = {
	id: '1',
}