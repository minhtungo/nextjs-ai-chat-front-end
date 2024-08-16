export type AccessToken = {
  jti: string;
  iat: number;
  exp: number;
  [key: string]: any;
};
