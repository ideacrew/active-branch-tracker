// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios').default;

export const getRealName = async (username: string): Promise<string> => {
  const axiosConfig = {
    method: 'get',
    url: `https://api.github.com/users/${username}`,
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  };

  try {
    const response = await axios(axiosConfig);

    const realName: string =
      (response.data.name as string) ?? 'GitHub Name is Blank';

    return realName;
  } catch (e) {
    return 'GitHub username not found';
  }
};
