function parseLanguage(){   
    const codeElement = document.querySelector('code');
    const code = codeElement.innerText;
    return code;
}

function getLanguageCodedIn(){
    const codeElement = document.querySelector('code');
    const language = codeElement.className;

    return language;
}

function getSubmissionCount(){
    const totalSubmissionDetail  = [...document.querySelectorAll('span.text-green-s, span.text-red-s')];
    const totalSubmissionCount = totalSubmissionDetail.length;

    if (!totalSubmissionDetail || totalSubmissionDetail[0].innerText !== "Accepted") return 0;

    return totalSubmissionCount;
}

function hasAcceptedCard(){
    return getSubmissionDetail() > 0;
}
