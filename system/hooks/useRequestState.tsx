import { useState } from "react";

export type RequestState = {
    pending: boolean;
    success: boolean;
    error: boolean;
};

export const requestInitialState: RequestState = {
    pending: false,
    success: false,
    error: false,
};

export const requestPendingState: RequestState = {
    pending: true,
    success: false,
    error: false,
};

export const requestSuccessState: RequestState = {
    pending: false,
    success: true,
    error: false,
};

export const requestErrorState: RequestState = {
    pending: false,
    success: false,
    error: true,
};

/**
 * Custom hook for setting the state of a request.
 * 
 * @returns 
 */
export const useRequestState = () => {
    const [requestState, setRequestState] = useState(requestInitialState);
  
    return {
      requestState,
      setRequestState,
    };
  };
  