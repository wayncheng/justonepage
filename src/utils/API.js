import axios from "axios";

const API = {


	getOne: function(id){
		console.log('---- API getOne --->');
		console.log('/api/'+id);
		return axios.get('/api/'+id);
	},

	// addNew: function(){
	// 	return axios.post('/api/new-user')
	// },
	
	//==================================================
	// API.update(id,text)
	//==================================================
	update: (id, text = 'blah blah') => {
		console.log('---- API update --->');
		console.log('text',text);
		return axios.post( '/api/'+id , {text} )
	}


////////////////////////////////////////////////////
};

export default API;
