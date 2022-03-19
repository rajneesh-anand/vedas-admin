import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { ROUTES } from "@utils/routes";
import AppLayout from "@components/layouts/app";

const ChaptersPage = dynamic(() => import("@components/upload-files/chapters"));

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
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

export default function ChaptersUpload() {
  return <ChaptersPage />;
}

ChaptersUpload.Layout = AppLayout;
