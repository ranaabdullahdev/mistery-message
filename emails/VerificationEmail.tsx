import * as React from "react";

interface EmailTemplateProps {
  username: string;
  otp: string;
}

const VerificationEmail: React.FC<Readonly<EmailTemplateProps>> = ({
  username,
  otp,
}) => (
  <div>
    <h1>Welcome, {username}!</h1>
    <h1>Your OTP is , {otp}!</h1>
  </div>
);

export default VerificationEmail;
