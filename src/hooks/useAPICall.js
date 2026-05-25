import axios from "axios";
import { useState } from "react";

const useAPICall = (defaultData, defaultError) => {
  //handling States
  //this must be set to false
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(defaultData);
  const [error, setError] = useState(defaultError);

  const callAPI = ({
    url = "",
    method = "get",
    defaultFallback = () => {},
    statusObj = [],
    body,
    config = {},
    params,
  }) => {
    // merging all the configurations
    const axiosConfigObject = {
      ...config,
      method,
      url,
      data: body,
      headers: {
        ...(config.headers || {}),
      },
      params,
    };
    //setting loading to true pre-call
    setIsLoading(true);
    //axios call
    axios(axiosConfigObject)
      .then((res) => {
        if (res?.data?.status_code && res?.data?.status_txt) {
          //finding the matching status
          let statusID = statusObj.findIndex((status) => {
            return (
              res.data.status_code === status?.status_code &&
              (res.data.status_txt || res.data.status_text || "").toLowerCase() ===
                (status?.status_txt || status?.status_text || "").toLowerCase()
            );
          });

          // if status found
          if (statusID >= 0) {
            // running the callback
            if (statusObj[statusID]?.callBack) {
              statusObj[statusID].callBack(res.data);
            } else {
              console.log("callback is not found for the status");
            }
          } else {
            console.log("status not found");
            defaultFallback(res?.data);
          }
        }
        // wrong structure
        else {
          setData(res?.data);
          setError(undefined);
        }
      })
      //handling error from API
      .catch((err) => {
        console.log("API error");
        console.log({ err });
        setError(err);
        defaultFallback(err);
      })
      .finally(() => {
        //turning the loader off
        setIsLoading(false);
      });
  };
  return [data, error, isLoading, callAPI, setData, setError, setIsLoading];
};

export default useAPICall;
