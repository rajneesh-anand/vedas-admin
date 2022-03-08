import Layout from "@components/layouts/app";
import EditTestinomialForm from "@components/testinomial/testinomial-form-edit";
import { useRouter } from "next/router";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTestinomialQuery } from "@data/testinomial/testinomial.query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";

export default function UpdateTestinomialPage() {
  const { query } = useRouter();

  const {
    data,
    isLoading: loading,
    error,
  } = useTestinomialQuery(query.id as string);
  console.log(data);

  if (loading) return <Loader text="loading" />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="py-1 flex ">
        <h1 className="text-lg text-indigo-700 font-semibold text-heading pb-1">
          Update Testinomial
        </h1>
      </div>

      <EditTestinomialForm initialValues={data} id={query.id as string} />
    </>
  );
}

UpdateTestinomialPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    ...(await serverSideTranslations(context.locale!, ["form", "common"])),
  },
});
