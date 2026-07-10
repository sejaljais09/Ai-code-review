import AuthLayout from "@/components/auth/auth-layout";
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue reviewing your code"
    >
      <LoginForm />
    </AuthLayout>
  );
}