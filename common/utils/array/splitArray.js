const split = options => {
  const id = options.map(arr => arr["id"]);
  const label = options.map(arr => arr["label"]);
  console.log(label);
  return [id, label];
};

module.exports = split;
