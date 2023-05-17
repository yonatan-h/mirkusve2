function main() {}

function groupFinderDoGet(event) {
	try {
		const { name } = event.parameter;
		if (name === undefined) throw new Error(`name missing`);

		return outPutJSON({ group: 43 });
	} catch (error) {
		Logger.log(error);
		return outPutJSON({ error: error.message });
	}
}
