import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "./../types/ApiResponse";
import { resend } from "@/lib/resend";


export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: email,
        subject: 'Mistery Message Verification Code',
        react: VerificationEmail({username,otp:verifyCode}),
        text: 'EMAIL VERIFY'
      });
    
    return { success: true, message: "Verification Email send successfully" };
  } catch (emailError) {
    console.log("Error sending verification Email", emailError);
    return { success: false, message: "Failed to send verfication email" };
  }
}
