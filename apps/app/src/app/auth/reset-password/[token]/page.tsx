import { ResetPassword } from "@/components/auth/reset-password";

export const metadata = {
  title: "Reset Password",
  description: "Reset Password Page",
};

export default function ResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  return (
    <ResetPassword token={params.token} />
  );
}
