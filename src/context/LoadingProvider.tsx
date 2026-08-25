import { PropsWithChildren, useState, useMemo } from "react";
import Loading from "../components/Loading";
import { LoadingContext, LoadingType } from "./LoadingContext";

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(0);

  const value = useMemo<LoadingType>(
    () => ({
      isLoading,
      setIsLoading,
      setLoading,
    }),
    [isLoading]
  );

  return (
    <LoadingContext.Provider value={value}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};
