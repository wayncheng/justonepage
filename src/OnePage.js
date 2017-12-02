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
			content: "Just some text.",
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
					{/* <article
						id="doc" 
						className="content-wrap"
						html={this.state.content}
						disabled={false} 
						onChange={this.handleChange}
						placeholder="Just some placeholder."
					>
						sartorial viral bicycle rights XOXO ugh keytar flexitarian heirloom Pinterest Truffaut Thundercats kale chips +1 banjo Carles selvage quinoa Godard YOLO normcore Marfa tattooed hashtag letterpress mustache occupy post-ironic cliche Williamsburg artisan bespoke Schlitz hoodie lomo church-key mlkshk vinyl small batch Intelligentsia Pitchfork Vice butcher shabby chic pug DIY chia farm-to-table plaid disrupt dreamcatcher pour-over cray Portland you probably haven't heard of them tote bag sustainable Banksy irony cornhole bitters American Apparel cardigan PBR synth 3 wolf moon asymmetrical next level hella squid semiotics ennui master cleanse Echo Park leggings VHS Tonx meh drinking vinegar readymade sriracha craft beer fanny pack salvia gastropub single-origin coffee Blue Bottle authentic Tumblr actually mixtape Etsy Wes Anderson crucifix wolf locavore stumptown chillwave ethical Neutra banh mi trust fund kogi mumblecore kitsch art party beard raw denim polaroid before they sold out selfies pop-up keffiyeh Odd Future aesthetic yr McSweeney's brunch roof party distillery chambray lo-fi photo booth PBR&B Cosby sweater direct trade  scenester skateboard Bushwick cred fap Brooklyn fingerstache narwhal paleo forage tofu Shoreditch food truck pork belly umami typewriter pickled whatever try-hard put a bird on it wayfarers four loko street art deep v Helvetica fashion axe gluten-free literally High Life flannel blog biodiesel Kickstarter 8-bit slow-carb organic freegan twee fixie seitan 90's messenger bag meggings iPhone Austin gentrify swag vegan jean shorts retro tousled
					</article> */}
					<ContentEditable
						id="doc" 
						className="content-wrap"
						html={this.state.content}
						disabled={false} 
						onChange={this.handleChange}
						placeholder="Just some placeholder."
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