function main() {}

const getHandlers = {
  tokens: accessTokenDoGet,
  'group-urls': groupUrlDoGet,
};

const postHandlers = {};

function doGet(event) {
  const { path } = event.parameter;
  if (getHandlers[path] === undefined) {
    return outPutJSON({ error: `404. path '${path}' does not exist for GET` });
  }

  return getHandlers[path](event);
}

function doPost(event) {
  const { path } = event.parameter;

  if (postHandlers[path] === undefined) {
    return outPutJSON({ error: `404. path '${path}' does not exist for POST` });
  }

  return postHandlers[path](event);
}
