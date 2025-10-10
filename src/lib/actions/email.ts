// lib/actions/email.ts
"use server";
import { z } from "zod";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const sendEmailSchema = z.object({
  to: z.email(),
  subject: z.string(),
  text: z.string(),
  html: z.string(),
});

type SendEmailSchema = z.infer<typeof sendEmailSchema>;

export async function sendEmail(props: SendEmailSchema) {
  const validatedData = sendEmailSchema.parse({
    to: props.to,
    subject: props.subject,
    text: props.text,
    html: props.html,
  });

  if (!validatedData) {
    throw new Error("Invalid data");
  }

  try {
    // Fix the type issue by using text and html properties instead of content
    const msg = {
      to: validatedData.to,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: validatedData.subject,
      text: validatedData.text,
      html: validatedData.html,
    };

    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error("SendGrid error:", error);
    throw new Error("Failed to send email");
  }
}
