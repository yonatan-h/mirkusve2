class CustomError extends Error {
  constructor(descriptionAndSolution, errorAsString = '') {
    super(`Custom Error: \n- ${descriptionAndSolution}\n- ${errorAsString}\n`);
    this.descriptionAndSolution = descriptionAndSolution;
    this.errorAsString = errorAsString;
  }
}

class ToastError extends CustomError {
  constructor(descriptionAndSolution, errorAsString = '') {
    super(descriptionAndSolution, errorAsString);
  }
}
class InputError extends CustomError {
  constructor(descriptionAndSolution, errorAsString = '') {
    super(descriptionAndSolution, errorAsString);
  }
}

class DisablingError extends CustomError {
  constructor(descriptionAndSolution, errorAsString = '') {
    super(descriptionAndSolution, errorAsString);
  }
}

class NetworkError extends ToastError {
  constructor(typeError) {
    const { name, message } = typeError;
    const errorAsString = JSON.stringify({ name, message });

    super('Weak connection? Please try again later.', errorAsString);
  }
}

class BadStatusError extends ToastError {
  constructor(response) {
    const { ok, status, statusText, url } = response;
    const errorAsString = JSON.stringify({ ok, status, statusText, url });

    super(
      'Http response not ok. Try avoiding vpn or try again later.',
      errorAsString
    );
  }
}

class BadUrlError extends InputError {
  constructor(badUrl) {
    super(`${badUrl} is not a valid url`);
  }
}

//because (at least sofar) you cant send status codes in appscript responses
class AppScriptError extends ToastError {
  constructor(responseObject) {
    super(`Message from Sheets: ${responseObject.error}`);
  }
}

class EmptyInputError extends InputError {
  constructor(inputName) {
    super(`Please fill out '${inputName}'`);
  }
}

export {
  CustomError,
  ToastError,
  InputError,
  DisablingError,
  NetworkError,
  BadStatusError,
  AppScriptError,
  EmptyInputError,
  BadUrlError,
};
