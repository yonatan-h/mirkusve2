function main() {}
//enable fetch permission by running
//Logger.log(UrlFetchApp.fetch("example.com"))

function accessTokenDoGet(event) {
	try {
		const { code } = event.parameter;
		if (code === undefined) throw new Error(`code missing`);

		const tokenUrl = getTokenUrl(code);
		const accessToken = getAccessToken(tokenUrl);
		return outPutJSON({ accessToken });
	} catch (error) {
		Logger.log(error);
		return outPutJSON({ error: error.message });
	}
}

function getTokenUrl(code) {
	const clientId = "96309949db0f49ae9c72";
	const clientSecret = "57915a7c26dc315351e112376fe3b95eaece4ac8";

	let url = "https://github.com/login/oauth/access_token";
	url += `?client_id=${clientId}`;
	url += `&client_secret=${clientSecret}`;
	url += `&code=${code}`;

	return url;
}

function getAccessToken(tokenUrl) {
	const response = UrlFetchApp.fetch(tokenUrl, {
		method: "POST",
		headers: {
			Accept: "application/vnd.github+json",
		},
	});

	const data = JSON.parse(response.getContentText());
	if (data.error) {
		throw new Error(`The url was ${tokenUrl} -> ` + data["error_description"]);
	}
	return data["access_token"];
}
