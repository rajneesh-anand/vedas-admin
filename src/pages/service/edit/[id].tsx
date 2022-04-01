import Layout from "@components/layouts/app";
import EditServiceForm from "@components/service/service-form-edit";
import { useRouter } from "next/router";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useServiceQuery } from "@data/service/service.query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";

export default function UpdateServicePage() {
  const { query } = useRouter();

  const {
    data,
    isLoading: loading,
    error,
  } = useServiceQuery(query.id as string);

  if (loading) return <Loader text="loading" />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="py-1 flex ">
        <h1 className="text-lg text-indigo-700 font-semibold text-heading pb-1">
          Update Service
        </h1>
      </div>

      <EditServiceForm initialValues={data} id={query.id as string} />
    </>
  );
}

UpdateServicePage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    ...(await serverSideTranslations(context.locale!, ["form", "common"])),
  },
});
