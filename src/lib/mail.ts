import "server-only";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import type { ReactElement } from "react";
import { siteConfig } from "@/config/site";

/** SMTP settings. Host, user and password are needed to send. */
function transport() {
  const { SMTP_HOST: host, SMTP_PORT: port, SMTP_USER: user, SMTP_PASSWORD: pass } = process.env;
  if (!host || !user || !pass) return null;
  const portNumber = Number(port) || 587;
  return nodemailer.createTransport({
    host,
    port: portNumber,
    secure: portNumber === 465,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
}

export function mailIsConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD);
}

/** MAIL_FROM is optional. Gmail sends only as the signed-in account, so that is the default. */
const sender = () => process.env.MAIL_FROM || `"${siteConfig.brandName}" <${process.env.SMTP_USER}>`;

/** Sends a React Email template as HTML with a plain-text copy. Throws when it cannot. */
export async function sendMail({ to, subject, email, replyTo }: { to: string; subject: string; email: ReactElement; replyTo?: string }) {
  const mailer = transport();
  if (!mailer) throw new Error("SMTP is not configured");
  await mailer.sendMail({
    from: sender(),
    to,
    replyTo,
    subject,
    html: await render(email),
    text: await render(email, { plainText: true }),
  });
}
