const helpers = () => {

  /**
   * Returns kebab case version of string
   * @param {*} string 
   */
  const toKebabCase = (string) => {
    return string.split(" ").join("-");
  }

  const randomId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  return {toKebabCase, randomId}
}

export default helpers;
