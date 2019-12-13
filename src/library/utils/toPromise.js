/**
 * 适配器，
 */
export default val => {
  if (val && val.then) {
    return val;
  }
  return Promise.resolve(val);
};
