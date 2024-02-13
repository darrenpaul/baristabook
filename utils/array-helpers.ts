export function findObject(
  searchArray: { [key: string]: any }[],
  key: string,
  matchString: string
) {
  return searchArray.find((item) => matchString === item[key]);
}
