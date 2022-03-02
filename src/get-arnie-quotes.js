const { httpGet } = require("./mock-http-interface");

const getArnieQuotes = async (urls) => {
	let results = [];
	//Null check for urls
	if (urls.length > 0) {
		//Create an array for promises for number of urls
		const pmsAry = [];
		for (let i = 0; i < urls.length; i++) {
			pmsAry.push(httpGet(urls[i]));
		}

		//Use Promise.allSettled() to get all the responses (success and failure) and pass array of promises to it
		await Promise.allSettled(pmsAry).then((responses) => {
			//Iterate through the responses to add each response message to results array
			for (let i = 0; i < responses.length; i++) {
				const data = responses[i].value;
				const responseData = JSON.parse(data.body);
				//Success condition
				if (data.status == 200) {
					results.push({ "Arnie Quote": responseData.message });
				} else {
					//Failure Condition
					results.push({ FAILURE: responseData.message });
				}
			}
		});
	}
	return results;
};

module.exports = {
	getArnieQuotes,
};
