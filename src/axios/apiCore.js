import axios from 'axios';

class apiCore {

	constructor(host, alias='') {
		this.axios = axios.create({});

		this.host = host;
		this.alias = alias;

		this.baseURL = this.host + this.alias;

		this.fn = {}
	}

	compile(query) {
		return this.baseURL + query;
	}

	process(args) {		
		let { method, callback, query, data } = args;		
		return callback(this.compile(query), data);
	}

	get(query) {
		return this.process({
			method: 'GET',
			query: query,
			callback: (q) => this.axios.get(q)
		});
	}

	/*
	post(query, data) {
		return this.process({
			method: 'POST',
			query: query,
			data: data,
			callback: (q, d) => this.axios.post(q, d)
		});
	}

	delete() {
		return {
			method: 'DELETE',
			query: query,
			callback: (q) => this.axios.delete(q)			
		};
	}
	*/
}

export default apiCore;
