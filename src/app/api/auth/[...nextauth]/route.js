import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { use } from "react"


const userList = [
    { name: "jack", password: "1234" },
    {name: "jony", password:"1234"}
 ]

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        // ...add more providers here
        CredentialsProvider({
            // Sign in with {name} button
            name: "Credentials",
            // Form Inputs
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
                secretCode: {label:"code", type:"number", placeholder: "Enter your Code"}
            },
            async authorize(credentials, req) {
                // my own login logic
                const { password, username, secretCode } = credentials
                
                const user = userList.find(u => u.name == username);
                if (!user) return null;

                const isPasswordOk = user.password == password;
                if (isPasswordOk) {
                    return user
                }

                    return null

                
            }
        })
    ],
}

const handler =  NextAuth(authOptions)

export { handler as GET, handler as POST }