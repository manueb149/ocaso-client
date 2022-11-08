/* eslint-disable no-unused-vars */
import { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    role?: string;
    accessToken?: string;
    refreshToken?: string;
  }

  interface Session {
    user?: {
      role: string;
      accessToken?: string;
      refreshToken?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    accessToken?: string;
    refreshToken?: string;
    role?: string;
  }
}
