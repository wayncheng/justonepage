import React, {Component} from 'react';

class OnePage extends Component {
	constructor(props){
		super(props);
		this.state = {
			content: '',
			split: [],
		}
	}

//==================================================
	componentDidMount = () => {
		let content = `Craft beer thundercats four loko authentic ramps poke lomo selfies lumbersexual whatever gentrify before they sold out portland slow-carb XOXO. Taxidermy roof party disrupt direct trade squid man braid fanny pack artisan chillwave palo santo snackwave food truck mlkshk gluten-free venmo. 
		
		Etsy live-edge portland cray heirloom skateboard, swag glossier lomo brooklyn taiyaki. 
		Polaroid hell of microdosing craft beer mustache, vegan direct trade lumbersexual readymade taiyaki air plant succulents. Coloring book whatever hashtag knausgaard. 
		Unicorn air plant chia craft beer thundercats, man bun organic pour-over retro glossier. 
		Direct trade keffiyeh prism, taxidermy meggings church-key health goth cray beard seitan hexagon forage retro mixtape.
		
		
		`;

		// Split by new lines. \n or \r
		let split = content.split(/[\n|\r]/g);
		console.log('split',split);

		this.setState({ 
			content,
			split,
		})
	}
//==================================================


	render(){
		return (
			<main>
			
				<h1> The Only Page </h1>
			
				<article id="content" contentEditable="true">
					{/* { this.state.content } */}
					{this.state.split.map( ( ea, index) => {
						return <div key={index} > {index+'. '} {ea}</div>
					})}
				</article>
			
			</main>
		)
	}
}
export default OnePage;

