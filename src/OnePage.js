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
			<div>
				<h1 id="site-name"> justonepage </h1>
				<UserForm />
				<nav className="global-nav">
					<button 
						id="save-btn" 
						className="ws-btn"
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
			</div>
		);
	}
}
export default OnePage;

OnePage.defaultProps = {
	id: '1',
}