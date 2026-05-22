interface PreviewRequestBody {
  uvc_code: string;
  requester_email: string;
  reason: string;
}

export interface PreviewRequestPayload {
  grant_id: string;
  otp_session_id: string;
  expires_at: string;
  owner_mobile_hint: string;
}

export interface PreviewRequestResponse {
  status_code: number;
  status_text: string;
  data: PreviewRequestPayload;
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
