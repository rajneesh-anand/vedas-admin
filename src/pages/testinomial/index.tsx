import Layout from "@components/layouts/app";
import TestinomialList from "@components/testinomial/testinomial-list";
import ErrorMessage from "@components/ui/error-message";
import LinkButton from "@components/ui/link-button";
import Loader from "@components/ui/loader/loader";
import { SortOrder } from "@ts-types/generated";
import { useState } from "react";
import { useTestinomialQuery } from "@data/testinomial/testinomials.query";

export default function TestinomialPage() {
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const {
    data,
    isLoading: loading,
    error,
  } = useTestinomialQuery({
    limit: 25,
    page,
    orderBy,
    sortedBy,
  });

  if (loading) return <Loader text="loading" />;
  if (error) return <ErrorMessage message={error.message} />;

  function handlePagination(current: any) {
    setPage(current);
  }
  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-xl font-semibold text-heading">Testinomial List</h1>

        <LinkButton
          href="/testinomial/create"
          size="small"
          className="h-10 md:ms-6 w-full md:w-auto"
        >
          <span className="block md:hidden xl:block">
            + Create New Testinomial
          </span>
          <span className="hidden md:block xl:hidden">
            + Create New Testinomial
          </span>
        </LinkButton>
      </div>
      <TestinomialList
        testinomials={data?.products}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
      />
    </>
  );
}
TestinomialPage.Layout = Layout;
