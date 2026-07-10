"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PasswordInput from "./password-input";
import PasswordChecklist from "./password-checklist";
import { Controller } from "react-hook-form";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const password = watch("password", "");
  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      toast.error(result.message);
      return;
    }

    toast.success("Account created successfully!");

    router.push("/login");
  } catch (error) {
    toast.error("Something went wrong");
  }
};
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-2 block font-medium">Name</label>

        <input
          {...register("name", {
            required: "Name is required",
          })}
          className="w-full rounded-lg border p-3"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

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

        <Controller
  name="password"
  control={control}
  rules={{
    required: "Password is required",
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
      message:
        "Password must contain uppercase, lowercase, number, special character and be at least 8 characters long.",
    },
  }}
  render={({ field }) => (
    <PasswordInput
      value={field.value || ""}
      onChange={field.onChange}
      onBlur={field.onBlur}
      name={field.name}
      placeholder="Enter your password"
    />
  )}
/>

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
          
        )}
        <PasswordChecklist password={password} />
        
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-black py-3 text-white"
      >
        Create Account
      </button>
      <div className="text-center text-sm">
  Already have an account?{" "}
  <Link
    href="/login"
    className="font-semibold text-blue-600 hover:underline"
  >
    Login
  </Link>
</div>
    </form>
  );
}