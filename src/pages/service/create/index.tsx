import Layout from "@components/layouts/app";
import CreateServiceForm from "@components/service/service-form-create";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function CreateServicePage() {
  return (
    <>
      <div className="py-1 flex ">
        <h1 className="text-lg text-indigo-700 font-semibold text-heading pb-1">
          Create New Service
        </h1>
      </div>
      <CreateServiceForm />
    </>
  );
}

CreateServicePage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
