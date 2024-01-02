const convertToJSON = (stringData) => {
  const keys = Object.keys(stringData);
  const parseData = JSON.parse(keys);
  return parseData;
};

module.exports = { convertToJSON };
