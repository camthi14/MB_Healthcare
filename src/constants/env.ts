export const generateENV = (key: string) => process.env[`EXPO_PUBLIC_${key}`];

const env = {
  SERVER_URL_ANDROID: generateENV("SERVER_URL_ANDROID"),
  SERVER_URL_IOS: generateENV("SERVER_URL_IOS"),
  SERVER_PORT: generateENV("SERVER_PORT"),
};

export default env;
