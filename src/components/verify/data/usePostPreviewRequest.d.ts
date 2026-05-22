interface PreviewRequestBody {
  uvc_code: string;
  requester_email: string;
  reason: string;
}

export interface PreviewRequestResponse {
  grant_id: string;
  otp_session_id: string;
  expires_at: string;
  owner_mobile_hint: string;
}

declare const usePostPreviewRequest: () => [
  PreviewRequestResponse | undefined,
  unknown,
  boolean,
  (body: PreviewRequestBody) => void,
  (data: PreviewRequestResponse | undefined) => void,
  (error: unknown) => void,
];

export default usePostPreviewRequest;
