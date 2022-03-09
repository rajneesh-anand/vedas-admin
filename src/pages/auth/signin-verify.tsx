import Logo from "@components/ui/logo";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { ROUTES } from "@utils/routes";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session?.accessToken);
  if (session) {
    return {
      redirect: {
        destination: ROUTES.DASHBOARD,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default function LoginVerify() {
  return (
    <div className="flex items-center justify-center h-screen bg-light sm:bg-gray-100">
      <div className="m-auto max-w-md w-full bg-light sm:shadow p-5 sm:p-8 rounded">
        <div className="flex justify-center mb-2">
          <Logo />
        </div>
        <h3 className="text-center text-green-900  mb-4 mt-4">
          Login link has been sent to your email address !
        </h3>
      </div>
    </div>
  );
}
