import { query as q } from "faunadb"
import { User } from "next-auth"

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import {fauna} from '../../../services/fauna'
import { Session } from "next-auth"


export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      authorization: {
        params: { 
            scope: "read:user" 
        },
      },
    }),
  ],


  callbacks: {
    async session({session} : {session: Session} ) {
      
      try {
      const userEmail = session.user?.email ?? ''
      const userSubscriptionActive = await fauna.query(
        q.Get(
          q.Intersection([ 
            q.Match(
              q.Index('subscription_by_user_ref'),
              q.Select(
                "ref",
                q.Get(
                  q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(userEmail)
                  )
                )
              )
            ),
            q.Match(
              q.Index('subscription_by_status'),
              "active"
            )
          ])
        )
      )

      return {
        ...session,
        activeSubscription: userSubscriptionActive
      }
      }catch {
        return {
          ...session,
          activeSubscription: null
        }
      }
    },
    async signIn({ user }: { user: User }) {
      try {
        const { email } = user;

        if (!user.email) {
          throw new Error("O email do usuário não está disponível.");
        }

        const userEmail = user.email.toLowerCase();

        const userExists = await fauna.query(
          q.Exists(
            q.Match(
              q.Index('user_by_email'),
              userEmail
            )
          )
        )

        if (!userExists) {
          await fauna.query(
            q.Create(
              q.Collection('users'),
              { data: { email: userEmail } }
            )
          );
        }

        return true
      } catch {
        return false
      }
    }
  } 
}

export default NextAuth(authOptions)