/* eslint-disable no-unused-vars */
declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    PUBLIC_SERVER_ENDPOINT: string;
  }
}
