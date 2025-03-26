import { Resend } from "resend";
import { resendApiKey } from "@/constants";
import { log } from "@/utils/logger/logger";
import { CustomError } from "@/errors/customError";
import httpStatus from "http-status";

const resend = new Resend(resendApiKey);

export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    await resend.emails.send({
      from: "TEST <onboarding@resend.dev>",
      to: email,
      subject: "Verify your email",
      html: `<p>Your verification code is <strong>${token}</strong></p>`,
    });
  } catch (error) {
    log.error("Error sending verification email", error);
    throw new CustomError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "INTERNAL_SERVER_ERROR",
      "Error sending verification email",
    );
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  try {
    await resend.emails.send({
      from: "TEST <onboarding@resend.dev>",
      to: email,
      subject: "Reset your password",
      html: `<p>Your password reset code is <strong>${token}</strong></p>`,
    });
  } catch (error) {
    log.error("Error sending password reset email", error);
    throw new CustomError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "INTERNAL_SERVER_ERROR",
      "Error sending password reset email",
    );
  }
};

export const sendEmailUpdateEmail = async (email: string, token: string) => {
  try {
    await resend.emails.send({
      from: "TEST <onboarding@resend.dev>",
      to: email,
      subject: "Update your email",
      html: `<p>Your email update code is <strong>${token}</strong></p>`,
    });
  } catch (error) {
    log.error("Error sending email update email", error);
    throw new CustomError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "INTERNAL_SERVER_ERROR",
      "Error sending email update email",
    );
  }
};
