import { createContext } from "react";
import { useQuery } from "react-query";
import axios from "axios";

export const QueryContext = createContext();

export default function QueryContextProvider(props) {
  const securityKey = "kcg-isharat-123456-kcg-isharat";
  const mainApiUrl = "https://kcgwebservices.net/isharat/isharat/public/api/";

  function apiGet({ queryKey }) {
    const key = queryKey[0];
    return axios.get(`${mainApiUrl}${key}`, {
      headers: {
        "X-Security-Key": securityKey,
        "Content-Type": "application/json"
      }
    });
  }

  const GetAllQuery = key => {
    let result = useQuery(`all${key}`, apiGet, {
      staleTime: Infinity,
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false
    });
    result.list = result.data && Array.isArray(result.data.data) ? result.data.data : [];
    return result;
  };
  const value = { GetAllQuery };
  return <QueryContext.Provider value={value}>{props.children}</QueryContext.Provider>;
}
