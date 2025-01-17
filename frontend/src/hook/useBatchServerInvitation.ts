import { AxiosError } from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import { NotificationContext } from "../context/notificationProvider";
import APIClient from "../services/apiClient";

interface BatchInvitationPayload {
  server: number;
  invitee_emails: string[];
}

interface BatchInvitationResponse {
  detail: string;
}

interface Params {
  onSuccess: () => void;
}

const useBatchServerInvitation = ({ onSuccess }: Params) => {
  const { showNotification } = useContext(NotificationContext)!;
  const apiClient = new APIClient<BatchInvitationResponse>(
    "server-invitations/batch_invitation/"
  );

  return useMutation({
    mutationFn: (data: BatchInvitationPayload) => apiClient.post(data),
    onSuccess: (responseData: BatchInvitationResponse) => {
      showNotification(responseData.detail);
      onSuccess();
    },
    onError: (responseData: AxiosError<BatchInvitationResponse>) => {
      let errorMessage = "Something went wrong";
      if (responseData.status === 400) {
        errorMessage = responseData.response?.data.detail || errorMessage;
      }
      showNotification(errorMessage);
    },
  });
};

export default useBatchServerInvitation;
