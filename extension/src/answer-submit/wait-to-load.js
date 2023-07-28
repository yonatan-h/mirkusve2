import { CustomError } from '../utils/custom-errors.js';
import { getCurrentCode } from '../utils/web-scrape.js';

async function waitToLoad() {
  const maxTime = 10000;
  const intervalTime = 500;

  //ASSUMPTION: if answer code has loaded, every thing else that's needed from the page is loaded

  return new Promise((resolve, reject) => {
    const intervalId = setInterval(
      () => getCurrentCode() && resolve(),
      intervalTime
    );

    setTimeout(() => {
      clearInterval(intervalId);
      reject(
        new CustomError(
          'Time Out. The page took too long to load. Try refreshing the page'
        )
      );
    }, maxTime);
  });
}

export default waitToLoad;