import Layout from "@components/layouts/app";
import CreateTestinomialForm from "@components/testinomial/testinomial-form-create";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function CreateTestinomialPage() {
  return (
    <>
      <div className="py-1 flex ">
        <h1 className="text-lg text-indigo-700 font-semibold text-heading pb-1">
          Write New Testinomial
        </h1>
      </div>
      <CreateTestinomialForm />
    </>
  );
}

CreateTestinomialPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
