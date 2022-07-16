const htmlEntitiesDecode = (string) => {
  const parser = new DOMParser().parseFromString(string, "text/html");
  return parser.documentElement.textContent;
};

export default htmlEntitiesDecode;
