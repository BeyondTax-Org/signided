
import useAPICall from "../../../hooks/useAPICall";
import { PREVIEW_REQUEST_APPROVE_URL } from "../../../api/api";

const usePostPreviewReqApprove = () => {
  const [data, error, isLoading, callPostPreviewReqApprove, setSuccessData, setError] =
    useAPICall(undefined, "");

  const defaultFallback = () => {
    // setError(en.something_went_wrong);
    setSuccessData(undefined);
    setError("Error in verifying");
  };

  const statusObj = [
    {
      status_code: 200,
      status_text: "OK",
      callBack: (res) => {
        const data = res?.data || res;
        if (data && typeof data === "object") {
          setSuccessData(data);
          setError(undefined);
        } else {
          defaultFallback();
        }
      },
    },
    {
      status_code: 201,
      status_text: "Created",
      callBack: (res) => {
        const data = res?.data || res;
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

  const postPreviewReqApprove = (grantId, body) => {
    const url = PREVIEW_REQUEST_APPROVE_URL.replace(":grant_id", grantId);
    // const config = {};
    callPostPreviewReqApprove({
      url,
      method: "POST",
      statusObj,
      defaultFallback,
      body,
      // config,
    });
  };

  return [data, error, isLoading, postPreviewReqApprove, setSuccessData, setError];
};

export default usePostPreviewReqApprove;
