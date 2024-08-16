import { ResetPassword } from "@/components/auth/reset-password";
import { validateRequest } from "@lingsquare/auth/validate-request";
import { Paths } from "@lingsquare/misc/constants";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Reset Password",
  description: "Reset Password Page",
};

export default async function ResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {

  const { user } = await validateRequest();

  if (user) redirect(Paths.Dashboard);

  return (
    <ResetPassword token={params.token} className="dark:lg:bg-zinc-900 border-none md:shadow-none"/>
  );
}
