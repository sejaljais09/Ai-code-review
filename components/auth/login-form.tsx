"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import PasswordInput from "./password-input";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<LoginFormData>();

  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      toast.error("Invalid email or password");
      return;
    }

    toast.success("Login successful!");
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-2 block font-medium">Email</label>

        <input
          type="email"
          {...register("email", {
            required: "Email is required",
          })}
          className="w-full rounded-lg border p-3"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block font-medium">Password</label>

        <PasswordInput
          value={watch("password") || ""}
          onChange={(e) => setValue("password", e.target.value)}
          placeholder="Enter your password"
        />

        <input
          type="hidden"
          {...register("password", {
            required: "Password is required",
          })}
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-black py-3 text-white hover:bg-gray-800"
      >
        Login
      </button>

      <div className="text-center text-sm">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-blue-600 hover:underline"
        >
          Create Account
        </Link>
      </div>
    </form>
  );
}