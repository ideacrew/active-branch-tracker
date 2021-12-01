export const axiosConfig = (functionName: string, data: unknown) => {
  return {
    method: 'post',
    url: `http://localhost:5001/${process.env.GCLOUD_PROJECT}/us-central1/${functionName}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  };
};
