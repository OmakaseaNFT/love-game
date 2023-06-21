import { RequestState, requestInitialState } from "../../system/hooks/useRequestState";
import AppNotification from "./AppNotification";

interface ITransactionNotificationWrapperProps {
  requestState: RequestState;
  setRequestState: (requestState: RequestState) => void;
  errorMessage: string
  children: React.ReactNode;    
}

export const TransactionNotificationWrapper = ({
  requestState,
  errorMessage,
  children,
  setRequestState,
}: ITransactionNotificationWrapperProps) => {
  return (
    <>
      {requestState.pending && (
        <AppNotification
          notificationKey={"transaction_pending"}
          onClose={() => null}
          text={"Transaction pending."}
        />
      )}
      {requestState.success && (
        <AppNotification
          notificationKey={"transaction_success"}
          onClose={() => setRequestState(requestInitialState)}
          text={"Transaction successful."}
          icon="/assets/checkmark.png"
        />
    )}
      {requestState.error && (
        <AppNotification
          notificationKey={"transaction_error"}
          onClose={() => setRequestState(requestInitialState)}
          text={`Error: ${errorMessage}`}
          icon="/assets/erroricon.png"
        />
      )}
      {children}
    </>
  );
};
