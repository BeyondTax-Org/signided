
import useAPICall from "../../../hooks/useAPICall";
import { VERIFY_LOOKUP_URL } from "../../../api/api";

const usePostUploadSignedDoc = () => {
  const [data, error, isLoading, callPostUploadSignedDoc, setSuccessData, setError] =
    useAPICall(undefined, "");

  const defaultFallback = () => {
    // setError(en.something_went_wrong);
    setSuccessData(undefined);
    setError("Error in verifying");
  };

  const statusObj = [
    {
      status_code: 201,
      status_text: "Created",
      callBack: (res) => {
        const data = res;
        if (data && typeof data === "object") {
          setSuccessData(data);
          setError(undefined);
        } else {
          defaultFallback();
        }
      },
    },
    {
      status_text: "Bad Request",
      status_code: 400,
      callBack: defaultFallback,
    },
    {
      status_text: "Internal Server Error",
      status_code: 500,
      callBack: defaultFallback,
    },
  ];

  const postUploadSignedDoc = (body) => {
    const url = VERIFY_LOOKUP_URL;
    // const config = {};
    callPostUploadSignedDoc({
      url,
      method: "POST",
      statusObj,
      defaultFallback,
      body,
      // config,
    });
  };

  return [data, error, isLoading, postUploadSignedDoc, setSuccessData, setError];
};

export default usePostUploadSignedDoc;
