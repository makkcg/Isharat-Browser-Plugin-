import { createContext } from "react";
import { useQuery } from "react-query";
import axios from "axios";

export const QueryContext = createContext();

export default function QueryContextProvider(props) {
  const mainApiUrl = "https://kcgwebservices.net/sign_translator_v4.1/public/api/";

  function apiGet({ queryKey }) {
    const key = queryKey[0];
    return axios.get(`${mainApiUrl}${key}`);
  }

  const GetAllQuery = key => {
    let result = useQuery(`all${key}`, apiGet, {
      staleTime: Infinity,
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false
    });
    result.list = result.data ? result.data.data : [];
    return result;
  };
  const value = { GetAllQuery };
  return <QueryContext.Provider value={value}>{props.children}</QueryContext.Provider>;
}
