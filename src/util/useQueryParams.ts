/*
    This is just a nice custom hook that we can
    use to get all the query parameters from inside
    our components. Don't worry about the details
    unless you're curious :)
*/

import { useLocation } from 'react-router-dom';

type Pair<T> = [T, T] | [T];
type KeyValueObject = { [key: string]: string };

const pairs = (arr: string[]): Pair<string>[] => {
  return arr.reduce((acc: Pair<string>[], x: string, i: number): Pair<string>[] => {
    if (i % 2 === 0) {
      return [...acc, [x] as Pair<string>];
    } else {
      const last: Pair<string> = acc[acc.length - 1];
      const everythingElse = acc.slice(0, acc.length - 1);
      return [...everythingElse, [last[0], x]];
    }
  }, []);
}

const fold = (arr: IterableIterator<string[]>): KeyValueObject => {
  const paired = pairs([...arr].flat());
  return paired.reduce((acc: KeyValueObject, pair: Pair<string>): KeyValueObject => {
    if (pair.length === 2) {
      return {
        ...acc,
        [pair[0]]: pair[1],
      };
    }
    return acc;
  }, {});
}

export const useQueryParams = (): KeyValueObject => {
  const location = useLocation();
  const currentParamsObj = new URLSearchParams(location.search);
  const params = fold(currentParamsObj.entries());

  return params;
}
