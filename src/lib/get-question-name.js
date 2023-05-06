function getQuestionName(link) {
	("/*/problems/[not/ with *]/*");
	const match = /.*\/problems\/([^/.]*)\/*.*/.exec(link);
	if (!match) {
		throw new Error(`Question name could not be extracted from link (${link})`);
	}
	return match[1];
}

export default getQuestionName;
