import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../index";
import * as schema from "../db/schema";
import { nextCookies } from "better-auth/next-js";
import { sendEmail } from "./actions/email";
import { emailOTP } from "better-auth/plugins";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  schema: {
    user: schema.user,
    session: schema.session,
    account: schema.account,
    verification: schema.verification,
  },
  plugins: [
    nextCookies(),
    emailOTP({
      sendVerificationOnSignUp: true,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          await sendEmail({
            to: email,
            subject: "Verify your email address",
            text: `Your verification code is: ${otp}`,
            html: `
              <h2>Verify Your Email</h2>
              <p>Click <a href="${
                process.env.NEXT_PUBLIC_APP_URL
              }/auth/verify-email?email=${encodeURIComponent(
              email
            )}">here</a> to verify your email.</p>
              <p>Your verification code is: <strong>${otp}</strong></p>
              <p>This code will expire in 5 minutes.</p>
            `,
          });
        }
      },
    }),
  ],
});
