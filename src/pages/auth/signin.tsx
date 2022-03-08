import React, { useEffect, useState } from "react";
import Alert from "@components/ui/alert";
import Button from "@components/ui/button";
import Input from "@components/ui/input";
// import PasswordInput from "@components/ui/password-input";
// import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import Logo from "@components/ui/logo";
import { GetServerSideProps } from "next";
import { signIn, getCsrfToken, getSession } from "next-auth/react";
import { ROUTES } from "@utils/routes";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const csrfToken = await getCsrfToken(context);
  console.log(csrfToken);

  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: ROUTES.DASHBOARD,
        permanent: false,
      },
    };
  }
  return {
    props: { csrfToken },
  };
};

type FormValues = {
  email: string;
  password?: string;
};

export default function LoginPage({ csrfToken }: any) {
  // const router = useRouter();
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState<string | undefined>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/user");
      const result = await res.json();
      setUsers(result.data);
    }
    fetchUsers();
  }, []);

  // const onSubmit = async (data: FormValues) => {
  //   const result = await signIn<"credentials">("credentials", {
  //     redirect: false,
  //     email: data.email,
  //     password: data.password,
  //     callbackUrl: "http://localhost:3000",
  //   });
  //   console.log(result);
  //   if (result?.error) {
  //     setErrorMsg(result?.error);
  //   }
  //   if (result?.url) router.push(result.url);
  // };

  const onSubmit = async (data: FormValues) => {
    const ifAdminType = users.filter((user: any) => user.email === data.email);
    if (ifAdminType.length > 0) {
      await signIn<"email">("email", {
        email: data.email,
      });
    } else {
      setErrorMsg(
        "You are not authorized to login, Contact your system administrator !"
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-light sm:bg-gray-100">
      <div className="m-auto max-w-md w-full bg-light sm:shadow p-5 sm:p-8 rounded">
        <div className="flex justify-center mb-2">
          <Logo />
        </div>
        <h3 className="text-center text-base  text-body mb-4 mt-4">
          Sign In to VedasOne Academy
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <Input
            label="Email"
            type="email"
            variant="outline"
            className="mb-4"
            {...register("email", {
              required: "You must provide your email address !",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address !",
              },
            })}
            error={errors.email?.message}
          />
          {/* <PasswordInput
            label="Password"
            variant="outline"
            className="mb-4"
            forgotPageLink="/forgot-password"
            {...register("password", {
              required: "You must provide your password !",
            })}
            error={errors?.password?.message!}
          /> */}
          <Button className="w-full">Login</Button>

          <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-3 sm:mt-4 mb-3 sm:mb-4">
            <hr className="w-full" />
          </div>

          {errorMsg ? (
            <Alert
              message={errorMsg}
              variant="error"
              closeable={true}
              className="mt-5"
              onClose={() => setErrorMsg("")}
            />
          ) : null}
        </form>
      </div>
    </div>
  );
}
