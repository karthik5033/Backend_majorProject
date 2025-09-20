import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task manager",
      link: "https://taskmanagelink.com",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGenerator.generate(options.mailgenContent); // ✅ HTML version

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email service failed silently . Make sure that you have proviced your MAILTRAP credentials in the .env file ", error);
    throw error;
  }
};

const emailVerificationMailgenContent = (username, verificationUrl) => ({
  body: {
    name: username,
    intro: "Welcome to our app! We're excited to have you on board.",
    action: {
      instructions: "To verify your email, click the button below:",
      button: {
        color: "#9b9bd5",
        text: "Verify your email",
        link: verificationUrl,
      },
    },
    outro: "Need help? Just reply to this email, we’d love to help.",
  },
});

const forgotPasswordMailgenContent = (username, passwordResetUrl) => ({
  body: {
    name: username,
    intro: "We received a request to reset your account password.",
    action: {
      instructions: "To reset your password, click the button below:",
      button: {
        color: "#b5d59b",
        text: "Reset your password", 
        link: passwordResetUrl,
      },
    },
    outro: "Need help? Just reply to this email, we’d love to help.",
  },
});

export {
  sendEmail,
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
};
