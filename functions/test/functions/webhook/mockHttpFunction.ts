import axios, { AxiosRequestConfig } from 'axios';

const axiosConfig = (eventType: string, data: unknown): AxiosRequestConfig => {
  return {
    method: 'post',
    url: `http://localhost:5001/${process.env.GCLOUD_PROJECT}/us-central1/webhook`,
    headers: {
      'Content-Type': 'application/json',
      'X-Github-Event': eventType,
    },
    data,
  };
};

export const mockWebhookPayload = (
  eventType: string,
  data: unknown,
): Promise<unknown> => {
  const config = axiosConfig(eventType, data);
  return axios.request(config);
};
