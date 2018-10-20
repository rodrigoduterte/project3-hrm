//for future use
// for single key change
const renameKey = (oldKey, newKey, { [oldKey]: old, ...others }) => ({
  [newKey]: old,
  ...others
});

//for multiple key changes
const renameKeys = (keysMap, obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] }
    }),
    {}
  );

export default renameKey;
export default renameKeys;
