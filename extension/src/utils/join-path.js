import { InputError } from './custom-errors';

//just like path.join()
function joinWithPath(path1, path2) {
  if (!path1 || !path2) {
    throw new InputError(
      `Can't join '${path1}' and '${path2}'. Please make them valid`
    );
  }

  const lastCharOf1 = path1[path1.length - 1];
  const firstCharOf2 = path2[0];

  if (lastCharOf1 === '/') {
    path1 = path1.slice(0, -1);
  }

  if (firstCharOf2 === '/') {
    path2 = path2.slice(1);
  }

  return path1 + '/' + path2;
}

export default joinWithPath;
