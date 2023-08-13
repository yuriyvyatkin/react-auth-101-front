import { useLocation } from 'react-router-dom';

type KeyValueObject = { [key: string]: string };

export const useQueryParams = (): KeyValueObject => {
  const location = useLocation();
  const currentParamsObj = new URLSearchParams(location.search);
  const params: KeyValueObject = {};

  currentParamsObj.forEach((value, key) => {
    params[key] = value;
  });

  return params;
};
