import Mailgen from "mailgen";
import nodemailer from "nodemailer"

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "welcome to our app!,we are excited to have you on board",
      action: {
        instructions:
          "To verify your email please click on the following button",
        button: {
          color: "#9b9bd5",
          text: "verify your email",
          link: verificationUrl,
        },
      },
      outro:"Need help,or have questions?Just reply to this email,we would love to help ."
    },
  };
};
const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset the password of your account",
      action: {
        instructions:
          "To reset your password , click on the follwing button or link",
        button: {
          color: "#b5d59b",
          text: "verify your email",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help,or have questions?Just reply to this email,we would love to help .",
    },
  };
};

export {
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent
}