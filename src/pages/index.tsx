import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { ROUTES } from "@utils/routes";
import AppLayout from "@components/layouts/app";

const DashboardPage = dynamic(() => import("@components/dashboard/admin"));

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: ROUTES.LOGIN,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default function Dashboard() {
  return <DashboardPage />;
}

Dashboard.Layout = AppLayout;
