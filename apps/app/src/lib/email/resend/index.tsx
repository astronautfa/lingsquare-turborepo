import { Resend } from "resend";

import { env } from "@/env";

import { EmailVerificationTemplate } from "../templates/email-verification";
import { ResetPasswordTemplate } from "../templates/reset-password";

import type { ComponentProps } from "react";
import { render } from "@react-email/render";


const resend = new Resend(env.RESEND_API_KEY);

export enum EmailTemplate {
  EmailVerification = "EmailVerification",
  PasswordReset = "PasswordReset",
}

export type PropsMap = {
  [EmailTemplate.EmailVerification]: ComponentProps<typeof EmailVerificationTemplate>;
  [EmailTemplate.PasswordReset]: ComponentProps<typeof ResetPasswordTemplate>;
};

const getEmailTemplate = <T extends EmailTemplate>(template: T, props: PropsMap[NoInfer<T>]) => {
  switch (template) {
    case EmailTemplate.EmailVerification:
      return {
        subject: "Verify your email address",
        body: render(
          <EmailVerificationTemplate {...(props as PropsMap[EmailTemplate.EmailVerification])} />,
        ),
      };
    case EmailTemplate.PasswordReset:
      return {
        subject: "Reset your password",
        body: render(
          <ResetPasswordTemplate {...(props as PropsMap[EmailTemplate.PasswordReset])} />,
        ),
      };
    default:
      throw new Error("Invalid email template");
  }
};

export const sendResendMail = async <T extends EmailTemplate>(
  email: string,
  template: EmailTemplate,
  props: PropsMap[NoInfer<T>],
) => {

  const { subject, body } = getEmailTemplate(template, props)

  const { error } = await resend.emails.send({
    from: env.EMAIL_FROM,
    to: email,
    subject,
    react: <>{body}</>,
  });

  if (error) {
    throw error;
  }
}