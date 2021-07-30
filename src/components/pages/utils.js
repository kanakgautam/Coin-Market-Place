const callAPI = async (url) => {
	let response = await fetch(url, {
		headers: {
			"Access-Control-Allow-Origin" : "*", // Required for CORS support to work
    		"Access-Control-Allow-Credentials" : true ,// Required for cookies, authorization headers with HTTPS
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	});
	// if (!response.ok) {
	// 	const message = `An error has occured: ${response.status}`;
	// 	throw new Error(message);
	// }
	return response.json();
};

export default callAPI;