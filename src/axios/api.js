import APICore from './apiCore';

//
// INIT
//
const api = new APICore('https://api.punkapi.com/v2');

//
// INTERCEPTORS
//
/*
api.axios.interceptors.response.use( response => {
	return response;
}, error => {
	return Promise.reject(error);
});
*/

//
// CONSTANTS
//

const simLowerFactor = 0.5;
const simGreaterFactor = 1.5;

//
// MODEL FUNCTIONS
//
api.fn.getAll 		= ()									=> api.get('/beers');
api.fn.getSome 		= ( i, p )						=> api.get(`/beers?page=${p}&per_page=${i}`);
api.fn.getOne 		= ( id ) 							=> api.get(`/beers/${id}`);
api.fn.getSimilar = ( abv, ebc, ibu ) 	=> api.get(`/beers?per_page=15&abv_gt=${Math.floor(abv*simLowerFactor)}&abv_lt=${Math.ceil(abv*simGreaterFactor)}&ebc_gt=${Math.floor(ebc*simLowerFactor)}&ebc_lt=${Math.ceil(ebc*simGreaterFactor)}&ibu_gt=${Math.floor(ibu*simLowerFactor)}&ibu_lt=${Math.ceil(ibu*simGreaterFactor)}`);

export default api.fn;