export let token = "";

export const setAccessToken = (t: string) => {
  token = t;
};

export const getAccessToken = () => {
  return token;
};
