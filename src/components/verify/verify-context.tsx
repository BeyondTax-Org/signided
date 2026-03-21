import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { AppStep, AppAction, QuickResult } from "@/api/types";

interface VerifyState {
  step: AppStep;
  result: QuickResult | null;
  inputCode: string;
  previewExpiresAt: number | null;
}

const initialState: VerifyState = {
  step: "landing",
  result: null,
  inputCode: "",
  previewExpiresAt: null,
};

function reducer(state: VerifyState, action: AppAction): VerifyState {
  switch (action.type) {
    case "VERIFY_START":
      return { ...state, step: "loading" };
    case "VERIFY_RESULT":
      if (action.status === "verified") {
        return { ...state, step: "quick-result", result: action.result ?? null };
      }
      return { ...state, step: action.status, result: action.result ?? null };
    case "REQUEST_PREVIEW":
      return { ...state, step: "preview-request" };
    case "PREVIEW_WAITING":
      return { ...state, step: "preview-waiting" };
    case "PREVIEW_APPROVED":
      return {
        ...state,
        step: "preview-approved",
        previewExpiresAt: Date.now() + 15 * 60 * 1000,
      };
    case "OPEN_VIEWER":
      return { ...state, step: "preview-viewer" };
    case "SET_INPUT_CODE":
      return { ...state, inputCode: action.code };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

const VerifyContext = createContext<{
  state: VerifyState;
  dispatch: React.Dispatch<AppAction>;
  setInputCode: (code: string) => void;
} | null>(null);

export function VerifyProvider({ children, initialStep = "landing" }: { children: ReactNode; initialStep?: AppStep }) {
  const [state, dispatch] = useReducer(reducer, { ...initialState, step: initialStep });

  const setInputCode = (code: string) => {
    dispatch({ type: "SET_INPUT_CODE", code });
  };

  return (
    <VerifyContext.Provider value={{ state, dispatch, setInputCode }}>
      {children}
    </VerifyContext.Provider>
  );
}

export function useVerify() {
  const ctx = useContext(VerifyContext);
  if (!ctx) throw new Error("useVerify must be used within VerifyProvider");
  return ctx;
}
