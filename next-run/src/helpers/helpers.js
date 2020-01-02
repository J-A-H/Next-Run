const helpers = () => {

  /**
   * Returns kebab case version of string
   * @param {*} string 
   */
  const toKebabCase = (string) => {
    return string.split(" ").join("-");
  }
  return {toKebabCase}
}

export default helpers;
