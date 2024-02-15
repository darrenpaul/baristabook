export function findObject(
  searchArray: { [key: string]: any }[],
  key: string,
  matchString: string
) {
  console.log(searchArray, key, matchString);
  return searchArray.find((item) => matchString === item[key]);
}
