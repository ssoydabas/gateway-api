// Start of Selection
/**
 * Creates a new object by selecting specific properties from the source object.
 *
 * This function iterates over the provided array of keys and extracts the corresponding
 * properties from the source object, returning a new object composed of only those key-value
 * pairs. If a key does not exist in the source object, it is ignored. This is useful for
 * filtering objects to include only the necessary data.
 *
 * @param {Object} object - The source object from which properties are to be picked.
 * @param {Array<string>} keys - An array of strings representing the keys of the properties to pick.
 * @returns {Object} A new object containing only the properties specified in the keys array that exist in the source object.
 *
 * @example
 * const source = { a: 1, b: 2, c: 3 };
 * const picked = pick(source, ['a', 'c']);
 * console.log(picked); // { a: 1, c: 3 }
 */
const pick = (object: any, keys: any) => {
  return keys.reduce((obj: any, key: any) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

export default pick;
