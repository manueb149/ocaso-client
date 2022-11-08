import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const base_url = process.env.PUBLIC_SERVER_ENDPOINT

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                const payload = credentials as {
                    email: string
                    password: string
                }

                // console.log("payyy", payload)

                const res = await fetch(`${base_url}/auth/login`,{
                    method:'POST',
                    body:JSON.stringify({
                        email: payload.email,
                        password: payload.password
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                
                const data = await res.json()

                if(!res.ok){
                    throw new Error('Wrong Username or password')
                }
                if(res.ok && data){
                
                    //depends on backend structure
                    return {
                        ...data.user,
                        accessToken: data.tokens.access.token, 
                        refreshToken: data.tokens.refresh.token 
                    }
                }
                return null
            },
        })
    ],
    pages: {
        signIn: "/auth/signin"
    },
    callbacks: {
        async jwt({token,user,account}){
            if(account && user){
                return {
                    ...token,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    role: user.role
                }
            }

            return token;
        },
        async session({session, token}){
            
            if(session.user){
                session.user.accessToken = token.accessToken
                session.user.refreshToken = token.refreshToken
            }

            return session
        }
        
    }
}

export default NextAuth(authOptions)