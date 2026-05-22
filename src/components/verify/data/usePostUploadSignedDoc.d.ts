type UploadSignedDocBody = { uvc_code: string } | FormData;

declare const usePostUploadSignedDoc: () => [
  unknown,
  unknown,
  boolean,
  (body: UploadSignedDocBody) => void,
  (data: unknown) => void,
  (error: unknown) => void,
];

export default usePostUploadSignedDoc;
