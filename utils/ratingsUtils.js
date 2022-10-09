function parseRate(requestBody) {
  const rateParsed = JSON.stringify(Object.keys(requestBody)[0]);
  return rateParsed.slice(1, rateParsed.length - 1);
}

module.exports = { parseRate };
