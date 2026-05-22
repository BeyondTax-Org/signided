interface PreviewApproveBody {
  otp: string;
  otp_session_id?: string;
}

export interface PreviewApproveResponse {
  grant_id: string;
  preview_url: string;
  expires_at: string;
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
