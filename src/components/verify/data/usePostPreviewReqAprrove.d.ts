interface PreviewApproveBody {
  otp: string;
  otp_session_id?: string;
}

export interface PreviewApprovePayload {
  grant_id: string;
  preview_url: string;
  expires_at: string;
}

export interface PreviewApproveResponse {
  status_code: number;
  status_text: string;
  data: PreviewApprovePayload;
}

declare const usePostPreviewReqApprove: () => [
  PreviewApproveResponse | undefined,
  unknown,
  boolean,
  (grantId: string, body: PreviewApproveBody) => void,
  (data: PreviewApproveResponse | undefined) => void,
  (error: unknown) => void,
];

export default usePostPreviewReqApprove;
