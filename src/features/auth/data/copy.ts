/** Page copy for sign-up, sign-in and the account page. Edit text here, not in components. */

export const authCopy = {
  signUp: {
    title: "Create an account",
    subtitle: "Sign up with your email address and a password.",
    submit: "Sign up",
    pending: "Creating account…",
    switchText: "Already have an account?",
    switchLink: "Sign in",
    switchHref: "/auth/sign-in",
  },
  signIn: {
    title: "Sign in",
    subtitle: "Use the email address and password for your account.",
    submit: "Sign in",
    pending: "Signing in…",
    switchText: "New here?",
    switchLink: "Create an account",
    switchHref: "/auth/sign-up",
  },
  fields: {
    name: "Name",
    email: "Email",
    password: "Password",
    passwordHint: "At least 8 characters.",
  },
  genericError: "Something went wrong. Please try again.",
  account: {
    title: "Your account",
    subtitle: "The details for the account you are signed in with.",
    name: "Name",
    email: "Email",
    signOut: "Sign out",
  },
};
