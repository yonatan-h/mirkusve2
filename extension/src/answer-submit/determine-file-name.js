import { getQuestionName } from '../utils/web-scrape.js';
import { CustomError } from '../utils/custom-errors';

export default function determineFileName(filePaths) {
  let fileNames = filePaths.map(pathToFileName);
  fileNames = new Set(fileNames);

  const fileName = getQuestionName(window.location.href);
  if (!fileNames.has(fileName)) {
    return fileName;
  }

  for (let i = 2; i <= 100; i++) {
    const tweakedFileName = `${fileName}-${i}`;
    if (!fileNames.has(tweakedFileName)) {
      return tweakedFileName;
    }
  }

  throw new CustomError(
    `Oh boy! you have too many files simmilarly named to '${fileName}' in your repo. Make sure to name your file differently.`
  );
}

function pathToFileName(path) {
  const nodes = path.split('/');
  const fileNameWithExtension = nodes[nodes.length - 1];

  const segments = fileNameWithExtension.split('.');
  const hasNoDot = segments.length === 1;
  if (hasNoDot) return segments[0];

  segments.pop(); //take abc.def of abc.def.py
  return segments.join('');
}
