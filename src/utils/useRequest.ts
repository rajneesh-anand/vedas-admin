import useSWRInfinite from "swr/infinite";
import useSWR from "swr";

const fetcher = (url: any) =>
  fetch(url)
    .then((res) => res.json())
    .then((prod) => prod.data);

const PAGE_LIMIT = 50;

export const useGetData = (url: any) => {
  if (!url) {
    throw new Error("url is required");
  }
  const { data, error } = useSWR(url, fetcher);
  return { data: data, isLoading: !error && !data, isError: error };
};

export const usePaginatedData = (url: any) => {
  if (!url) {
    throw new Error("url is required");
  }

  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (index) => `${url}?page=${index + 1}&limit=${PAGE_LIMIT}`,
    fetcher
  );

  const result = data ? [].concat(...data) : [];

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_LIMIT);
  const isRefreshing = isValidating && data && data.length === size;

  return {
    result,
    error,
    isLoadingMore,
    size,
    setSize,
    isReachingEnd,
    isEmpty,
    isRefreshing,
  };
};
