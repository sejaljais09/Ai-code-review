import AuthLayout from "@/components/auth/auth-layout";
import RegisterForm from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start reviewing your code with AI"
    >
      <RegisterForm />
    </AuthLayout>
  );
}