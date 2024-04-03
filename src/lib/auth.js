// Importing necessary modules and packages
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils";
import { User } from "./models";
import bcryptjs from "bcryptjs";

// Function to handle login process
const login = async (credentials) => {
  // Login: This function checks if the user's login email and password match the database. 
  //You're not creating a new user, you are simply checking if they exist in the user collection.
  try {
    connectToDb(); // Connecting to the database
    const user = await User.findOne({ username: credentials.username }); // Finding user by username

    // If user not found, throw an error
    if (!user) {
      throw new Error("Wrong credentials!");
    }

    // Comparing passwords
    const isPasswordCorrect = await bcryptjs.compare(credentials.password, user.password);

    // If password is incorrect, throw an error
    if (!isPasswordCorrect) {
      throw new Error("Wrong credentials!");
    }

    // If everything is correct, return the user
    return user;

  } catch (err) {
    console.log(err); // Log any errors
    throw new Error("Failed to login!"); // Throw error for failed login attempt
  }
};

// Exporting handlers and authentication functions
export const {
  handlers: { GET, POST }, // Handlers for GET and POST requests
  auth, // Authentication function
  signIn, // Function to sign in
  signOut, // Function to sign out
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID, // GitHub client ID
      clientSecret: process.env.GITHUB_SECRET, // GitHub client secret
    }),
    CredentialsProvider({

      // This is an async function defined within CredentialsProvider. It takes credentials as an argument,
      // representing the credentials entered by the user during the authentication process.
      
      async authorize(credentials) {
        try {
          // Attempt to log in the user using the provided credentials
          const user = await login(credentials);
    
          // If login is successful, return the user object
          return user;
        } catch (err) {
          // If login fails due to incorrect credentials or any other error, return null
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log(user, account, profile); // Log user, account, and profile information
      if (account.provider === "github") { // If the authentication provider is GitHub
        connectToDb(); // Connect to the database
        try {
          const user = await User.findOne({ email: profile.email }); // Find user by email

          // If user not found, create a new user
          if (!user) {
            const newUser = new User({
              username: profile.login, // Set username
              email: profile.email, // Set email
              img: profile.avatar_url, // Set profile image
            });

            await newUser.save(); // Save new user to the database
          }
        } catch (err) {
          console.log(err); // Log any errors
          return false; // Return false if there is an error
        }
      }
      return true; // Return true if authentication is successful
    },
  },
});
