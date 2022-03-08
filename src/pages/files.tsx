import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { ROUTES } from "@utils/routes";
import AppLayout from "@components/layouts/app";

const FilesPage = dynamic(() => import("@components/upload-files"));

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

export default function UploadFiles() {
  return <FilesPage />;
}

UploadFiles.Layout = AppLayout;
