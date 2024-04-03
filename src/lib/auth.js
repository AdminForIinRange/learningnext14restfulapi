import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { connectToDb } from "./utils";
import { User } from "./models";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log(user, account, profile);
      if (account.provider === "github") {
        connectToDb();
        try {
          const user = await User.findOne({ email: profile.email });
          // retieving the user email from db
          if (!user) {
            // if user email is not found/false
            const newUser = new User({
              //create new user

              username: profile.login,
              email: profile.email,
              img: profile.avatar_url,
            });

            await newUser.save(); // saving the new user to db
          }
        } catch (err) {
          console.log(err);
          return false; // end the auth function with a false
          // if there is an error (no lingering sessions)
        }
      }
      return true;
    },
  },
});
